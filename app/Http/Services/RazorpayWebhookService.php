<?php

namespace App\Http\Services;

use App\Models\Subscription;
use Illuminate\Support\Facades\Log;

class RazorpayWebhookService
{
    public function handleEvent($event, $payload)
    {
        Log::info("Razorpay Webhook Event: $event", $payload);

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
            case 'subscription.expired':
                $this->completeSubscription($payload);
                break;

            case 'subscription.paused':
                $this->subscriptionPaused($payload);
                break;

            case 'subscription.resumed':
                $this->subscriptionResumed($payload);
                break;

            case 'payment.failed':
                $this->paymentFailed($payload);
                break;

            default:
                Log::info('Unhandled Razorpay event: ' . $event);
        }
    }

    private function activateSubscription(array $payload)
    {
        $entity = $payload['subscription']['entity'] ?? ($payload['payload']['subscription']['entity'] ?? null);
        if ($entity) {
            $this->updateUserSubscription($entity, 'active');
        }
    }

    private function chargeSubscription(array $payload)
    {
        $entity = $payload['subscription']['entity'] ?? ($payload['payload']['subscription']['entity'] ?? null);
        $payment = $payload['payment']['entity'] ?? null;

        if ($entity) {
            $this->updateUserSubscription($entity, 'active', $payment);
        }
    }

    private function cancelSubscription(array $payload)
    {
        $entity = $payload['subscription']['entity'] ?? ($payload['payload']['subscription']['entity'] ?? null);
        if ($entity) {
            $this->updateUserSubscription($entity, 'cancelled');
        }
    }

    private function completeSubscription(array $payload)
    {
        $entity = $payload['subscription']['entity'] ?? ($payload['payload']['subscription']['entity'] ?? null);
        if ($entity) {
            $this->updateUserSubscription($entity, 'expired');
        }
    }

    private function paymentFailed(array $payload)
    {
        $subscriptionId = $payload['payment']['entity']['subscription_id'] ?? null;
        if ($subscriptionId) {
            $subscription = Subscription::where('razorpay_subscription_id', $subscriptionId)->first();
            if ($subscription) {
                $subscription->status = 'failed';
                $subscription->save();
            }
        }
    }

    private function updateUserSubscription(array $entity, string $status, array $payment = null)
    {
        $subscription = Subscription::where('razorpay_subscription_id', $entity['id'])->first();

        if ($subscription) {
            $subscription->status = $status;
            $subscription->razorpay_plan_id = $entity['plan_id'] ?? $subscription->razorpay_plan_id;
            $subscription->plan = $entity['notes']['plan'] ?? $subscription->plan;

            if ($payment) {
                $subscription->razorpay_payment_id = $payment['id'] ?? $subscription->razorpay_payment_id;
            }

            $subscription->save();
        }
    }

    public function subscriptionPaused(array $payload)
    {
        $entity = $payload['subscription']['entity'] ?? ($payload['payload']['subscription']['entity'] ?? null);
        if ($entity) {
            $this->updateUserSubscription($entity, 'paused');
        }
    }

    public function subscriptionResumed(array $payload)
    {
        $entity = $payload['subscription']['entity'] ?? ($payload['payload']['subscription']['entity'] ?? null);
        if ($entity) {
            $this->updateUserSubscription($entity, 'active');
        }
    }
}