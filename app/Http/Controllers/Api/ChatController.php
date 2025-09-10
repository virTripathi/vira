<?php

namespace App\Http\Controllers\Api;

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

        return $chat;
    }

    public function store(Request $request)
    {
        $question = $request->get('question');
        return $this->chatService->save($question);
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