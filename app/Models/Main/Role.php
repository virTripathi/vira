<?php

namespace App\Models\Main;

use App\Models\MainModel;
use App\Models\Status;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends MainModel
{
    use HasFactory;

    public function scopeActive($query)
    {
        return $query->where('status_id', Status::active()->id)->first();
    }
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_permission', 'role_id', 'permission_id');
    }
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_role', 'role_id', 'user_id');
    }
    public static function generalUser()
    {
        return static::where('title', 'General User')->first();
    }
}
