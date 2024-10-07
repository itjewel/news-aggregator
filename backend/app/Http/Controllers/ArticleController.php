<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use App\Models\UserPreference;


class ArticleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        \Log::info('Incoming Request Data: ', $request->all());

        try {
            $perPage = $request->input('per_page', 10); // Default to 10 articles per page
            $currentPage = $request->input('page', 1);  // Default to the first page

            $keyword = $request->input('query', '');
            $date = $request->input('date', '');
            $category = $request->input('category', '');
            $source = $request->input('source', '');

            $preferences = $this->getUserPreferences();

            $query = Article::query();

            if (!empty($preferences['source']) && empty($source)) {
                $query->whereIn('source', $preferences['source']);
            }

            if (!empty($preferences['category']) && empty($category)) {
                $query->whereIn('category', $preferences['category']);
            }

            if (!empty($preferences['author']) && empty($request->input('author'))) {
                $query->whereIn('author', $preferences['author']);
            }

            $escapedKeyword = $this->escapeKeyword($keyword);
            if (!empty($escapedKeyword)) {
                $query->where('title', 'LIKE', "%$escapedKeyword%");
            }

            if (!empty($date)) {
                try {
                    $parsedDate = \Carbon\Carbon::parse($date)->format('Y-m-d');
                    $query->whereDate('created_at', $parsedDate);
                } catch (\Exception $e) {
                    return response()->json(['success' => false, 'message' => 'Invalid date format. Please use a valid date'], 400);
                }
            }

            \Log::info('Generated SQL Query: ', [$query->toSql(), $query->getBindings()]);

            // Paginate articles
            $articles = $query->paginate($perPage, ['*'], 'page', $currentPage);

            return response()->json(['success' => true, 'data' => $articles], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['success' => false, 'message' => 'No articles found'], 404);
        } catch (\Exception $e) {
            \Log::error('Error fetching articles: ', ['message' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'An error occurred while fetching articles'], 500);
        }
    }


    private function getUserPreferences()
    {
        $user = auth()->user();

        $preferences = UserPreference::where('user_id', $user->id)->first();

        return [
            'source' => $preferences->source ? explode(',', $preferences->source) : [],
            'category' => $preferences->category ? explode(',', $preferences->category) : [],
            'author' => $preferences->author ? explode(',', $preferences->author) : [],
        ];
    }




    private function escapeKeyword($keyword)
    {
        return trim($keyword);
    }


    public function show($id): JsonResponse
    {
        try {
            $article = Article::findOrFail($id);

            // Return the found article as a JSON response
            return response()->json(['success' => true, 'data' => $article], 200);
        } catch (ModelNotFoundException $e) {
            // If the article is not found, return a 404 response
            return response()->json(['success' => false, 'message' => 'Article not found'], 404);
        } catch (\Exception $e) {
            // Handle any other exceptions
            return response()->json(['success' => false, 'message' => 'An error occurred while fetching the article'], 500);
        }
    }
}
