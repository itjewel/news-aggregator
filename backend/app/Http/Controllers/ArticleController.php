<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;

class ArticleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            // Get pagination parameters from the request
            $perPage = $request->input('per_page', 10); // Default to 10 articles per page
            $currentPage = $request->input('page', 1); // Default to the first page

            // Paginate articles
            $articles = Article::paginate($perPage, ['*'], 'page', $currentPage);

            return response()->json(['success' => true, 'data' => $articles], 200); // Return paginated results
        } catch (ModelNotFoundException $e) {
            return response()->json(['success' => false, 'message' => 'No articles found'], 404);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'An error occurred while fetching articles'], 500);
        }
    }

    public function searchAndFilter(Request $request): JsonResponse
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'query' => 'nullable|string|max:255',
            'date' => 'nullable|date',
            'category' => 'nullable|string|max:255',
            'source' => 'nullable|string|max:255',
            'per_page' => 'nullable|integer|min:1',
            'page' => 'nullable|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        try {
            $keyword = $request->input('query');
            $date = $request->input('date');
            $category = $request->input('category');
            $source = $request->input('source');

            // Get pagination parameters from the request
            $perPage = $request->input('per_page', 10); // Default to 10 articles per page
            $currentPage = $request->input('page', 1); // Default to the first page

            // Start the query builder
            $query = Article::query();

            // Apply filters
            if ($keyword) {
                $query->where('title', 'LIKE', "%$keyword%");
            }
            if ($date) {
                $query->whereDate('created_at', $date);
            }
            if ($category) {
                $query->where('category', $category);
            }
            if ($source) {
                $query->where('source', $source);
            }

            // Execute the query and get the paginated results
            $articles = $query->paginate($perPage, ['*'], 'page', $currentPage);

            return response()->json(['success' => true, 'data' => $articles], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'An error occurred while fetching articles'], 500);
        }
    }
}