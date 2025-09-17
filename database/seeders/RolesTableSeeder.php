<?php
 
namespace Database\Seeders;

use App\Models\Main\Role;
use App\Models\Status;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
 
class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(!Role::where('title','Super Admin')->first()) {
            $role = new Role();
            $role->title = 'Super Admin';
            $role->status_id = Status::active()->id;
            $role->created_by = User::superAdmin()->id;
            $role->created_at = Carbon::now();
            $role->save();
        }
        if(!Role::where('title','Admin')->first()) {
            $role = new Role();
            $role->title = 'Admin';
            $role->status_id = Status::active()->id;
            $role->created_by = User::superAdmin()->id;
            $role->created_at = Carbon::now();
            $role->save();
        }
        if(!Role::where('title','Module Manager')->first()) {
            $role = new Role();
            $role->title = 'Module Manager';
            $role->status_id = Status::active()->id;
            $role->created_by = User::superAdmin()->id;
            $role->created_at = Carbon::now();
            $role->save();
        }
        if(!Role::where('title','General User')->first()) {
            $role = new Role();
            $role->title = 'General User';
            $role->status_id = Status::active()->id;
            $role->created_by = User::superAdmin()->id;
            $role->created_at = Carbon::now();
            $role->save();
        }
    }
}
