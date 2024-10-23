<?php

namespace App\Models\Main;

use App\Models\MainModel;
use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterModule extends MainModel
{
    use HasFactory;

    public function scopeActive($query) {
        return $query->where('status_id',Status::active()->id)->first();
    }
    public function modules()
    {
        return $this->hasMany(Module::class, 'master_module_id');
    }

}
