<?php

namespace App\Models\Main;

use App\Models\MainModel;
use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends MainModel
{
    use HasFactory;

    public function scopeActive($query) {
        return $query->where('status_id',Status::active()->id)->first();
    }
    public function masterModule()
    {
        return $this->belongsTo(MasterModule::class, 'master_module_id');
    }
    public function permissions()
    {
        return $this->hasMany(Permission::class, 'module_id');
    }

}
