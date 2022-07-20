<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use Inertia\Inertia;

class TripController extends Controller
{
    public function index()
    {
        return Inertia::render('Trips', [
            'data' => Trip::paginate(10)->toArray(),
        ]);
    }
}
