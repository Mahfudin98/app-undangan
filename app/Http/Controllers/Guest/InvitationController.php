<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Services\InvitationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvitationController extends Controller
{
    public function __construct(protected InvitationService $invitation)
    {
        //
    }

    public function invitation(string $slug)
    {
        $invitation = Invitation::where('slug', $slug)->whereNotNull('published_at')->firstOrFail();
        if ($invitation->isExpired()) {
            return Inertia::render('builder/expired', [
                'expired_at' => $invitation->expired_at,
            ]);
        }

        return Inertia::render('builder/publish', [
            'schema' => $invitation->published_schema,
        ]);
    }

    public function store()
    {
        $invitation = $this->invitation->create();

        return response()->json([
            'id' => $invitation->id,
            'editor_token' => $invitation->editor_token,
            'redirect' => route('builder', $invitation),
        ]);
    }

    public function publish(Request $request, Invitation $invitation)
    {
        if (!$invitation->editorData['schema']) {
            abort(422, 'Draft schema empty');
        }

        $invitation->update([
            'published_schema' => $invitation->editorData['schema'],
            'published_at' => now(),
            'active_until' => now()->addDays(30),
            'status' => 'active'
        ]);

        return response()->json([
            'url' => url("/i/{$invitation->slug}"),
            'expired_at' => $invitation->active_until,
        ]);
    }
}