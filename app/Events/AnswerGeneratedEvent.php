<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AnswerGeneratedEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $answer;
    public $retries = 0;
    public $maxRetries = 3;
    public $userId;

    /**
     * Create a new event instance.
     *
     * @param mixed $answer
     * @param int $retries
     * @param int|null $userId
     * @return void
     */
    public function __construct($answer, $retries = 0, $userId = null)
    {
        $this->answer = $answer;
        $this->retries = $retries;
        $this->userId = $userId;
    }

    /**
     * Dispatch the event with retry mechanism.
     *
     * @param mixed $answer
     * @param int $maxRetries
     * @param int|null $userId
     * @return void
     */
    public static function dispatchWithRetry($answer, $maxRetries = 3, $userId = null)
    {
        $retries = 0;
        do {
            try {
                event(new self($answer, $retries, $userId));
                break;
            } catch (\Exception $e) {
                $retries++;
                if ($retries > $maxRetries) {
                    throw $e;
                }
                sleep(1);
            }
        } while ($retries <= $maxRetries);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        // Broadcast on a private channel for the user
        return new PrivateChannel('user.' . $this->userId);
    }

    /**
     * Data to broadcast.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return [
            'answer' => $this->answer,
            'retries' => $this->retries,
        ];
    }
}
