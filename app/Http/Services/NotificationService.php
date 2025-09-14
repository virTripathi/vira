<?php

namespace App\Services;

use Kreait\Firebase\Contract\Messaging;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\MessageTarget;
use Kreait\Firebase\Messaging\Notification;

class FirebaseService
{
    protected $messaging;

    public function __construct(Messaging $messaging)
    {
        $this->messaging = $messaging;
    }

    public function sendToToken(string $token, string $title, string $body)
    {
        $message = CloudMessage::new()->toToken(MessageTarget::TOKEN, $token)
            ->withNotification(Notification::create($title, $body));

        return $this->messaging->send($message);
    }
}