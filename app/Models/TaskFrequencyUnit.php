<?php

namespace App\Models;

class TaskFrequencyUnit extends MainModel
{
    protected $table = 'task_frequency_units';

    protected $fillable = [
        'name',
        'description',
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class, 'task_frequency_unit_id');
    }
}