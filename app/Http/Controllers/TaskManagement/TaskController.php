<?php

namespace App\Http\Controllers\TaskManagement;

use App\Http\Controllers\Controller;
use App\Http\Repositories\RepositoryBuilder;
use App\Http\Requests\TaskRequest;
use App\Models\TaskFrequencyUnit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TaskController extends Controller
{
    private $task;
    private $status;
    private $taskPriority;

    public function __construct()
    {
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
        return Inertia::render('TaskManager/TaskForm', [
            'statuses' => $this->status->all(),
            'taskPriorities' => $this->taskPriority->all(),
            'frequencyUnits' => TaskFrequencyUnit::all(),
        ]);
    }

    public function store(TaskRequest $request)
    {
        Log::info('Creating task: ' . $request->get('title'));

        try {
            $taskId = $this->task->save($request->validated());
            return redirect()->route('tasks.index')->with('success', 'Task created successfully');
        } catch (\Exception $e) {
            Log::error('Error creating task: ' . $e->getMessage(), [
                'stack' => $e->getTraceAsString(),
            ]);
            return redirect()->back()->withInput()->withErrors([
                'error' => 'OOPS! Some error occurred',
            ]);
        }
    }

    public function show($taskId)
    {
        return Inertia::render('TaskManager/Task', [
            'task' => $this->task->get($taskId),
        ]);
    }

    public function edit($taskId)
    {
        return Inertia::render('TaskManager/TaskForm', [
            'task' => $this->task->get($taskId),
            'statuses' => $this->status->all(),
            'taskPriorities' => $this->taskPriority->all(),
        ]);
    }

    public function update($taskId, TaskRequest $request)
    {
        Log::info("Updating task ID: {$taskId}");

        try {
            $this->task->update($taskId, $request->validated());
            return redirect()->route('tasks.index')->with('success', 'Task updated successfully');
        } catch (\Exception $e) {
            Log::error("Error updating task ID {$taskId}: " . $e->getMessage());
            return redirect()->back()->withInput()->withErrors([
                'error' => 'OOPS! Some error occurred',
            ]);
        }
    }

    public function destroy($taskId)
    {
        Log::info("Deleting task ID: {$taskId}");

        try {
            $this->task->delete($taskId);
            return redirect()->route('tasks.index')->with('success', 'Task deleted successfully');
        } catch (\Exception $e) {
            Log::error("Error deleting task ID {$taskId}: " . $e->getMessage());
            return redirect()->back()->withInput()->withErrors([
                'error' => 'OOPS! Some error occurred',
            ]);
        }
    }
}