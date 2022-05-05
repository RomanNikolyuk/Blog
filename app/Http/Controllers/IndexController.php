<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function __invoke()
    {
        $articles = Article::orderBy('created_at', 'desc')
            ->take(6)
            ->withCount('comments')
            ->get();

        return view('articles', compact('articles'));
    }
}
