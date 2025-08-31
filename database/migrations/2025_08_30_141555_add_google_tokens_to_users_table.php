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
        Schema::table('users', function (Blueprint $table) {
            $table->string('profile_picture')->nullable();
            $table->string('google_access_token')->nullable();
            $table->string('google_refresh_token')->nullable();
            $table->timestamp('google_token_expires_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // $table->dropColumn('profile_picture');
            $table->dropColumn('google_access_token');
            $table->dropColumn('google_refresh_token');
            $table->dropColumn('google_token_expires_at');
        });
    }
};
