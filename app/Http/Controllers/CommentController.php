<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;

class CommentController extends Controller
{
    public function add(CommentRequest $request) : JsonResponse
    {
        Comment::create($request->validated());
        return response()->json(['success' => true, 'message' => 'Comment successfully added']);
    }
}
