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
        Schema::table('tasks', function (Blueprint $table) {
            $table->uuid('task_frequency_unit_id')->nullable();
            $table->foreign('task_frequency_unit_id')->references('id')->on('task_frequency_units')->onDelete('cascade');
            $table->uuid('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('task_frequency_unit_value');
            $table->timestamp('start_time')->nullable();
            $table->timestamp('end_time')->nullable();
            $table->timestamp('times')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
