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
        // fetch data from api
        $sources = [
            'newsapi' => 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' . env('NEWSAPI_KEY'),
            'theguardian' => 'https://content.guardianapis.com/search?api-key=' . env('GUARDIAN_API_KEY'),
            'nytimes' => 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=' . env('NYTIMES_API_KEY')
        ];

        foreach ($sources as $source => $url) {
            $response = Http::get($url);
            Log::info("Response from $source: " . $response->body());

            if ($response->successful()) {
                $responseData = $response->json();

                if (isset($responseData['articles'])) {
                    foreach ($responseData['articles'] as $articleData) {
                        if (!isset($articleData['title'], $articleData['content'])) {
                            Log::warning("Article missing required fields: " . json_encode($articleData));
                            continue; // Skip to the next article
                        }

                        $publishedAt = isset($articleData['publishedAt']) ? Carbon::parse($articleData['publishedAt'])->format('Y-m-d H:i:s') : null;

                        // Log existing articles for debugging
                        $existingArticles = Article::where('title', $articleData['title'])
                            ->where('source', $source)
                            ->first();

                        if ($existingArticles) {
                            Log::info("Article already exists: " . $articleData['title']);
                        } else {
                            Article::updateOrCreate(
                                ['title' => $articleData['title'], 'source' => $source],
                                [
                                    'content' => $articleData['content'],
                                    'published_at' => $publishedAt,
                                    'category' => $articleData['category'] ?? 'Uncategorized',
                                ]
                            );
                            Log::info("Inserted article: " . $articleData['title']);
                        }
                    }
                } else {
                    Log::warning("No articles found in response from $source");
                }
            } else {
                Log::error("Failed to fetch articles from $source: " . $response->body());
            }
        }
        Log::info('Articles fetched and stored successfully.');
    }
}