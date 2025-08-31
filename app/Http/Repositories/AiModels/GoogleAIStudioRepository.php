<?php

namespace App\Http\Repositories\AiModels;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\XyzController;

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
    public function ask(string $question): ?array
    {
        try {
            $payload = [
                'contents' => [[
                    'role' => 'user',
                    'parts' => [
                        ['text' => config('ai-studio.core_prompt')],
                        ['text' => $question]
                    ],
                ]],
                'tools' => $this->buildTools(),
            ];

            Log::info("Asking GoogleAIStudio: " . json_encode($payload));

            $response = $this->client->post($this->baseUrl, [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'x-goog-api-key' => $this->apiKey,
                ],
                'json' => $payload,
            ]);

            $responseData = json_decode($response->getBody()->getContents(), true);

            Log::info("GoogleAIStudio raw response: " . json_encode($responseData));

            // Try functionCall first
            $functionCall = $this->handleFunctionCall($responseData);

            if ($functionCall) {
                return [
                    'type' => 'function',
                    'data' => $this->executeFunctionCall($functionCall),
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
            Log::error("GoogleAIStudio RequestException: " . $e->getMessage(), [$e]);
            return null;
        } catch (\Exception $e) {
            Log::error("GoogleAIStudio error: " . $e->getMessage(), [$e]);
            return null;
        }
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
        foreach ($parts as $part) {
            if (isset($part['text'])) {
                return $part['text'];
            }
        }
        return null;
    }

    private function executeFunctionCall(array $functionCall)
    {
        $name = $functionCall['name'] ?? '';
        $args = $functionCall['args'] ?? [];

        switch ($name) {
            case 'schedule_meeting':
                $controller = app(XyzController::class);
                return $controller->scheduleMeeting(new Request($args));
            default:
                throw new \Exception("Unknown function: {$name}");
        }
    }
}
