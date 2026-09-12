<?php

namespace App\Http\Controllers;

use App\Models\AiModel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AiModelController extends Controller
{
    public function index()
    {
        $models = AiModel::all();
        return Inertia::render('AiModels/Index', [
            'models' => $models,
            'currentModelId' => Auth::user()->ai_model_id,
        ]);
    }

    public function select(Request $request)
    {
        $request->validate([
            'ai_model_id' => 'required|exists:ai_models,id',
        ]);

        $user = Auth::user();
        $user->ai_model_id = $request->ai_model_id;
        $user->save();

        return redirect()->back()->with('success', 'AI Model updated successfully.');
    }
}
