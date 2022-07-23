<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Trip;
use Carbon\Carbon;

class TripSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $time_start = microtime(true);
        Trip::truncate();
        $csvfiles = ["2021-05", "2021-06", "2021-07"];
        $entries = 0;
        $tripArray = [];
        foreach ($csvfiles as $csv) {
            $csvFile = fopen(base_path("database/data/$csv.csv"), "r");
            $firstline = true;
            while (($data = fgetcsv($csvFile, 1000, ",")) !== FALSE) {
                // Skip first line of csv file
                if (!$firstline) {
                    // Handle occasional csv string row
                    if (count($data) < 8) {
                        $data = str_getcsv($data[0]);
                    }
                    // Excluding bad entries
                    if ($data[6] > 10 && $data[7] > 10) {
                        $entries++;
                        $tripArray[] = array(
                            'departure' => Carbon::create($data[0])->toDateTimeString(),
                            'return' => Carbon::create($data[1])->toDateTimeString(),
                            'departure_station_id' => $data[2],
                            'departure_station_name' => $data[3],
                            'return_station_id' => $data[4],
                            'return_station_name' => $data[5],
                            'covered_distance' => $data[6],
                            'duration' => $data[7],
                        );
                    }
                    // Insert array when it reaches 450 entries
                    if (count($tripArray) > 450) {
                        Trip::insert($tripArray);
                        $tripArray = [];
                    }
                }
                $firstline = false;
            }
            fclose($csvFile);
        }
        $time_end = microtime(true);
        $execution_time = ($time_end - $time_start);
        // Insert remaining entries
        Trip::insert($tripArray);
        printf("Seeded %d entries in %s seconds.\n", $entries, $execution_time);
    }
}
