<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Invitation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'slug',
        'editor_token',
        'editor_expires_at',
        'status',
        'published_at',
        'active_until',
    ];

    protected $casts = [
        'editor_expires_at' => 'datetime',
        'published_at' => 'datetime',
        'active_until' => 'datetime',
    ];

    // relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function editorData()
    {
        return $this->hasOne(InvitationEditorData::class);
    }

    // helpers
    public function isActive(): bool
    {
        if ($this->status !== 'active') return false;

        if ($this->active_until === null) return true;

        return now()->lt($this->active_until);
    }

    public function isExpired(): bool
    {
        return $this->active_until !== null && now()->gte($this->active_until);
    }

    // factory helper
    public static function generateSlug(string $base): string
    {
        $slug = Str::slug($base);
        $original = $slug;
        $i = 1;

        while (self::where('slug', $slug)->exists()) {
            $slug = "{$original}-{$i}";
            $i++;
        }

        return $slug;
    }
}
