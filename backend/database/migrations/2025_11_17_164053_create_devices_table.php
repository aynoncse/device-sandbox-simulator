<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->string('type', 20)->unique();
            $table->string('name', 100);
            $table->json('settings')->nullable();
            $table->timestamps();
        });

        $now = now();
        DB::table('devices')->insert([
            [
                'id' => 1,
                'type' => 'light',
                'name' => 'Light',
                'settings' => json_encode([
                    'isOn' => false,
                    'brightness' => 0,
                    'colorId' => 1
                ]),
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'id' => 2,
                'type' => 'fan',
                'name' => 'Fan',
                'settings' => json_encode([
                    'isOn' => false,
                    'speed' => 1
                ]),
                'created_at' => $now,
                'updated_at' => $now
            ]
        ]);
    }

    // Insert data into the table


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devices');
    }
};
