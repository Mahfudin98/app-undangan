<?php

use App\Http\Controllers\Guest\EditorController;
use App\Http\Controllers\Guest\InvitationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// guest
Route::prefix('invitation')->group(function () {
    Route::post('guest', [InvitationController::class, 'store'])->name('invitation.store');
    Route::post('{invitation}/publish', [InvitationController::class, 'publish'])->name('invitation.publish');

    Route::get('builder/{invitation}', [EditorController::class, 'index'])->name('builder');
    Route::get('builder/{invitation}/data', [EditorController::class, 'data'])->name('builder.data');
    Route::put('builder/{invitation}/save', [EditorController::class, 'save'])->name('builder.save');
});

Route::get('i/{slug}', [InvitationController::class, 'invitation'])->name('invitation.invitation');

require __DIR__ . '/settings.php';
