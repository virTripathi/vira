<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
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
            'title' => 'required',
            'description' => 'nullable|string:500',
            'due_date' => 'required|date',
            'status_id' => 'required|exists:statuses,id',
            'task_priority_id' => 'required|exists:task_priorities,id'
        ];
    }
}
