<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invitations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('slug')->unique();
            $table->string('editor_token', 128)->nullable()->unique();
            $table->timestampTz('editor_expires_at')->nullable();
            $table->enum('status', ['draft', 'active', 'expired', 'suspended'])->default('draft');
            $table->timestampTz('published_at')->nullable();
            $table->timestampTz('active_until')->nullable();
            $table->timestampsTz();

            // performance
            $table->index(['status', 'active_until']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitations');
    }
};