<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserInfo(Request $request)
    {
        return response()->json($request->user());
    }
}