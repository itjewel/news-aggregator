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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique(); // Ensure title is unique
            $table->text('content');
            $table->string('source', 255); // Specify max length if needed
            $table->string('category', 100)->nullable(); // Made nullable
            $table->timestamp('published_at')->nullable(); // Add this line
            $table->timestamps();

            // Optional: Indexes for faster querying
            $table->index('source');
            $table->index('category');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles');
    }
};
