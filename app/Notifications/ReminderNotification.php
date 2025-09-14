<?php

namespace App\Notifications;

use App\Broadcasting\FirebaseChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Log;
use Kreait\Firebase\Messaging\Notification as FirebaseNotification;
use Kreait\Firebase\Contract\Messaging;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\MessageTarget;

class ReminderNotification extends BaseNotification
{
    use Queueable;

    protected $title;
    protected $body;

    public function __construct($title, $body)
    {
        $this->title = $title;
        $this->body = $body;
    }

    public function toArray($notifiable)
    {
        return [
            'title' => $this->title,
            'body' => $this->body,
        ];
    }

    public function via($notifiable)
    {
        return [FirebaseChannel::class];
    }

    public function toFirebase($notifiable)
    {
        if (! $notifiable->fcm_token) {
            return null;
        }

        return CloudMessage::new()
            ->toToken($notifiable->fcm_token)
            ->withNotification(FirebaseNotification::create($this->title, $this->body));
    }
}
