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

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['departure'] ?? null, function ($query, $date) {
            $query->whereDate('departure', '>=', $date);
        })->when($filters['return'] ?? null, function ($query, $date) {
            $query->whereDate('return', '<=', $date);
        })->when($filters['from'] ?? null, function ($query, $id) {
            $query->where('departure_station_id', $id);
        })->when($filters['to'] ?? null, function ($query, $id) {
            $query->where('return_station_id', $id);
        })->when($filters['max_time'] ?? null, function ($query, $time) {
            $query->where('duration', '<', $time);
        })->when($filters['min_time'] ?? null, function ($query, $time) {
            $query->where('duration', '>', $time);
        })->when($filters['min_d'] ?? null, function ($query, $distance) {
            $query->where('covered_distance', '>', $distance);
        })->when($filters['max_d'] ?? null, function ($query, $distance) {
            $query->where('covered_distance', '<', $distance);
        });
    }
}
