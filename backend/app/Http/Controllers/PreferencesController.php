<?php

namespace App\Http\Controllers;

use App\Models\UserPreference;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PreferencesController extends Controller
{

    public function index()
    {
        $user = auth()->user(); // Get the authenticated user

        // Fetch preferences for the authenticated user
        $preferences = UserPreference::where('user_id', $user->id)->get();

        // Return preferences in JSON format
        return response()->json($preferences);
    }

    public function savePreferences(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'source' => 'string|nullable',
            'category' => 'string|nullable',
            'author' => 'string|nullable',
        ]);

        // Get the authenticated user
        $user = auth()->user();


        // Create the preferences for the user
        UserPreference::create(array_merge($validatedData, ['user_id' => $user->id]));

        return response()->json(['message' => 'Preferences saved successfully'], 200);
    }
}