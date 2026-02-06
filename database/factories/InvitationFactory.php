<?php

namespace Database\Factories;

use App\Models\Invitation;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invitation>
 */
class InvitationFactory extends Factory
{
    protected $model = Invitation::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'slug' => Str::slug($this->faker->unique()->sentence(2)),
            'status' => 'draft',
            'editor_token' => Str::random(64),
            'editor_expires_at' => now()->addHours(24),
        ];
    }

    public function active(): static
    {
        return $this->state(fn() => [
            'status' => 'active',
            'active_until' => now()->addDays(30),
            'published_at' => now(),
        ]);
    }
}