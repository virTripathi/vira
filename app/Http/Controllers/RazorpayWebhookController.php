<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\RazorpayWebhookService;

class RazorpayWebhookController extends Controller
{
    protected $service;

    public function __construct(RazorpayWebhookService $service)
    {
        $this->service = $service;
    }

    public function handle(Request $request)
    {
        $event = $request->input('event');
        $payload = $request->input('payload');

        $this->service->handleEvent($event, $payload);

        return response()->json(['status' => 'success']);
    }
}