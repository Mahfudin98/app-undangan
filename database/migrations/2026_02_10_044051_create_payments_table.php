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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('idempotency_key')->unique()->nullable();
            $table->foreignId('invitation_id')->constrained()->cascadeOnDelete();
            $table->string('provider'); // midtrans, xendit, stripe
            $table->string('external_id')->nullable();
            $table->integer('amount');
            $table->string('status'); // pending, paid, failed
            $table->jsonb('payload')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};