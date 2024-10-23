<?php

namespace App\Models\Chatbot;

use App\Models\MainModel;
use App\Models\Status;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatActivity extends MainModel
{
    use HasFactory;

    protected $fillable = [
        'label',
        'title',
        'description',
        'status_id',
        'created_by',
        'updated_by',
    ];

    public function chats()
    {
        return $this->hasMany(Chat::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
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
