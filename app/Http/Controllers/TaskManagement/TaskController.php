<?php

namespace App\Http\Controllers\TaskManagement;

use App\Http\Controllers\Controller;
use App\Http\Repositories\RepositoryBuilder;
use App\Http\Requests\TaskRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;


class TaskController extends Controller {
    
    private $task;
    private $status;
    private $taskPriority;
    function __construct() {
        $repository = new RepositoryBuilder();
        $this->task = $repository->build("TaskManagement\\Task");
        $this->status = $repository->build("Main\\Status");
        $this->taskPriority = $repository->build("Main\\TaskPriority");
    }

    public function index(Request $request)
    { 
        $tasks = $this->task->all($request->input());
        return Inertia::render('TaskManager/Index', [
            'tasks' => $tasks,
        ]);
    }

    public function create()
    {
        $statuses = $this->status->all();
        $taskPriorities = $this->taskPriority->all();
        return Inertia::render('TaskManager/TaskForm',[
            'statuses' => $statuses,
            'taskPriorities' => $taskPriorities
        ]);
    }

    public function store(TaskRequest $request)
    {
        try {
            $taskId = $this->task->save($request);
            return redirect()->route('tasks.index')->with('success', 'Task created successfully');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->withErrors(['error' => 'OOPS! Some error occurred']);
        }
    }


    public function show($task_id) 
    {
        $task = $this->task->get($task_id);
        return Inertia::render('TaskManager/Task', [
            'task' => $task
        ]);
    }

    public function edit($task_id)
    {
        $task = $this->task->get($task_id);
        $statuses = $this->status->all();
        $taskPriorities = $this->taskPriority->all();
        return Inertia::render('TaskManager/TaskForm', [
            'task' => $task,
            'statuses' => $statuses,
            'taskPriorities' => $taskPriorities
        ]);
    }

    public function update($task_id, TaskRequest $request)
    {
        try{
            $task = $this->task->update($task_id,$request);
            return redirect()->route('tasks.index')->with('success', 'Task updated successfully');
        } catch(\Exception $e) {
            return redirect()->back()->withInput()->withErrors(['error' => 'OOPS! Some error occurred']);
        }
    }

    public function destroy($taskId)
    {
        try{
            $this->task->delete();
            return redirect()->route('tasks.index')->with('success', 'Task deleted successfully');
        } catch(\Exception $e) {
            return redirect()->back()->withInput()->withErrors(['error' => 'OOPS! Some error occurred']);
        }
    }
}