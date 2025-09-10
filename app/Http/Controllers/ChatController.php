<?php

namespace App\Http\Controllers;

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
        return Inertia::render('UserChatPage', []);
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
        $question = $request->get('question');
        $chat = $this->chatService->save($question);
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

    public function update(Request $request, $id)
    {
        $data = $request->all();
        return $this->chatService->update($id, $data);
    }

    public function delete($id)
    {
        return $this->chatService->delete($id);
    }

    public function storeQuestion($chatId, Request $request) {
        $request->validate([
            'question' => 'string'
        ]);
        return $this->chatService->storeQuestion($chatId, $request->all());
    }
}
