<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'idempotency_key',
        'invitation_id',
        'provider',
        'external_id',
        'amount',
        'status',
        'payload',
    ];

    protected $casts = [
        'payload' => 'array'
    ];
}