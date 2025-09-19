<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'due_date' => 'required|date',
            'status_id' => 'required|exists:statuses,id',
            'task_priority_id' => 'nullable|exists:task_priorities,id',
            'task_frequency_unit_id' => 'nullable|exists:task_frequency_units,id',
            'task_frequency_unit_value' => 'nullable|integer|min:1',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date|after_or_equal:start_time',
            'times' => 'nullable|date',
            'user_id' => 'nullable|exists:users,id',
        ];
    }
}