<?php

namespace Database\Seeders;

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
        if(!Status::where('code','active')->first()) {
           $status = new Status();
           $status->code = 'active';
           $status->title = 'Active';
           $status->is_active = 1;
           $status->created_by = User::superAdmin()->id;
           $status->created_at = Carbon::now();
           $status->save();
        }
        if(!Status::where('code','in-active')->first()) {
            $status = new Status();
            $status->code = 'in-active';
            $status->title = 'Inactive';
            $status->is_active = 0;
            $status->created_by = User::superAdmin()->id;
            $status->created_at = Carbon::now();
            $status->save();
         }
    }
}
