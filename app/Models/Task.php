<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends MainModel
{
    use HasFactory;

    function status() {
        return $this->belongsTo(Status::class);
    }

    function priority() {
        return $this->belongsTo(TaskPriority::class,'task_priority_id');
    }
}
