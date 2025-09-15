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
        Schema::create('chat_question_answers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('question_id');
            $table->foreign('question_id')->references('id')->on('chat_questions')->onDelete('cascade');
            $table->text('answer');
            $table->integer('version')->default(1);
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
        Schema::dropIfExists('chat_question_answers');
    }
};
