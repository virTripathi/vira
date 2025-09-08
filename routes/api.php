<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Calendars\GoogleCalendarController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->prefix('v1')->group(function() {
    Route::get('/chats', [\App\Http\Controllers\Chatbot\ChatController::class, 'index'])->name('chats.index');
    Route::post('/chats', [\App\Http\Controllers\Chatbot\ChatController::class, 'store'])->name('chats.store');
    Route::put('/chats/{id}', [\App\Http\Controllers\Chatbot\ChatController::class, 'update'])->name('chats.update');
    Route::delete('/chats/{id}', [\App\Http\Controllers\Chatbot\ChatController::class, 'delete'])->name('chats.delete');
    Route::get('sidebar',[App\Http\Controllers\Main\SidebarController::class,'index']);
});
