<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;

abstract class BaseNotification extends Notification
{
    /**
     * Every notification extending this must implement toFirebase().
     *
     * @param  mixed $notifiable
     * @return mixed
     */
    abstract public function toFirebase($notifiable);
}