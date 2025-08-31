<?php

namespace App\Jobs;

use App\Events\AnswerGeneratedEvent;
use App\Http\Repositories\RepositoryBuilder;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

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
        $repositoryBuilder = new RepositoryBuilder();
        $this->aiModel = $repositoryBuilder->build('AiModels\GoogleAIStudio');
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        dispatch(new LogJob('GenerateAiAnswerJob.handle', ['chatQuestion' => $this->chatQuestion]));
        try {
            $response = $this->aiModel->ask($this->chatQuestion->question);

            switch($response['type']) {
                case 'text':
                    $this->chatQuestion->answer = $response['message'];
                    break;
                case 'function':
                    $functionName = $response['name'];
                    $functionArgs = $response['args'] ?? [];
                    $responseText = config('ai-studio.actions.' . $functionName . '.response_text');
                    $responseText = preg_replace_callback('/\{(\w+)\}/', function ($matches) use ($functionArgs) {
                        return $functionArgs[$matches[1]] ?? $matches[0];
                    }, $responseText);
                    $this->chatQuestion->answer = $responseText;
                    break;
                default:
                    $this->chatQuestion->status = 'failed';

                
            }

            // Fire event with retry mechanism
            AnswerGeneratedEvent::dispatchWithRetry($this->chatQuestion->answer);

        } catch (\Exception $e) {
            dispatch(new LogJob('GenerateAiAnswerJob.handle.error', ['exception' => $e]));
            // Handle exception
        }

    }

    public function failed(\Exception $exception)
    {
        // Take action on job failure, e.g. log or notify
        \Log::error('GenerateAiAnswerJob failed: ' . $exception->getMessage());
        // ...additional failure handling...
    }
}
