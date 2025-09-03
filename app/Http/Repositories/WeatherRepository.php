<?php

namespace App\Http\Repositories;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log as FacadesLog;

class WeatherRepository
{
    public function getCurrentWeather($location)
    {
        $response = Http::get(config('weather.base_url') . 'current.json', [
            'key' => config('weather.key'),
            'q'   => $location,
            'aqi' => 'no',
        ]);
        FacadesLog::info('Weather API response', ['response' => $response->json()]);
        if ($response->successful()) {
            return $response->json();
        }

        return ['error' => 'Unable to fetch weather'];
    }
}
