<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends MainModel
{
    use HasFactory;

    public function scopeActive($query) {
        return $query->where('is_active',1)->first();
    }

}
