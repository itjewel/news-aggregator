<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\PreferencesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// CSRF Test Route (if needed)
Route::middleware('web')->get('/test-csrf', [AuthController::class, 'testCsrf']);

// Authentication Routes
Route::middleware('web')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Protected Routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/articles', [ArticleController::class, 'index']);
    Route::post('/preferences', [PreferencesController::class, 'savePreferences']);
    Route::get('/preferences', [PreferencesController::class, 'index']); // This should work


    // Route::get('/articles/search', [ArticleController::class, 'searchAndFilter']); // Combined search and filter
    Route::get('/articles/{id}', [ArticleController::class, 'show']); // Fetch a single article by ID
    Route::post('/articles', [ArticleController::class, 'store']);    // Create a new article
    Route::put('/articles/{id}', [ArticleController::class, 'update']); // Update an existing article
    Route::delete('/articles/{id}', [ArticleController::class, 'destroy']); // Delete an article
});

// Additional routes if needed
// You can also place any other routes here if necessary