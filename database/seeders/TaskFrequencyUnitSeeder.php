<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Status;
use Illuminate\Support\Facades\DB;

class TaskFrequencyUnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdmin = User::superAdmin();
        $activeStatus = Status::where('code', 'active')->first();

        $units = [
            ['title' => 'Seconds', 'value' => 'second'],
            ['title' => 'Minutes', 'value' => 'minute'],
            ['title' => 'Hours',   'value' => 'hour'],
            ['title' => 'Days',    'value' => 'day'],
            ['title' => 'Months',  'value' => 'month'],
            ['title' => 'Years',   'value' => 'year'],
        ];

        foreach ($units as $unit) {
            DB::table('task_frequency_units')->updateOrInsert(
                ['value' => $unit['value']],
                [
                    'id'         => (string) Str::uuid(),
                    'title'      => $unit['title'],
                    'value'      => $unit['value'],
                    'status_id'  => $activeStatus->id ?? null,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                    'created_by' => $superAdmin?->id,
                    'updated_by' => $superAdmin?->id,
                ]
            );
        }
    }
}
