<?php

namespace App\Http\Repositories\AiModels;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;
use App\Http\Repositories\Calendars\GoogleCalendarRepository;
use App\Http\Repositories\WeatherRepository;
use App\Http\Repositories\TaskManagement\TaskRepository;
use App\Models\Status;
use App\Models\TaskPriority;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class GoogleAIStudioRepository
{
    private string $baseUrl;
    private string $apiKey;
    private Client $client;
    private array $actions;

    public function __construct()
    {
        $this->baseUrl = config('ai-studio.base_url');
        $this->apiKey  = config('ai-studio.api_key');
        $this->actions = config('ai-studio.actions');
        $this->client  = new Client();
    }

    /**
     * Ask Gemini model a question
     *
     * @param string $question
     * @return array|null
     */
    public function ask(string $question, $user): ?array
    {
        $maxRetries = (int) config('ai-studio.max_retries', env('AGENT_MAX_RETRIES', 3));
        $retryDelay = 1000; // milliseconds
        $attempt = 0;

        $payload = [
            'systemInstruction' => [
                'parts' => [
                    ['text' => config('ai-studio.core_prompt') . "\nParse relative dates and times." . "\nCurrentDateAndTime: " . Carbon::now()->toISOString() . "\nCurrent week day: " . Carbon::now()->format('l')]
                ]
            ],
            'contents' => [[
                'role' => 'user',
                'parts' => [
                    ['text' => $question]
                ],
            ]],
            'tools' => $this->buildTools(),
        ];

        $modelCode = $user && $user->aiModel ? $user->aiModel->model_code : 'gemini-1.5-flash-latest';
        $dynamicUrl = "https://generativelanguage.googleapis.com/v1beta/models/{$modelCode}:generateContent";

        while ($attempt < $maxRetries) {
            try {
                Log::info("Asking GoogleAIStudio (Attempt " . ($attempt + 1) . "): " . json_encode($payload));

                $response = $this->client->post($dynamicUrl, [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'x-goog-api-key' => $this->apiKey,
                    ],
                    'json' => $payload,
                ]);

                $responseData = json_decode($response->getBody()->getContents(), true);

                if (isset($responseData['error']) && isset($responseData['error']['code'])) {
                    if ($responseData['error']['code'] == 503) {
                        throw new \Exception("GoogleAIStudio overloaded: 503");
                    }
                    if ($responseData['error']['code'] == 429) {
                        Log::warning("GoogleAIStudio 429 error, quota exceeded.");
                        return [
                            'type' => 'text',
                            'data' => 'The AI quota for today has been expired.'
                        ];
                    }
                }

                Log::info("GoogleAIStudio raw response: " . json_encode($responseData));

                // Try functionCall first
                $functionCall = $this->handleFunctionCall($responseData);
                if ($functionCall) {
                    $data = $this->executeFunctionCall($functionCall, $user);
                    Log::info('data', $data);
                    $responseText = $this->buildTextResponse($functionCall['name'], $data);
                    return [
                        'type' => 'function',
                        'data' => $responseText,
                    ];
                }

                // Else return plain text
                $text = $this->handleTextResponse($responseData);

                if ($text) {
                    return [
                        'type' => 'text',
                        'data' => $text,
                    ];
                }

                return [
                    'type' => 'error',
                    'data' => 'Unexpected Gemini response format',
                ];
            } catch (RequestException $e) {
                $statusCode = $e->hasResponse() ? $e->getResponse()->getStatusCode() : 0;

                if ($statusCode === 429 || str_contains($e->getMessage(), '"code": 429') || str_contains($e->getMessage(), '"code":429')) {
                    Log::warning("GoogleAIStudio 429 error, quota exceeded.");
                    return [
                        'type' => 'text',
                        'data' => 'The AI quota for today has been expired.'
                    ];
                }

                if ($statusCode === 503 || str_contains($e->getMessage(), '"code": 503') || str_contains($e->getMessage(), '"code":503')) {
                    $attempt++;
                    if ($attempt >= $maxRetries) {
                        Log::error("GoogleAIStudio RequestException after {$maxRetries} attempts: " . $e->getMessage(), [$e]);
                        break;
                    }
                    Log::warning("GoogleAIStudio 503 error, retrying ($attempt/$maxRetries)...");
                    usleep($retryDelay * 1000);
                    $retryDelay *= 2; // exponential backoff
                    continue;
                }

                if ($statusCode === 0 || str_contains(strtolower($e->getMessage()), 'timeout')) {
                    Log::error("GoogleAIStudio Request Timeout: " . $e->getMessage(), [$e]);
                    return [
                        'type' => 'error',
                        'data' => "The AI model request timed out after 45 seconds. Please try again."
                    ];
                }

                Log::error("GoogleAIStudio RequestException: " . $e->getMessage(), [$e]);
                return [
                    'type' => 'error',
                    'data' => "Error connecting to the AI model (" . $statusCode . "). Please check if the model is available or switch to a different one."
                ];
            } catch (\Exception $e) {
                if ($e->getMessage() === "GoogleAIStudio overloaded: 503") {
                    $attempt++;
                    if ($attempt >= $maxRetries) {
                        Log::error("GoogleAIStudio error after {$maxRetries} attempts: " . $e->getMessage(), [$e]);
                        break;
                    }
                    Log::warning("GoogleAIStudio 503 error, retrying ($attempt/$maxRetries)...");
                    usleep($retryDelay * 1000);
                    $retryDelay *= 2; // exponential backoff
                    continue;
                }

                Log::error("GoogleAIStudio error: " . $e->getMessage(), [$e]);
                return [
                    'type' => 'error',
                    'data' => "An unexpected error occurred while communicating with the AI model."
                ];
            }
        }

        return [
            'type' => 'error',
            'data' => "Failed to reach the AI model after {$maxRetries} attempts."
        ];
    }

    private function buildTools(): array
    {
        $functionDeclarations = [];

        foreach ($this->actions as $name => $action) {
            $parameters = [
                'type'       => 'OBJECT',
                'properties' => [],
                'required'   => [],
            ];

            foreach ($action['arguments'] as $arg) {
                $schema = [];

                switch ($arg['type']) {
                    case 'string':
                        $schema['type'] = 'STRING';
                        break;
                    case 'datetime':
                        $schema['type']   = 'STRING';
                        $schema['format'] = 'date-time';
                        break;
                    case 'enum':
                        $schema['type']   = 'STRING';
                        $schema['format'] = 'enum';
                        $schema['enum']   = $arg['values'] ?? [];
                        break;
                    case 'array<string>':
                        $schema['type']  = 'ARRAY';
                        $schema['items'] = ['type' => 'STRING'];
                        break;
                    case 'boolean':
                        $schema['type'] = 'BOOLEAN';
                        break;
                    case 'number':
                        $schema['type'] = 'NUMBER';
                        break;
                    case 'integer':
                        $schema['type'] = 'INTEGER';
                        break;
                    default:
                        $schema['type'] = 'STRING';
                }

                $parameters['properties'][$arg['name']] = $schema;

                if (!empty($arg['required']) && $arg['required'] === true) {
                    $parameters['required'][] = $arg['name'];
                }
            }

            $functionDeclarations[] = [
                'name'        => $name,
                'description' => $action['description'],
                'parameters'  => $parameters,
            ];
        }

        return [['functionDeclarations' => $functionDeclarations]];
    }

    private function handleFunctionCall(array $geminiResponse): ?array
    {
        $parts = $geminiResponse['candidates'][0]['content']['parts'] ?? [];
        foreach ($parts as $part) {
            if (isset($part['functionCall'])) {
                return $part['functionCall'];
            }
        }
        return null;
    }

    private function handleTextResponse(array $geminiResponse): ?string
    {
        $parts = $geminiResponse['candidates'][0]['content']['parts'] ?? [];
        $partText = null;
        foreach ($parts as $part) {
            if (isset($part['text'])) {
                $partText =  $part['text']; // to ensure last text is returned since earlier are thinking ones.
            }
        }
        return $partText;
    }

    private function executeFunctionCall(array $functionCall, $user)
    {
        $name = $functionCall['name'] ?? '';
        $args = $functionCall['args'] ?? [];

        switch ($name) {
            case 'schedule_meeting':
                $startDateTime = Carbon::parse("{$args['date']} {$args['time']}");
                $endDateTime = $startDateTime->copy()->addMinutes($args['duration_minutes'] ?? 30);
                $repository = new GoogleCalendarRepository($user->google_access_token);
                return $repository->createEvent($args["topic"], $startDateTime, $endDateTime, $args["attendees"]);
            case 'weather_info':
                $repository = new WeatherRepository();
                return $repository->getCurrentWeather($args["location"]);
            case 'create_reminder':
                $taskRepo = new TaskRepository();
                $activeStatus = Status::where('code', 'active')->first();
                $mediumPriority = TaskPriority::where('code', 'medium')->first();
                
                $recurrence = $args['recurrence'] ?? 'none';
                $unitValue = 'day'; // Default
                if ($recurrence === 'weekly') {
                    $unitValue = 'day'; // Handle weekly as 7 days or similar if needed, for now just day
                }
                
                $frequencyUnit = \App\Models\TaskFrequencyUnit::where('value', $unitValue)->first();

                $taskData = (object)[
                    'title' => $args['title'],
                    'description' => 'Reminder created by VIRA.',
                    'due_date' => Carbon::parse($args['time'])->format('Y-m-d'),
                    'start_time' => Carbon::parse($args['time']),
                    'status_id' => $activeStatus ? $activeStatus->id : null,
                    'task_priority_id' => $mediumPriority ? $mediumPriority->id : null,
                    'user_id' => $user->id,
                    'task_frequency_unit_id' => $frequencyUnit ? $frequencyUnit->id : null,
                    'task_frequency_unit_value' => ($recurrence === 'none') ? 1 : 1, // Must be non-null. 1 means "every 1 [unit]".
                    'end_time' => null,
                    'times' => null,
                ];
                
                $taskId = $taskRepo->save($taskData);
                return [
                    'id' => $taskId,
                    'title' => $args['title'],
                    'time' => $args['time']
                ];
            default:
                throw new \Exception("Unknown function: {$name}");
        }
    }

    protected function buildTextResponse(string $functionName, array $responseData)
    {
        $configs = [];

        foreach ($this->actions as $actionName => $action) {
            $configs[$actionName] = [
                'response_text' => $action['response_text'],
            ];
        }
        Log::info('configs', ['configs' => $configs]);

        if (!isset($configs[$functionName])) {
            return json_encode($responseData);
        }

        $template = $configs[$functionName]['response_text'];

        $flattened = $this->flattenArray($responseData);

        $responseText = preg_replace_callback('/\{(\w+)\}/', function ($matches) use ($flattened) {
            $key = $matches[1];
            $value = $flattened[$key] ?? $matches[0];
            
            // If it looks like an ISO date/time, format it nicely
            if (is_string($value) && preg_match('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/', $value)) {
                try {
                    return Carbon::parse($value)->format('jS M, Y \a\t g:i A');
                } catch (\Exception $e) {}
            }
            
            return $value;
        }, $template);
        Log::info('response_text', ['response_text' => $responseText]);
        return $responseText;
    }

    protected function flattenArray(array $data, string $prefix = ''): array
    {
        $result = [];
        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $result += $this->flattenArray($value, $prefix);
            } else {
                $result[$key] = $value;
            }
        }
        return $result;
    }
}
