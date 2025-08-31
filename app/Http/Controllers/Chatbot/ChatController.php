<?php

namespace App\Http\Controllers\Chatbot;

use App\Http\Controllers\Controller;
use App\Http\Repositories\RepositoryBuilder;
use App\Http\Services\ChatService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{

    private $chatService;
    function __construct(ChatService $chatService) {
        $this->chatService = $chatService;
    }
    
    public function index() {
        return $this->chatService->all();
    }

    public function store(Request $request) {
        Log::info("Store called", $request->all());
        $data = $request->all();
        return $this->chatService->save($data);
    }

    public function update(Request $request, $id) {
        Log::info("Update called");
        $data = $request->all();
        return $this->chatService->update($id, $data);
    }

    public function delete($id) {
        Log::info("Delete called");
        return $this->chatService->delete($id);
    }
}
