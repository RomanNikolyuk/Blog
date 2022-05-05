<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', \App\Http\Controllers\IndexController::class)->name('index');
Route::get('/articles', [\App\Http\Controllers\ArticleController::class, 'index'])->name('article.index');
Route::get('/articles/{article}', [\App\Http\Controllers\ArticleController::class, 'view'])->name('article.view');


require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
