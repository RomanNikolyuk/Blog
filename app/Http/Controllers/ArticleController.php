<?php

namespace App\Http\Controllers;

use App\Events\ArticleLoaded;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::orderBy('created_at', 'desc')
            ->withCount('comments')
            ->paginate(8);
        $articles->useBootstrap();

        return view('articles', compact('articles'));
    }

    public function view(Article $article)
    {
        $article->load('comments', 'tags');
        ArticleLoaded::dispatch($article->id);

        return view('entity', compact('article'));
    }
}
