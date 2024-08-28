<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\Status;
use App\Models\User;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(!Status::find(1)) {
           $status = new Status();
           $status->id = 1;
           $status->code = 'active';
           $status->title = 'Active';
           $status->is_active = 1;
           $status->created_by = User::superAdmin()->id;
           $status->created_at = Carbon::now();
           $status->save();
        }
        if(!Status::find(2)) {
            $status = new Status();
            $status->id = 2;
            $status->code = 'in-active';
            $status->title = 'Inactive';
            $status->is_active = 0;
            $status->created_by = User::superAdmin()->id;
            $status->created_at = Carbon::now();
            $status->save();
         }
    }
}
