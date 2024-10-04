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

    public function search(Request $request)
    {
        $keyword = $request->input('query'); // Match the 'query' from the frontend request
        if (!$keyword) {
            return response()->json(['message' => 'No query provided'], 400);
        }

        $articles = Article::where('title', 'LIKE', "%$keyword%")->get();
        return response()->json($articles);
    }


    public function filter(Request $request)
    {
        $date = $request->input('date');
        $category = $request->input('category');
        $source = $request->input('source');

        return Article::when($date, function ($query) use ($date) {
            return $query->whereDate('created_at', $date);
        })
            ->when($category, function ($query) use ($category) {
                return $query->where('category', $category);
            })
            ->when($source, function ($query) use ($source) {
                return $query->where('source', $source);
            })
            ->get();
    }
}
