<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
    {
        return Article::all();
    }

    public function search(Request $request)
    {
        $keyword = $request->input('keyword');
        return Article::where('title', 'LIKE', "%$keyword%")->get();
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