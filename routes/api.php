<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Main\SidebarController;
use App\Http\Controllers\RazorpayWebhookController;

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

Route::middleware('auth:sanctum')->prefix('v1')->group(function() {
    Route::get('/chats', [ChatController::class, 'index'])->name('api.v1.chats.index');
    Route::post('/chats', [ChatController::class, 'store'])->name('api.v1.chats.store');
    Route::put('/chats/{id}', [ChatController::class, 'update'])->name('api.v1.chats.update');
    Route::delete('/chats/{id}', [ChatController::class, 'delete'])->name('api.v1.chats.delete');
    Route::get('sidebar',[SidebarController::class,'index']);
    Route::post('/chats/{chatId}/question', [ChatController::class, 'storeQuestion'])->name('api.v1.chats.storeMessage');
    Route::post('/save-fcm-token', [NotificationController::class, 'saveFcmToken'])->name('api.v1.notifications.save-fcm-token');
});

Route::post('v1/razorpay/webhook', [RazorpayWebhookController::class, 'handle'])
    ->middleware('razorpay.webhook');

