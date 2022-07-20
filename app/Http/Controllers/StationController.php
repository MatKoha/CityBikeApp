<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Station;

class StationController extends Controller
{
    public function index()
    {
        return Inertia::render('Stations', [
            'data' => Station::paginate(10)->toArray(),
        ]);
    }
}
