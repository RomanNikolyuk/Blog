<?php

use Illuminate\Support\Facades\Route;

Route::prefix('admin')->middleware('auth')->group(function () {
    Route::resource('articles', \App\Http\Controllers\Admin\ArticleController::class)
        ->except('show', 'destroy');
    Route::redirect('/', route('articles.index'));


    Route::post('upload', [\App\Http\Controllers\Admin\ArticleController::class, 'upload']);
    Route::post('remove', [\App\Http\Controllers\Admin\ArticleController::class, 'remove']);
});
