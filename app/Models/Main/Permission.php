<?php

namespace App\Models\Main;

use App\Models\MainModel;
use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends MainModel
{
    use HasFactory;

    public function scopeActive($query) {
        return $query->where('status_id',Status::active()->id)->first();
    }
    public function module()
    {
        return $this->belongsTo(Module::class, 'module_id');
    }
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_permission', 'permission_id', 'role_id');
    }

}
