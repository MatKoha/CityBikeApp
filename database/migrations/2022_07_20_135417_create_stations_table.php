<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stations', function (Blueprint $table) {
            $table->integer('id');
            $table->string('name_fi');
            $table->string('name_swe');
            $table->string('name_en');
            $table->string('address_fi');
            $table->string('address_swe');
            $table->string('city_fi');
            $table->string('city_swe');
            $table->string('operator');
            $table->integer('capacity');
            $table->decimal('lat', 8, 6);
            $table->decimal('long', 9, 6);
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
        Schema::dropIfExists('stations');
    }
}
