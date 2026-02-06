<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Services\InvitationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvitationController extends Controller
{
    public function __construct(protected InvitationService $invitation)
    {
        //
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
}
