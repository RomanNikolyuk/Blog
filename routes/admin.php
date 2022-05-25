<?php

use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function () {
    Route::redirect('/', '/admin/articles');
    Route::resource('articles', \App\Http\Controllers\Admin\ArticleController::class)
        ->except('show', 'destroy');

    Route::post('upload', [\App\Http\Controllers\Admin\ArticleController::class, 'upload']);
    Route::post('remove', [\App\Http\Controllers\Admin\ArticleController::class, 'remove']);
});
