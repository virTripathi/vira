<?php

namespace App\Http\Controllers\Calendars;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\GoogleCalendarService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Crypt;

class GoogleCalendarController extends Controller
{
    private $googleService;

    public function __construct(GoogleCalendarService $googleService)
    {
        $this->googleService = $googleService;
    }

    public function redirect()
    {
        Log::info('GoogleCalendarController.redirect');
        return redirect()->away($this->googleService->getAuthUrl());
    }

    public function callback(Request $request)
    {
        Log::info('GoogleCalendarController.callback', Crypt::encrypt($request->all()));
        $token = $this->googleService->authenticate($request->code);
        $user = Auth::user();
        $user->google_token = json_encode($token);
        $user->save();
        return $this->successResponse('Google Calendar connected successfully.');
    }
}
