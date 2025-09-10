<?php

namespace App\Http\Controllers\Chatbot;

use App\Http\Controllers\Controller;
use App\Http\Repositories\RepositoryBuilder;
use App\Http\Services\ChatService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ChatController extends Controller
{

    private $chatService;
    function __construct(ChatService $chatService)
    {
        $this->chatService = $chatService;
    }

    public function index()
    {
        return response()->json($this->chatService->all());
    }

    public function show(Request $request, $id)
    {
        $chat = $this->chatService->get($id);

        return Inertia::render('UserChatPage', [
            'chat' => [
                'id' => $chat->id,
                'title' => $chat->title,
            ],
            'questions' => $chat->questions->map(function ($q) {
                return [
                    'id' => $q->id,
                    'question' => $q->question,
                    'answer' => $q->latestAnswer ? $q->latestAnswer->answer : null,
                ];
            }),
        ]);
    }

    public function store(Request $request)
    {
        $chat = $this->chatService->save();
        return Inertia::render('UserChatPage', [
            'chat' => [
                'id' => $chat->id,
                'title' => $chat->title,
            ]
        ]);
    }

    public function update(Request $request, $id)
    {
        Log::info("Update called");
        $data = $request->all();
        return $this->chatService->update($id, $data);
    }

    public function delete($id)
    {
        Log::info("Delete called");
        return $this->chatService->delete($id);
    }

    public function storeQuestion($chatId, Request $request) {
        $request->validate([
            'question' => 'string'
        ]);
        return $this->chatService->storeQuestion($chatId, $request->all());
    }
}
