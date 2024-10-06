<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\UserController;
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


// Authentication Routes
Route::middleware('web')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Protected Routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user-info', [UserController::class, 'getUserInfo']);
    Route::get('/articles', [ArticleController::class, 'index']);
    Route::post('/preferences', [PreferencesController::class, 'savePreferences']);
    Route::get('/preferences', [PreferencesController::class, 'index']);
    Route::get('/articles/{id}', [ArticleController::class, 'show']); // Fetch a single article by ID
});