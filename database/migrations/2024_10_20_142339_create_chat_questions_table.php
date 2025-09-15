<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chat_questions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('chat_id')->nullable();
            $table->foreign('chat_id')->references('id')->on('chats')->onDelete('cascade');
            $table->text('question');
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chat_questions');
    }
};
