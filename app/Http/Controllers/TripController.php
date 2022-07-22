<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\Station;
use Inertia\Inertia;

class TripController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Trips', [
            'data' => Trip::filter($request->all())
                ->paginate(10)
                ->withQueryString()
                ->toArray(),
            'stations' => Station::all('id', 'name_en',),
        ]);
    }
}
