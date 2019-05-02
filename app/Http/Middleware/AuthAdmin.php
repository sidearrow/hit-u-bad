<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AuthAdmin
{
    public function handle($request, Closure $next)
    {
        if (
            !Auth::check() ||
            Auth::user()->login_id !== 'admin'
        ) {
            return redirect('admin/login');
        }

        return $next($request);
    }
}
