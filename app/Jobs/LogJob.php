<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Exception;

class LogJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $message;
    protected $context;
    protected $type;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($message, array|Exception $context = [], $type = 'info')
    {
        $this->message = $message;
        $this->context = $this->buildContext($context);
        $this->type = $type;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Log::{$this->type}($this->message, $this->context);
    }

    public function buildContext($context): array
    {
        if ($context instanceof Exception) {
            return [
                'exception' => [
                    'message' => $context->getMessage(),
                    'code' => $context->getCode(),
                    'file' => $context->getFile(),
                    'line' => $context->getLine(),
                ],
            ];
        }

        return $context;
    }
}
