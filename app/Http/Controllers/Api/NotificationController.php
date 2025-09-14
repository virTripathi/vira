<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Jobs\LogJob;

class NotificationController extends Controller
{
    public function saveFcmToken(Request $request) {
        try {
            LogJob::dispatch('NotificationController.saveFcmToken',['userId'=>Auth::id()]);
            $request->validate(['fcm_token' => 'required']);
            Auth::user()->update(['fcm_token' => $request->fcm_token]);
            return response()->json(['status' => 'Token saved']);
        } catch(\Exception $e) {
            LogJob::dispatch('NotificationController.saveFcmToken.error',$e, 'critical');
        }
    }
}
