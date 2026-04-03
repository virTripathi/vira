<?php

namespace App\Jobs;

use App\Http\Repositories\RepositoryBuilder;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class GenerateChatTitleJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3;

    private $chat;
    private $questionText;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($chat, $questionText)
    {
        $this->chat = $chat;
        $this->questionText = $questionText;
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

        try {
            $prompt = "Generate a short, concise title (max 5 words) for a conversation starting with this question: '{$this->questionText}'. Only output the title string.";
            $response = $aiModel->ask($prompt, $this->chat->user);

            if ($response && isset($response['data'])) {
                // Remove extra quotes, markdown backticks, or trailing periods
                $title = trim($response['data'], " \"\t\n\r\0\x0B*`.");
                $this->chat->title = $title;
                $this->chat->saveQuietly();
            }
        } catch (\Exception $e) {
            Log::error('GenerateChatTitleJob failed', ['error' => $e->getMessage()]);
        }
    }

    public function failed($error)
    {
        Log::error('GenerateChatTitleJob failed permanently', ['error' => $error]);
    }
}
