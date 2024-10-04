<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class PreferencesController extends Controller
{
    public function savePreferences(Request $request)
    {
        $validatedData = $request->validate([
            'source' => 'string|nullable',
            'category' => 'string|nullable',
            'author' => 'string|nullable',
        ]);

        // Assuming you have a user model and preferences field
        $user = auth()->user();
        $user->preferences = json_encode($validatedData); // or use a dedicated model
        $user->save();

        return response()->json(['message' => 'Preferences saved successfully'], 200);
    }
}
