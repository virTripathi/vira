<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AiModel;

class AiModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $models = [
            [
                'name' => 'Gemini 1.5 Flash',
                'provider' => 'Google',
                'model_code' => 'gemini-1.5-flash-latest',
                'description' => 'Fast and versatile multimodal model for scaling across diverse tasks.',
                'is_available' => true,
            ],
            [
                'name' => 'Gemini Flash',
                'provider' => 'Google',
                'model_code' => 'gemini-flash-latest',
                'description' => 'Standard flash model used previously across the workspace.',
                'is_available' => true,
            ],
            [
                'name' => 'Gemini 1.5 Pro',
                'provider' => 'Google',
                'model_code' => 'gemini-1.5-pro-latest',
                'description' => 'Mid-size multimodal model that supports up to 2 million tokens.',
                'is_available' => true,
            ],

            [
                'name' => 'Gemma 4 31B',
                'provider' => 'Google',
                'model_code' => 'gemma-4-31b-it',
                'description' => 'High parameter advanced open source model.',
                'is_available' => true,
            ],
            [
                'name' => 'GPT-4o',
                'provider' => 'OpenAI',
                'model_code' => 'gpt-4o',
                'description' => 'Most capable GPT-4 model from OpenAI.',
                'is_available' => false,
                'disabled_reason' => 'Integration coming soon'
            ],
            [
                'name' => 'Claude 3.5 Sonnet',
                'provider' => 'Anthropic',
                'model_code' => 'claude-3-5-sonnet',
                'description' => 'Fast, high capability model from Anthropic.',
                'is_available' => false,
                'disabled_reason' => 'Requires Enterprise Plan'
            ],
        ];

        foreach ($models as $model) {
            AiModel::updateOrCreate(
                ['model_code' => $model['model_code']],
                $model
            );
        }
    }
}
