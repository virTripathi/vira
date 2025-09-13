<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskManagement\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Calendars\GoogleCalendarController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\PaymentController;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified', 'authorize:admin'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});



Route::middleware(['auth', 'authorize:user'])->group(function () {
    Route::resource('tasks', TaskController::class);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/calendar-event', [GoogleCalendarController::class, 'createEvent'])->name('calendar.event');
    Route::get('/chats', [ChatController::class, 'index'])->name('chats.index');
    Route::get('/chats/{id}', [ChatController::class, 'show'])->name('chats.show');
    Route::post('/chats', [ChatController::class, 'store'])->name('chats.store');
    Route::post('/create-subscription', [SubscriptionController::class, 'store'])->name('subscription.create');
    Route::get('/payment/success', [PaymentController::class, 'success'])->name('payment.success');
    Route::get('/payment/failed', [PaymentController::class, 'failed'])->name('payment.failed');
});
Route::get('/google/redirect', [GoogleCalendarController::class, 'redirect'])->name('google.redirect');
Route::get('/google/callback', [GoogleCalendarController::class, 'callback'])->name('google.callback');
Route::get('auth/google/callback', [GoogleController::class, 'callback']);

require __DIR__ . '/auth.php';
