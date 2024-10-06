<?php

namespace App\Http\Controllers;

use App\Models\UserPreference;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PreferencesController extends Controller
{

    public function index()
    {
        $user = auth()->user();

        $preferences = UserPreference::where('user_id', $user->id)->get();
        return response()->json($preferences);
    }

    public function savePreferences(Request $request)
    {
        $validatedData = $request->validate([
            'source' => 'string|nullable',
            'category' => 'string|nullable',
            'author' => 'string|nullable',
        ]);

        $user = auth()->user();

        UserPreference::create(array_merge($validatedData, ['user_id' => $user->id]));

        return response()->json(['message' => 'Preferences saved successfully'], 200);
    }
}