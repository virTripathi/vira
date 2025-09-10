<?php

namespace App\Http\Controllers\Calendars;

use App\Http\Controllers\Controller;
use App\Http\Repositories\Calendars\GoogleCalendarRepository;
use Illuminate\Http\Request;
// use App\Services\Calendars\GoogleCalendarService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Crypt;

class GoogleCalendarController extends Controller
{
    private $googleService;

    public function createEvent(Request $request)
    {
        Log::info('GoogleCalendarController.createEvent', [Crypt::encrypt($request->all())]);
        $args = $request->validate([
            'date' => 'required|date',
            'time' => 'required',
            'duration_minutes' => 'nullable|integer',
            'topic' => 'required|string',
            'attendees' => 'nullable|array',
        ]);

        $startDateTime = Carbon::parse("{$args['date']} {$args['time']}");
        $endDateTime = $startDateTime->copy()->addMinutes($args['duration_minutes'] ?? 30);
        $repository = new GoogleCalendarRepository();
        return $repository->createEvent($args["topic"], $startDateTime, $endDateTime, $args["attendees"]);
    }
}
