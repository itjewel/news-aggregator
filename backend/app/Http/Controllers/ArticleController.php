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
            $currentPage = $request->input('page', 1);  // Default to the first page

            // Get filters from the request
            $keyword = $request->input('keyword', '');   // Search keyword for title
            $date = $request->input('date', '');         // Date filter
            $category = $request->input('category', ''); // Category filter
            $source = $request->input('source', '');     // Source filter

            // Query articles
            $query = Article::query();

            // Apply filters
            if (!empty($keyword)) {
                $query->where('title', 'LIKE', "%$keyword%");
            }

            if (!empty($date)) {
                // Attempt to parse the date
                try {
                    // Use Carbon to parse the date in a flexible way
                    $parsedDate = \Carbon\Carbon::parse($date)->format('Y-m-d');

                    // Filter by date, ignoring the time portion
                    $query->whereDate('created_at', $parsedDate);
                } catch (\Exception $e) {
                    return response()->json(['success' => false, 'message' => 'Invalid date format. Please use a valid date'], 400);
                }
            }

            if (!empty($category)) {
                $query->where('category', $category);
            }
            if (!empty($source)) {
                $query->where('source', $source);
            }

            // Paginate articles
            $articles = $query->paginate($perPage, ['*'], 'page', $currentPage);

            return response()->json(['success' => true, 'data' => $articles], 200); // Return paginated and filtered results
        } catch (ModelNotFoundException $e) {
            return response()->json(['success' => false, 'message' => 'No articles found'], 404);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'An error occurred while fetching articles'], 500);
        }
    }

    public function show($id): JsonResponse
    {
        try {
            // Find the article by ID
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