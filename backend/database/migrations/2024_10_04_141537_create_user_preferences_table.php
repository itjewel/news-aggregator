<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserPreferencesTable extends Migration
{
    public function up()
    {
        Schema::create('user_preferences', function (Blueprint $table) {
            $table->id(); // This will create an auto-incrementing ID
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // References the users table
            $table->string('source')->nullable(); // Preferred news source
            $table->string('category')->nullable(); // Preferred news category
            $table->string('author')->nullable(); // Preferred author
            $table->timestamps(); // Creates created_at and updated_at columns
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_preferences'); // Drops the user_preferences table
    }
}
