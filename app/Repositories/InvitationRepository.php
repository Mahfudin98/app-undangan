<?php

namespace App\Repositories;

use App\Models\Invitation;

class InvitationRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function create(array $data)
    {
        return Invitation::create($data);
    }
}