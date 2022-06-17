<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function __invoke() : View
    {
        $articles = Article::orderBy('created_at', 'desc')
            ->withCount('comments')
            ->paginate(6);

        return view('articles', compact('articles'));
    }
}
