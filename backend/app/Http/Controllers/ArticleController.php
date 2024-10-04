<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ArticleController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $articles = Article::all();
            return response()->json($articles, 200); // Explicitly return a JSON response with a 200 status code
        } catch (ModelNotFoundException $e) {
            // Handle the exception if articles are not found (this is unlikely with all(), but good for learning)
            return response()->json(['message' => 'No articles found'], 404);
        } catch (\Exception $e) {
            // Handle other exceptions
            return response()->json(['message' => 'An error occurred while fetching articles'], 500);
        }
    }

    public function searchAndFilter(Request $request): JsonResponse
    {
        $keyword = $request->input('query');
        $date = $request->input('date');
        $category = $request->input('category');
        $source = $request->input('source');

        // Start the query builder
        $query = Article::query();

        // Apply the search filter if provided
        if ($keyword) {
            $query->where('title', 'LIKE', "%$keyword%");
        }

        // Apply the date filter if provided
        if ($date) {
            $query->whereDate('created_at', $date);
        }

        // Apply the category filter if provided
        if ($category) {
            $query->where('category', $category);
        }

        // Apply the source filter if provided
        if ($source) {
            $query->where('source', $source);
        }

        // Execute the query and get the results
        $articles = $query->get();

        return response()->json($articles, 200);
    }
}
