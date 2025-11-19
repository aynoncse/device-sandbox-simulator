<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Preset extends Model
{
    protected $fillable = ['name', 'type', 'settings'];

    protected $casts = [
        'settings' => 'object',
    ];
}
