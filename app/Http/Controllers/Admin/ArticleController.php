<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ArticleRequest;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Spatie\Url\Url;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::paginate(20);
        return view('admin.articles', compact('articles'));
    }

    public function create()
    {
        return view('admin.articles_entity');
    }

    public function store(ArticleRequest $request)
    {
        Article::create($request->validated());

        return response()->json(['success' => 1]);
    }

    public function upload(Request $request)
    {
        abort_unless($request->hasFile('image'), 422);

        $image = $request->file('image');
        $imageName = Str::random(8).'.'.$image->getClientOriginalExtension();
        // TODO: catch errors
        $image->storeAs('public/articles', $imageName);

        return [
            'success' => 1,
            'file' => [
                "url" => asset('storage/articles/'.$imageName)
            ]
        ];
    }

    public function remove(Request $request)
    {
        abort_unless($request->has('image'), 422);

        $uri = Url::fromString($request->image)->getPath();

        unlink(public_path($uri));

        return [
            'success' => 1,
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
