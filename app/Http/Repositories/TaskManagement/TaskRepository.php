<?php

namespace App\Http\Repositories\TaskManagement;

use App\Models\Task;
use App\Models\Status;
use App\Models\TaskPriority;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Repositories\Repository;

class TaskRepository extends Repository {

    public function all(...$params) {
        $userId = Auth::id();
        return Task::where('created_by',$userId)->orWhere('user_id',$userId)->get();
    }

    public function get($id) {
        return Task::with(['status', 'priority'])
            ->where('id', $id)
            ->where(function ($query) {
                $query->where('created_by', Auth::id())
                      ->orWhere('user_id', Auth::id());
            })
            ->firstOrFail();
    }

    public function save($request) {
        $task = new Task();
        $task->title = $request->title;
        $task->description = $request->description;
        $task->due_date = $request->due_date;
        $task->status_id = $request->status_id;
        $task->task_priority_id = $request->task_priority_id;
        $task->created_by = Auth::id();
        $task->created_at = Carbon::now();
        DB::transaction(function () use ($task) {
            $task->save();
        });
        return $task->id;
    }

    public function update($id, $request) {
        $task = Task::where('id', $id)->where('created_by', Auth::id())->firstOrFail();
        $task->title = $request->title;
        $task->description = $request->description;
        $task->due_date = $request->due_date;
        $task->status_id = $request->status_id;
        $task->task_priority_id = $request->task_priority_id;
        $task->updated_by = Auth::id();
        $task->updated_at = Carbon::now();
        DB::transaction(function () use ($task) {
            $task->save();
        });
        return $task;
    }

    public function delete($id) {
        $task = Task::findOrFail($id);
        if ($task->created_by !== Auth::id()) {
            return redirect()->route('tasks.index')->with('error', 'You are not authorized to delete this task');
        }
        return $task->delete();
    }
}
