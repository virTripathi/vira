<?php

namespace App\Http\Services;

use App\Models\Subscription;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class RazorpayWebhookService
{
    public function handleEvent($event, $payload)
    {
        Log::info("Razorpay Webhook Event: $event");

        switch ($event) {
            case 'subscription.activated':
                $this->activateSubscription($payload);
                break;
            case 'subscription.charged':
                $this->chargeSubscription($payload);
                break;
            case 'subscription.cancelled':
                $this->cancelSubscription($payload);
                break;
            case 'subscription.completed':
                $this->completeSubscription($payload);
                break;
            case 'payment.failed':
                $this->paymentFailed($payload);
                break;
            case 'subscription.paused':
                $this->subscriptionPaused($payload);
            case 'subscription.resume':
                $this->subscriptionResumed($payload);
            case 'subscription.cancel':
                $this->subscriptionCancelled($payload);
                break;
            default:
                Log::info('Unhandled event: ' . $event);
        }
    }

    private function activateSubscription($payload)
    {
        $this->updateUserSubscription($payload['subscription']['entity']['id'], 'active');
    }

    private function chargeSubscription($payload)
    {
        $this->updateUserSubscription($payload['subscription']['entity']['id'], 'active');
    }

    private function cancelSubscription($payload)
    {
        $this->updateUserSubscription($payload['subscription']['entity']['id'], 'cancelled');
    }

    private function completeSubscription($payload)
    {
        $this->updateUserSubscription($payload['subscription']['entity']['id'], 'completed');
    }

    private function paymentFailed($payload)
    {
        $subscriptionId = $payload['payment']['entity']['subscription_id'] ?? null;
        if ($subscriptionId) {
            $this->updateUserSubscription($subscriptionId, 'payment_failed');
        }
    }

    private function updateUserSubscription($razorpaySubscriptionId, $status)
    {
        $user = User::where('razorpay_subscription_id', $razorpaySubscriptionId)->first();
        if ($user) {
            $user->subscription_status = $status;
            $user->save();
        }
    }

    public function subscriptionPaused(array $payload)
    {
        $entity = $payload['payload']['subscription']['entity'] ?? null;
        if (!$entity) {
            Log::error('Razorpay Webhook: subscriptionPaused missing entity', $payload);
            return false;
        }

        return Subscription::where('razorpay_subscription_id', $entity['id'])
            ->update(['status' => $entity['status'] ?? 'paused']);
    }

    public function subscriptionResumed(array $payload)
    {
        $entity = $payload['payload']['subscription']['entity'] ?? null;
        if (!$entity) {
            Log::error('Razorpay Webhook: subscriptionResumed missing entity', $payload);
            return false;
        }

        return Subscription::where('razorpay_subscription_id', $entity['id'])
            ->update(['status' => $entity['status'] ?? 'active']);
    }

    public function subscriptionCancelled(array $payload)
    {
        $entity = $payload['payload']['subscription']['entity'] ?? null;
        if (!$entity) {
            Log::error('Razorpay Webhook: subscriptionCancelled missing entity', $payload);
            return false;
        }

        return Subscription::where('razorpay_subscription_id', $entity['id'])
            ->update(['status' => $entity['status'] ?? 'cancelled']);
    }
}
