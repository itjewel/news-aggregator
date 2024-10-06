<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    // Function to return authenticated user info
    public function getUserInfo(Request $request)
    {
        // Return the authenticated user's info
        return response()->json($request->user());
    }
}