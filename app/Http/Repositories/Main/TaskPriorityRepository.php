<?php

namespace App\Http\Repositories\Main;

use App\Models\TaskPriority;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Repositories\Repository;

class TaskPriorityRepository extends Repository {

    public function all(...$params) {
        return TaskPriority::all();
    }

    public function get($id) {
        return TaskPriority::findOrFail($id);
    }

    public function save($data) {
        return TaskPriority::create($data);
    }

    public function update($id, $data) {
        $taskPriority = TaskPriority::findOrFail($id);
        $taskPriority->update($data);
        return $taskPriority;
    }

    public function delete($id) {
        $taskPriority = TaskPriority::findOrFail($id);
        return $taskPriority->delete();
    }
}