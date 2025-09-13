<?php

namespace App\Http\Services;

use App\Models\Subscription;
use Razorpay\Api\Api;

class SubscriptionService
{
    protected $api;
    protected $planIds;

    public function __construct()
    {
        $this->api = new Api(
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

        $razorPaySubscription = $this->api->subscription->create([
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
}
