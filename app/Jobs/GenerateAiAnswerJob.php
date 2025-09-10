<?php

namespace App\Jobs;

use App\Events\AnswerGeneratedEvent;
use App\Http\Repositories\RepositoryBuilder;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class GenerateAiAnswerJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3;

    private $aiModel;
    private $chatQuestion;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($chatQuestion)
    {
        $this->chatQuestion = $chatQuestion;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $repositoryBuilder = new RepositoryBuilder();
        $aiModel = $repositoryBuilder->build('AiModels\GoogleAIStudio');
        $chatQuestion = $this->chatQuestion->fresh();
        LogJob::dispatch('GenerateAiAnswerJob.handle', ['chatQuestion' => $this->chatQuestion]);
        try {
            $response = $aiModel->ask($chatQuestion->question, $chatQuestion->chat->user);
            $latestVersion = $this->chatQuestion
                ->answers()
                ->max('version') ?? 0;

            switch ($response['type']) {
                case 'text':
                    $this->chatQuestion->answers()->create([
                        'answer'  => $response['data'],
                        'version' => $latestVersion + 1,
                    ]);
                    break;
                case 'function':
                    $this->chatQuestion->answers()->create([
                        'answer'  => $response['data'],
                        'version' => $latestVersion + 1,
                    ]);

                    break;
                default:
                    $this->chatQuestion->status = 'failed';
            }
            $this->chatQuestion->saveQuietly();
            LogJob::dispatch('GenerateAiAnswerJob.handle.completed', ['chatQuestion' => $this->chatQuestion]);
            AnswerGeneratedEvent::dispatchWithRetry($this->chatQuestion->latestAnswer->answer, 3, $this->chatQuestion->chat->user_id);
        } catch (\Exception $e) {
            LogJob::dispatch('GenerateAiAnswerJob.handle.error', $e, 'error');
            // Handle exception
        }
    }

    public function failed($error)
    {
        Log::error('GenerateAiAnswerJob failed', ['error' => $error]);
    }
}
