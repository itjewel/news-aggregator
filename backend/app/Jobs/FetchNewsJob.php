<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use App\Models\Article; // Assuming you have an Article model
use Log; // Import Log facade
use Carbon\Carbon; // Import Carbon for date handling

class FetchNewsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle()
    {
        // Define the API sources with their corresponding URLs
        $sources = [
            'newsapi' => 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' . env('NEWSAPI_KEY'),
            'theguardian' => 'https://content.guardianapis.com/search?api-key=' . env('GUARDIAN_API_KEY') . '&show-fields=body',
            'nytimes' => 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=' . env('NYTIMES_API_KEY')
        ];

        foreach ($sources as $source => $url) {
            $response = Http::get($url);
            Log::info("Response from $source: " . $response->body());

            if ($response->successful()) {
                $responseData = $response->json();

                // Fetch articles depending on the API source
                switch ($source) {
                    case 'newsapi':
                        $articles = $responseData['articles'] ?? [];
                        break;
                    case 'theguardian':
                        $articles = $responseData['response']['results'] ?? [];
                        break;
                    case 'nytimes':
                        $articles = $responseData['results'] ?? [];
                        break;
                    default:
                        $articles = [];
                }

                foreach ($articles as $articleData) {
                    Log::info("Processing article from $source: " . json_encode($articleData));

                    // Initialize variables for title, content, and published date
                    $title = null;
                    $content = null;
                    $publishedAt = null;

                    // Handle data extraction based on the source
                    switch ($source) {
                        case 'newsapi':
                            $title = $articleData['title'] ?? null;
                            $content = $articleData['content'] ?? $articleData['description'] ?? null;
                            $publishedAt = isset($articleData['publishedAt']) ? Carbon::parse($articleData['publishedAt'])->format('Y-m-d H:i:s') : null;
                            break;

                        case 'theguardian':
                            $title = $articleData['webTitle'] ?? null;
                            $content = $articleData['fields']['body'] ?? null;
                            $publishedAt = isset($articleData['webPublicationDate']) ? Carbon::parse($articleData['webPublicationDate'])->format('Y-m-d H:i:s') : null;
                            break;

                        case 'nytimes':
                            $title = $articleData['title'] ?? null;
                            $content = $articleData['abstract'] ?? null;
                            $publishedAt = isset($articleData['published_date']) ? Carbon::parse($articleData['published_date'])->format('Y-m-d H:i:s') : null;
                            break;
                    }

                    // Skip the article if the title or content is missing
                    if (!$title || !$content) {
                        Log::warning("Skipping article with missing title or content: " . json_encode($articleData));
                        continue;
                    }

                    // Truncate content to fit within the database's column size limits
                    $content = substr($content, 0, 65535); // Ensure content does not exceed TEXT limit

                    // Check if the article already exists in the database
                    $existingArticle = Article::where('title', $title)
                        ->where('source', $source)
                        ->first();

                    if ($existingArticle) {
                        Log::info("Article already exists: " . $title);
                    } else {
                        // Insert the new article into the database
                        Article::updateOrCreate(
                            ['title' => $title, 'source' => $source],
                            [
                                'content' => $content,
                                'published_at' => $publishedAt,
                                'category' => 'Uncategorized', // Optionally update the category if available
                            ]
                        );
                        Log::info("Inserted article: " . $title);
                    }
                }
            } else {
                Log::error("Failed to fetch articles from $source: " . $response->body());
            }
        }

        Log::info('All articles fetched and stored successfully.');
    }
}
