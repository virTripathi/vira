<?php

namespace App\Http\Controllers\Chatbot;

use App\Http\Controllers\Controller;
use App\Http\Repositories\RepositoryBuilder;
use Illuminate\Http\Request;

class ChatController extends Controller
{

    private $repository;
    function __construct() {
        $repository = new RepositoryBuilder();
        $repository->build("Chatbot/Chat");
    }
    
    public function index() {
        return $this->repository->all();
    }

    public function store() {

    }

    public function update() {

    }

    public function delete() {
        
    }
}
