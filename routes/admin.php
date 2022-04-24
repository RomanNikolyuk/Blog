<?php

use Illuminate\Support\Facades\Route;

/**
 * All routes has prefix admin, auth middleware
 * @view RouteServiceProvider
 */


Route::prefix('admin')->group(function() {
    Route::resource('/articles', \App\Http\Controllers\Admin\ArticleController::class)
        ->only('index', 'create', 'store', 'edit', 'update');
});
