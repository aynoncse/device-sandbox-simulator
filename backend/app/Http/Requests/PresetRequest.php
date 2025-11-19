<?php

namespace App\Http\Requests;

use App\Models\Device;
use Illuminate\Foundation\Http\FormRequest;

class PresetRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $devices = Device::select('type')->get()->pluck('type')->toArray();

        return [
            'name' => 'required|string|max:100',
            'type' => 'required|string|in:' . implode(',', $devices),
            'settings' => 'required|array',
            'settings.isOn' => 'required|boolean',
            'settings.speed' => 'required_if:type,fan|integer|min:0|max:100',
            'settings.brightness' => 'required_if:type,light|integer|min:0|max:100',
            'settings.colorId' => 'required_if:type,light|integer|min:1|max:100',
        ];
    }
}
