<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\InvitationEditorData;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EditorController extends Controller
{
    public function index(Invitation $invitation)
    {
        return Inertia::render('builder/index', [
            'invitationId' => $invitation->id,
        ]);
    }

    public function data(Invitation $invitation, Request $request)
    {
        $this->authorizeEditor($invitation, $request);

        $data = $invitation->editorData;

        return response()->json([
            'data'   => $invitation,
            'schema' => $data?->schema ?? $this->defaultSchema(),
            'status' => $invitation->status,
        ]);
    }

    public function save(Invitation $invitation, Request $request)
    {
        $this->authorizeEditor($invitation, $request);

        $request->validate([
            'schema' => 'required|array',
        ]);

        InvitationEditorData::updateOrCreate(
            ['invitation_id' => $invitation->id],
            ['schema' => $request->schema]
        );

        return response()->json(['ok' => true]);
    }

    protected function authorizeEditor(Invitation $invitation, Request $request)
    {
        $token = $request->header('X-Editor-Token');

        if (
            !$token ||
            $invitation->editor_token !== $token ||
            now()->gt($invitation->editor_expires_at)
        ) {
            abort(403);
        }
    }

    protected function defaultSchema(): array
    {
        return [
            'sections' => [],
        ];
    }
}
