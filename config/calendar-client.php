<?php

return [
    'google' => [
        'client_id' => env('GOOGLE_CALENDAR_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CALENDAR_CLIENT_SECRET'),
        'redirect' => env('GOOGLE_CALENDAR_REDIRECT_URL','http://localhost:8000/auth/google/callback'),
        'scopes' => [
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/calendar.events',
            'https://www.googleapis.com/auth/calendar.events.readonly',
            'https://www.googleapis.com/auth/calendar.readonly',
        ],
        'access_type' => 'offline',
        'approval_prompt' => 'force',
    ],
     'teams' => [
        'client_id' => env('TEAMS_CALENDAR_CLIENT_ID'),
        'client_secret' => env('TEAMS_CALENDAR_CLIENT_SECRET'),
        'redirect' => env('TEAMS_CALENDAR_REDIRECT_URL','http://localhost:8000/auth/microsoft/callback'),
        'scopes' => [
            'openid',
            'profile',
            'offline_access',
            'User.Read',
            'Calendars.Read',
            'Calendars.ReadWrite',
            'Calendars.Read.Shared',
            'Calendars.ReadWrite.Shared',
        ],
    ],
];