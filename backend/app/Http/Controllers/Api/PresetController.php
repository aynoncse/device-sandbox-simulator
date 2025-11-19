<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PresetRequest;
use App\Models\Preset;

class PresetController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'presets' => Preset::orderBy('id', 'desc')->limit(50)->get()
            ]
        ]);
    }

    public function store(PresetRequest $request)
    {
        $data = $request->validated();
        $preset = Preset::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Preset created successfully',
            'data' => [
                'preset' => $preset
            ]
        ]);
    }

    public function update(PresetRequest $request, $id)
    {
        $preset = Preset::find($id);
        $data = $request->validated();

        if (!$preset) {
            return response()->json([
                'success' => false,
                'message' => 'Preset not found',
            ], 404);
        }

        $preset->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Preset updated successfully',
            'data' => [
                'preset' => $preset
            ]
        ]);
    }

    public function destroy($id)
    {
        $preset = Preset::find($id);

        if (!$preset) {
            return response()->json([
                'success' => false,
                'message' => 'Preset not found',
            ], 404);
        }

        $preset->delete();

        return response()->json([
            'success' => true,
            'message' => 'Preset deleted successfully',
        ]);
    }
}
