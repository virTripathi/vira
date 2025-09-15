<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\TaskPriority;
use App\Models\Status;
use App\Models\User;

class TaskPrioritiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(!TaskPriority::where('code','low')->first()) {
            $taskPriority = new TaskPriority();
            $taskPriority->code = 'low';
            $taskPriority->title = 'Low';
            $taskPriority->status_id = Status::active()->id;
            $taskPriority->created_by = User::superAdmin()->id;
            $taskPriority->created_at = Carbon::now();
            $taskPriority->save();
         }
         if(!TaskPriority::where('code','medium')->first()) {
             $taskPriority = new TaskPriority();
             $taskPriority->code = 'medium';
             $taskPriority->title = 'Medium';
             $taskPriority->status_id = Status::active()->id;
             $taskPriority->created_by = User::superAdmin()->id;
             $taskPriority->created_at = Carbon::now();
             $taskPriority->save();
          }
          if(!TaskPriority::where('code','high')->first()) {
              $taskPriority = new TaskPriority();
              $taskPriority->code = 'high';
              $taskPriority->title = 'High';
              $taskPriority->status_id = Status::active()->id;
              $taskPriority->created_by = User::superAdmin()->id;
              $taskPriority->created_at = Carbon::now();
              $taskPriority->save();
           }
    }
}
