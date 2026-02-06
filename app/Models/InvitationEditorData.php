<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvitationEditorData extends Model
{
    protected $table = 'invitation_editor_data';

    protected $fillable = [
        'invitation_id',
        'schema'
    ];

    protected $casts = [
        'schema' => 'array'
    ];

    public function invitation(): BelongsTo
    {
        return $this->belongsTo(Invitation::class);
    }
}
