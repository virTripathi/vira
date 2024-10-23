<?php

namespace App\Models\Chatbot;

use App\Models\MainModel;
use App\Models\Status;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends MainModel
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'status_id',
        'chat_activity_id',
        'created_by',
        'updated_by',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function activity()
    {
        return $this->belongsTo(ChatActivity::class, 'chat_activity_id');
    }

    public function questions()
    {
        return $this->hasMany(ChatQuestion::class);
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
