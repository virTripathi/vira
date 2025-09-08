<?php

namespace App\Http\Services;

use App\Models\Chatbot\Chat;
use App\Models\Chatbot\ChatQuestion;
use App\Models\Chatbot\ChatQuestionAnswer;
use App\Jobs\GenerateAiAnswerJob;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ChatService
{

    function __construct() {}
    
    public function all()
    {
        return Auth::user()->chats;
    }

    public function get($id)
    {
        $chat = Chat::with(['questions.answer', 'user'])->findOrFail($id);

        if ($chat->user->id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        return $chat;
    }

    public function save($data)
    {
        $user = Auth::user();
        $chat = Chat::where('user_id', $user->id)->where('status', 'processing')->first();
        if (!$chat) {
            $chat = new Chat();
            $chat->user_id = $user->id;
            $chat->status = 'processing';
            $chat->title = "New Chat - " . date('M Y');
            $chat->save();
        }
        $chatQuestion = ChatQuestion::create([
            'chat_id' => $chat->id,
            'question' => $data['data'],
            'answer' => '',
            'status' => 'processing'
        ]);
        Log::info('New chat question created: ' . $chatQuestion->id);
        GenerateAiAnswerJob::dispatch($chatQuestion);
        return $chatQuestion;
    }

    public function update($id, $data) {}

    public function delete($id) {}

    public function findAnswer($questionId)
    {
        $chatQuestionAnswer = ChatQuestionAnswer::where('question_id', $questionId)->first();
        return $chatQuestionAnswer ? $chatQuestionAnswer->answer : null;
    }
}
