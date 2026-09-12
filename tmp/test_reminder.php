<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';

use App\Http\Repositories\AiModels\GoogleAIStudioRepository;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = User::first(); // Just get the first user for testing
Auth::login($user);

$repo = new GoogleAIStudioRepository();
$functionCall = [
    'name' => 'create_reminder',
    'args' => [
        'title' => 'Test Reminder from Antigravity',
        'time' => '2026-04-05T15:00:00Z'
    ]
];

try {
    $result = (new ReflectionMethod($repo, 'executeFunctionCall'))->invokeArgs($repo, [$functionCall, $user]);
    echo "Result: " . json_encode($result) . "\n";
    
    $task = \App\Models\Task::where('title', 'Test Reminder from Antigravity')->first();
    if ($task) {
        echo "Success: Task created with ID {$task->id}\n";
        $task->delete(); // Clean up
    } else {
        echo "Failure: Task not found in DB\n";
    }
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
