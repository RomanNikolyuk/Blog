<?php

namespace App\Http\Controllers;

use App\Events\ArticleLoaded;
use App\Models\Article;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index() : View
    {
        $articles = Article::orderBy('created_at', 'desc')
            ->withCount('comments')
            ->paginate(8);

        return view('articles', compact('articles'));
    }

    public function view(Article $article) : View
    {
        $article->load('comments', 'tags');
        ArticleLoaded::dispatch($article->id);

        return view('entity', compact('article'));
    }
}
