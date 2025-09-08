<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class AuthorizeRequests
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {

        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        if ($user && $user->roles && $user->roles->isNotEmpty()) {
            $userRole = strtolower(str_replace(' ', '-', $user->roles->first()->title));

            if ($request->routeIs($userRole . '.dashboard') || $request->routeIs('dashboard')) {
                return $next($request);
            }
        }

        return $next($request);
    }
}
