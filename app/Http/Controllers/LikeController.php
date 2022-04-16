<?php

namespace App\Http\Controllers;

use App\Http\Requests\LikeRequest;
use App\Models\Like;

class LikeController extends Controller
{
    public function like(LikeRequest $request)
    {
        if (is_null(Like::userRow($request->article_id)->first())) {
            Like::create(['article_id' => $request->article_id, 'ip_address' => $request->ip()]);
        } else {
            Like::userRow($request->article_id)->delete();
        }
        $likes_count = Like::where('article_id', $request->article_id)->count();

        return response()->json(['success' => true, 'count' => $likes_count]);
    }

    public function check(LikeRequest $request)
    {
        $liked = (bool) Like::userRow($request->article_id)->count();
        $likes_count = Like::where('article_id', $request->article_id)->count();

        return response()->json(['success' => true, 'liked' => $liked, 'count' => $likes_count]);
    }
}
