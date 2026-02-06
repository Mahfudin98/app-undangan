<?php

namespace App\Services;

use App\Models\Invitation;
use App\Repositories\InvitationRepository;
use Illuminate\Support\Str;

class InvitationService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected InvitationRepository $invitation)
    {
        //
    }

    public function create()
    {
        return $this->invitation->create([
            'slug' => Invitation::generateSlug('undangan'),
            'editor_token' => Str::random(64),
            'editor_expires_at' => now()->addHours(24)
        ]);
    }
}