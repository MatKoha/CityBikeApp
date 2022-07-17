<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use Inertia\Inertia;

class TripController extends Controller
{
    public function index()
    {
        return Inertia::render('Index', [
            'data' => Trip::paginate(20)->toArray(),
        ]);
    }
}
