<?php

namespace App\Http\Services;

use Razorpay\Api\Api;
use App\Models\Subscription;

class SubscriptionService
{
    protected $razorpay;
    protected $planIds;

    public function __construct()
    {
        $this->razorpay = new Api(
            config('services.razorpay.key'),
            config('services.razorpay.secret')
        );
        $this->planIds = config('services.razorpay.plan_ids');
    }

    public function createSubscription(string $plan, int $userId)
    {
        if (! isset($this->planIds[$plan])) {
            throw new \InvalidArgumentException("Invalid plan: $plan");
        }

        $razorPaySubscription = $this->razorpay->subscription->create([
            'plan_id'        => $this->planIds[$plan],
            'customer_notify' => 1,
            'total_count'    => 24,
            'notes' => [
                'plan'    => $plan,
                'user_id' => $userId,
            ],
        ]);
        $subscription = Subscription::create([
            'user_id' => $userId,
            'razorpay_subscription_id' => $razorPaySubscription['id'],
            'razorpay_plan_id' => $razorPaySubscription['plan_id'],
            'plan' => $plan,
            'status' => 'pending',
        ]);
        return $subscription;
    }

    public function cancelSubscription(string $subscriptionId, int $userId)
    {
        $razorpaySub = $this->razorpay->subscription->fetch($subscriptionId);
        $razorpaySub->cancel();

        // Update local DB
        return Subscription::where('razorpay_subscription_id', $subscriptionId)
            ->where('user_id', $userId)
            ->update(['status' => 'cancelled']);
    }

    public function pauseSubscription(string $subscriptionId, int $userId)
    {
        $razorpaySub = $this->razorpay->subscription->fetch($subscriptionId);
        $razorpaySub->pause(['pause_at' => 'now']);

        return Subscription::where('razorpay_subscription_id', $subscriptionId)
            ->where('user_id', $userId)
            ->update(['status' => 'paused']);
    }

    public function resumeSubscription(string $subscriptionId, int $userId)
    {
        $razorpaySub = $this->razorpay->subscription->fetch($subscriptionId);
        $razorpaySub->resume();

        return Subscription::where('razorpay_subscription_id', $subscriptionId)
            ->where('user_id', $userId)
            ->update(['status' => 'active']);
    }
}
