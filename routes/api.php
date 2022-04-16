<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('comment', [\App\Http\Controllers\CommentController::class, 'add'])->name('comment.add');
Route::post('like', [\App\Http\Controllers\LikeController::class, 'like']);
Route::post('like/check', [\App\Http\Controllers\LikeController::class, 'check']);
