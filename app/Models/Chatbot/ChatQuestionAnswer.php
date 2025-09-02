<?php

namespace App\Models\Chatbot;

use App\Models\MainModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatQuestionAnswer extends MainModel
{
    use HasFactory;

    protected $fillable = [
        'question_id',
        'answer',
        'version',
        'created_by',
        'updated_by',
    ];

    public function question()
    {
        return $this->belongsTo(ChatQuestion::class, 'question_id');
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
