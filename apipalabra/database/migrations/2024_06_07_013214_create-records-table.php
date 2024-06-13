<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(){

        Schema::create('records', function (Blueprint $table) {
            $table->id();
            $table->string('player_name');
            $table->string('difficulty');
            $table->integer('time'); // Almacena el tiempo en milisegundos
            $table->timestamps();
        });
        
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('records');
    }
};
