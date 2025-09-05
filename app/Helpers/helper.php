<?php

use Illuminate\Support\Facades\Route;

if(!function_exists('redirectToUserDashboard')) {
    function redirectToUserDashboard($role) {

         if (!Route::has($role . '.dashboard')) {
            return redirect()->route('dashboard');
        }

        return redirect()->route($role.'.dashboard');
    }
}