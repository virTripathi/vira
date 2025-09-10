<?php

namespace App\Http\Services;

use App\Events\AnswerGeneratedEvent;
use App\Models\Chatbot\Chat;
use App\Models\Chatbot\ChatQuestion;
use App\Models\Chatbot\ChatQuestionAnswer;
use App\Jobs\GenerateAiAnswerJob;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class ChatService
{
    function __construct() {}

    public function all()
    {
        return Auth::user()->chats;
    }

    public function get($id)
    {
        $chat = Chat::with(['questions.latestAnswer', 'user'])->findOrFail($id);

        if ($chat->user->id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        return $chat;
    }

    public function save($question)
    {
        $user = Auth::user();
        return DB::transaction(function () use($user, $question){

            $chat = new Chat();
            $chat->user_id = $user->id;
            $chat->status = 'processing';
            $chat->title = "New Chat";
            $chat->save();

            $chatQuestion = ChatQuestion::create([
                'chat_id'  => $chat->id,
                'question' => $question,
                'answer'   => '',
                'status'   => 'processing'
            ]);
            Log::info('New chat question created: ' . $chatQuestion->id);
            DB::afterCommit(function () use ($chatQuestion) {
                GenerateAiAnswerJob::dispatch($chatQuestion);
            });

            return $chat;
        });
    }

    public function update($id, $data)
    {
        return DB::transaction(function () use ($id, $data) {
            $chat = Chat::findOrFail($id);

            if ($chat->user_id !== Auth::id()) {
                abort(403, 'Unauthorized');
            }

            $chat->update($data);

            return $chat;
        });
    }

    public function delete($id)
    {
        return DB::transaction(function () use ($id) {
            $chat = Chat::findOrFail($id);

            if ($chat->user_id !== Auth::id()) {
                abort(403, 'Unauthorized');
            }

            $chat->delete();
        });
    }

    public function findAnswer($questionId)
    {
        return DB::transaction(function () use ($questionId) {
            $chatQuestionAnswer = ChatQuestionAnswer::where('question_id', $questionId)->first();
            return $chatQuestionAnswer ? $chatQuestionAnswer->answer : null;
        });
    }

    public function storeQuestion($chatId, $question)
    {
        return DB::transaction(function () use ($chatId, $question) {
            $chat = Chat::findOrFail($chatId);

            $existingQuestion = ChatQuestion::whereRaw('LOWER(question) = ?', [strtolower($question['question'])])->first();

            if ($existingQuestion) {
                $answer = $existingQuestion->latestAnswer->answer;
                AnswerGeneratedEvent::dispatchWithRetry($answer, 3, $chat->user_id);
                return $existingQuestion;
            }

            $chatQuestion = ChatQuestion::create([
                'chat_id'  => $chat->id,
                'question' => $question['question'],
                'answer'   => '',
                'status'   => 'processing'
            ]);
            Log::info('New chat question created: ' . $chatQuestion->id);
            DB::afterCommit(function () use ($chatQuestion) {
                GenerateAiAnswerJob::dispatch($chatQuestion);
            });

            return $chatQuestion;
        });
    }
}