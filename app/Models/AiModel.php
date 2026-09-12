<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AiModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'provider',
        'model_code',
        'is_available',
        'disabled_reason',
        'description',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
