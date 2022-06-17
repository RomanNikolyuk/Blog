<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ArticleRequest;
use App\Http\Requests\ImageUploadRequest;
use App\Models\Article;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Spatie\Url\Url;

class ArticleController extends Controller
{
    public function index() : View
    {
        $articles = Article::paginate(20);

        return view('admin.articles', compact('articles'));
    }

    public function create() : View
    {
        return view('admin.articles_entity');
    }

    public function store(ArticleRequest $request) : JsonResponse
    {
        Article::create($request->validated());

        return response()->json(['success' => true]);
    }

    public function upload(ImageUploadRequest $request) : JsonResponse
    {
        $image = $request->file('image');
        $imageName = Str::random(8).'.'.$image->getClientOriginalExtension();
        $image->storeAs('public/articles', $imageName);

        return response()->json([
            'success' => true,
            'file' => [
                "url" => asset('storage/articles/'.$imageName)
            ]
        ]);
    }

    public function remove(Request $request) : JsonResponse
    {
        abort_unless($request->has('image'), 422);

        $uri = Url::fromString($request->image)->getPath();

        unlink(public_path($uri));

        return response()->json([
            'success' => true,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function edit(Article $article) : View
    {
        // Getting Attribute without accessor
        $article->rawDescription = $article->getAttributes()['description'];
        return view('admin.articles_entity', compact('article'));
    }

    public function update(ArticleRequest $request, Article $article) : JsonResponse
    {
        $isSaved = $article->fill($request->validated())->save();

        return response()->json(['success' => $isSaved]);
    }
}
