<?php

use App\Http\Controllers\Api\DeviceController;
use App\Http\Controllers\Api\PresetController;
use Illuminate\Support\Facades\Route;

Route::get('/devices', [DeviceController::class, 'index']);

Route::get('/presets', [PresetController::class, 'index']);
Route::post('/presets', [PresetController::class, 'store']);
Route::put('/presets/{id}', [PresetController::class, 'update']);
Route::delete('/presets/{id}', [PresetController::class, 'destroy']);
