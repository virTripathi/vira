<?php

namespace App\Broadcasting;

use App\Notifications\BaseNotification;
use Kreait\Firebase\Contract\Messaging;

class FirebaseChannel
{
    protected $messaging;

    public function __construct(Messaging $messaging)
    {
        $this->messaging = $messaging;
    }

    public function send($notifiable, BaseNotification $notification)
    {
        if (! method_exists($notification, 'toFirebase')) {
            return;
        }

        $message = $notification->toFirebase($notifiable);
        if ($message) {
            try {
                $this->messaging->send($message);
            } catch (\Throwable $e) {
                \Log::error('Firebase send error: ' . $e->getMessage());
            }
        }
    }
}