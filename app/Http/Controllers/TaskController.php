<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Models\Status;
use App\Models\TaskPriority;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller {
    
    public function index()
    {
        $userId = Auth::id();
        $tasks = Task::where('created_by', $userId)->get();
        return Inertia::render('TaskManager/Index', [
            'tasks' => $tasks,
        ]);
    }

    public function create()
    {
        $statuses = Status::all();
        $taskPriorities = TaskPriority::all();
        return Inertia::render('TaskManager/TaskForm',[
            'statuses' => $statuses,
            'taskPriorities' => $taskPriorities
        ]);
    }

    public function store(TaskRequest $request)
    {
        try {
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
            return redirect()->route('tasks.index')->with('success', 'Task created successfully');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->withErrors(['error' => 'OOPS! Some error occurred']);
        }
    }


    public function show($task_id) 
    {
        $task = Task::with('status','priority')->where('id', $task_id)->where('created_by', Auth::id())->firstOrFail();
        return Inertia::render('TaskManager/Task', [
            'task' => $task
        ]);
    }

    public function edit($task_id)
    {
        $task = Task::where('id', $task_id)->where('created_by', Auth::id())->firstOrFail();
        $statuses = Status::all();
        $taskPriorities = TaskPriority::all();
        return Inertia::render('TaskManager/TaskForm', [
            'task' => $task,
            'statuses' => $statuses,
            'taskPriorities' => $taskPriorities
        ]);
    }

    public function update($task_id, TaskRequest $request)
    {
        try {
            $task = Task::where('id', $task_id)->where('created_by', Auth::id())->firstOrFail();
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
            return redirect()->route('tasks.index');
        } catch(\Exception $e) {
            return redirect()->back()->withInput()->withErrors(['error' => 'OOPS! Some error occurred']);
        }
    }

    public function destroy(Task $task)
    {
        if ($task->created_by !== Auth::id()) {
            return redirect()->route('tasks.index')->with('error', 'You are not authorized to delete this task');
        }

        $task->delete();
        return redirect()->route('tasks.index');
    }
}