<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Device;

class DeviceController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'devices' => Device::orderBy('id', 'desc')->get()
            ]
        ]);
    }
}
