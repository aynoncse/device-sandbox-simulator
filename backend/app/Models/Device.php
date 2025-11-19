<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $fillable = ['type', 'name', 'settings'];

    protected $casts = [
        'settings' => 'array',
    ];
}
