<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class GoogleController extends Controller
{
    public function redirect()
    {
        $query = http_build_query([
            'client_id' => config('services.google.client_id'),
            'redirect_uri' => config('services.google.redirect'),
            'response_type' => 'code',
            'scope' => 'openid email profile https://www.googleapis.com/auth/calendar',
            'access_type' => 'offline',
            'prompt' => 'consent',
        ]);

        return redirect('https://accounts.google.com/o/oauth2/auth?' . $query);
    }

    public function callback(Request $request)
    {
        if ($request->has('error')) {
            return redirect()->route('login')->withErrors(['email' => 'Google authentication was cancelled.']);
        }

        $code = $request->get('code');
        
        $response = Http::post('https://oauth2.googleapis.com/token', [
            'client_id' => config('services.google.client_id'),
            'client_secret' => config('services.google.client_secret'),
            'code' => $code,
            'grant_type' => 'authorization_code',
            'redirect_uri' => config('services.google.redirect'),
        ]);

        if (!$response->successful()) {
            return redirect()->route('login')->withErrors(['email' => 'Failed to authenticate with Google.']);
        }

        $tokenData = $response->json();
        $accessToken = $tokenData['access_token'];
        $refreshToken = $tokenData['refresh_token'] ?? null;

        $userResponse = Http::withHeaders([
            'Authorization' => 'Bearer ' . $accessToken,
        ])->get('https://www.googleapis.com/oauth2/v2/userinfo');

        if (!$userResponse->successful()) {
            return redirect()->route('login')->withErrors(['email' => 'Failed to get user information from Google.']);
        }

        $googleUser = $userResponse->json();
        Log::info('Google User Info: ' . json_encode($googleUser));
        // Find or create user
        $user = User::where('email', $googleUser['email'])->first();

        if (!$user) {
            // Create new user
            $user = User::create([
                'name' => $googleUser['name'],
                'email' => $googleUser['email'],
                'password' => Hash::make(Str::random(16)),
                'email_verified_at' => now(),
                'profile_picture' => $googleUser['picture'] ?? null,
            ]);
        }

        // Store Google tokens for calendar access
        $user->update([
            'google_access_token' => $accessToken,
            'google_refresh_token' => $refreshToken,
            'google_token_expires_at' => now()->addSeconds($tokenData['expires_in'] ?? 3600),
        ]);

        // Log in the user
        Auth::login($user);

        return redirect()->intended(route('dashboard'));
    }
}
