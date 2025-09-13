<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function success(Request $request)
    {
        return Inertia::render('PaymentSuccess', [
            'payment_id' => $request->query('payment_id'),
            'subscription_id' => $request->query('subscription_id'),
        ]);
    }

    public function failed(Request $request)
    {
        return Inertia::render('PaymentFailed', [
            'error' => $request->query('error') ?? 'Payment could not be completed',
        ]);
    }
}