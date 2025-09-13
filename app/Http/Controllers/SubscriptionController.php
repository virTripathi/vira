<?php

namespace App\Http\Controllers;

use App\Http\Services\SubscriptionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    protected $subscriptionService;

    public function __construct(SubscriptionService $subscriptionService)
    {
        $this->subscriptionService = $subscriptionService;
    }

    public function store(Request $request)
    {
        $planIds = array_keys(config('services.razorpay.plan_ids'));

        $validated = $request->validate([
            'plan' => 'required|in:' . implode(',', $planIds),
        ]);

        try {
            $subscription = $this->subscriptionService->createSubscription(
                $validated['plan'],
                Auth::id()
            );

            return Inertia::render('Subscription', [
                'razorpay_key'    => config('services.razorpay.key'),
                'subscription_id' => $subscription->razorpay_subscription_id,
                'plan'            => $subscription->plan,
            ]);
        } catch (\Exception $e) {
            Log::error('Razorpay subscription error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Unable to create subscription. Please try again later.',
            ], 500);
        }
    }

    public function cancel($id)
    {
        try {
            $this->subscriptionService->cancelSubscription($id, Auth::id());

            return back()->with('success', 'Subscription cancelled successfully.');
        } catch (\Exception $e) {
            Log::error('Cancel subscription error: ' . $e->getMessage());

            return back()->withErrors(['error' => 'Unable to cancel subscription.']);
        }
    }

    public function pause($id)
    {
        try {
            $this->subscriptionService->pauseSubscription($id, Auth::id());

            return back()->with('success', 'Subscription paused successfully.');
        } catch (\Exception $e) {
            dd($e);
            Log::error('Pause subscription error: ' . $e->getMessage());

            return back()->withErrors(['error' => 'Unable to pause subscription.']);
        }
    }

    public function resume($id)
    {
        try {
            $this->subscriptionService->resumeSubscription($id, Auth::id());

            return back()->with('success', 'Subscription resumed successfully.');
        } catch (\Exception $e) {
            Log::error('Resume subscription error: ' . $e->getMessage());

            return back()->withErrors(['error' => 'Unable to resume subscription.']);
        }
    }
}