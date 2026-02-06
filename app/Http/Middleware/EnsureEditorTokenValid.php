<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureEditorTokenValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $invitation = $request->route('invitation');
        $token = $request->header('X-Editor-Token');

        if (
            !$invitation ||
            !$token ||
            $invitation->editor_token !== $token ||
            now()->gt($invitation->editor_expires_at)
        ) {
            abort(403);
        }

        return $next($request);
    }
}
