<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    use HasFactory;

    protected $fillable = [
        'departure',
        'return',
        'departure_station_id',
        'departure_station_name',
        'return_station_id',
        'return_station_name',
        'covered_distance',
        'duration',
    ];
}
