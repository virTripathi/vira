<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class VerifyRazorpayWebhook
{
    public function handle(Request $request, Closure $next)
    {
        $payload = $request->getContent();
        $signature = $request->header('X-Razorpay-Signature');
        $secret = config('services.razorpay.webhook_secret');

        $generated_signature = hash_hmac('sha256', $payload, $secret);

        if (!hash_equals($generated_signature, $signature)) {
            Log::warning('Invalid Razorpay Webhook Signature.');
            return response()->json(['status' => 'invalid signature'], 400);
        }

        return $next($request);
    }
}