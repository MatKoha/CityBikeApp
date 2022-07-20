<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Station extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name_fi',
        'name_swe',
        'name_en',
        'address_fi',
        'address_swe',
        'city_fi',
        'city_swe',
        'operator',
        'capacity',
        'lat',
        'long',
    ];
}
