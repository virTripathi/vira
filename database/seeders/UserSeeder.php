<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(!User::find(1)) {
            $user = new User();
            $user->id = 1;
            $user->name = 'Super Admin';
            $user->email = 'superadmin@gmail.com';
            $user->password = Hash::make(env('SUPERADMINPASS'));
            $user->created_at = Carbon::now();
            $user->save();
         }
    }
}
