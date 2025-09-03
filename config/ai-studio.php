<?php

return [
    'base_url' => env('GOOGLE_AI_STUDIO_BASE_URL', ''),
    'api_key' => env('GOOGLE_AI_STUDIO_API_KEY', ''),
    'core_prompt' => env('AGENT_CORE_PROMPT', 'You are VIRA, an AI assistant...'),
    'actions' => [
        'create_reminder' => [
            'description' => 'Creates a reminder for the user.',
            'examples' => [
                'Remind me to drink water at 3pm',
                'Set a daily reminder to check emails'
            ],
            'arguments' => [
                ['name' => 'title', 'type' => 'string', 'required' => true],
                ['name' => 'time', 'type' => 'datetime', 'required' => true],
                [
                    'name' => 'recurrence',
                    'type' => 'enum',
                    'values' => ['none', 'daily', 'weekly'],
                    'required' => false,
                    'default' => 'none'
                ]
            ],
            'returns' => 'object',
            'side_effects' => ['saves reminder', 'sends notification'],
            'async' => true,
            'timeout' => 5000,
            'retry_policy' => 'exponential_backoff',
            'integration' => 'local_db',
            'auth_required' => false,
            'response_text' => 'Reminder to {title} at {time} created successfully'
        ],

        'schedule_meeting' => [
            'description' => 'Schedules a meeting in the user\'s calendar.',
            'arguments' => [
                ['name' => 'attendees', 'type' => 'array<string>', 'required' => true],
                ['name' => 'date', 'type' => 'string', 'required' => true],
                ['name' => 'time', 'type' => 'string', 'required' => true],
                ['name' => 'topic', 'type' => 'string', 'required' => true],
            ],
            'returns' => 'object',
            'side_effects' => ['creates calendar event', 'sends invites'],
            'async' => true,
            'integration' => 'google_calendar',
            'auth_required' => true,
            'response_text' => 'Meeting scheduled successfully'
        ],

        'weather_info' => [
            'description' => 'Fetches current weather information for a specific location.',
            'examples' => [
                'What\'s the weather like in New York?',
                'Get me the current weather in London'
            ],
            'arguments' => [
                ['name' => 'location', 'type' => 'string', 'required' => true],
            ],
            'returns' => 'object',
            'side_effects' => ['fetches weather data'],
            'async' => true,
            'integration' => 'weather_api',
            'auth_required' => false,
            'response_text' => "The weather in {name}, {country} is {temp_c}°C with {text} condition. It feels like {feelslike_c}°C and humidity is {humidity}%.",
        ]

    ],
];