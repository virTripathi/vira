<?php

namespace App\Models\Chatbot;

use App\Models\MainModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatQuestion extends MainModel
{
    use HasFactory;

    protected $fillable = [
        'chat_id',
        'question',
        'is_default_question',
        'created_by',
        'updated_by',
    ];

    public function chat()
    {
        return $this->belongsTo(Chat::class);
    }

    public function answers()
    {
        return $this->hasMany(ChatQuestionAnswer::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
