<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index() {
        return Inertia::render('Dashboard');
    }

    public function readAll()
    {
        Auth::user()->unreadNotifications->markAsRead();
        return back();
    }
}
