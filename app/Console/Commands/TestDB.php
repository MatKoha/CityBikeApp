<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Trip;

class TestDB extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'citybike:db';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Database tests';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $result = Trip::simplePaginate(50);
        print_r($result->toArray());
        return 0;
    }
}
