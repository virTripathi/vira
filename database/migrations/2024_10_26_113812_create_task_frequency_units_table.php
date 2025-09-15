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
        Schema::create('task_frequency_units', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->enum('value',['second','minute','hour','day','month','year']);
            $table->uuid('status_id');
            $table->foreign('status_id')->references('id')->on('statuses')->onDelete('cascade');
            $table->timestamps();
            $table->uuid('created_by');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->uuid('updated_by');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('task_frequency_units');
    }
};
