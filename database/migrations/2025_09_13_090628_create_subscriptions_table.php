<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // Razorpay IDs
            $table->string('razorpay_subscription_id')->unique();
            $table->string('razorpay_payment_id')->nullable(); // first payment
            $table->string('razorpay_plan_id');
            $table->string('plan');
            $table->enum('status', [
                'pending',     // subscription created, waiting for payment
                'active',      // payment successful, subscription running
                'cancelled',   // manually cancelled
                'failed',      // initial payment failed
                'expired',     // ended after total_count
                'paused',      // pause the subscription
                'pending_cancel', // Cancellation requested, webhook event not recieved
                'pending_pause',  // Pause requested, webhook event not recieved
                'pending_resume'  // Resume requested, webhook event not recieved  
            ])->default('pending');
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
