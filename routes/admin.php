<?php

use Illuminate\Support\Facades\Route;

/**
 * All routes has prefix admin, auth middleware
 * @view RouteServiceProvider
 */


Route::prefix('admin')->middleware('auth')->group(function() {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});
