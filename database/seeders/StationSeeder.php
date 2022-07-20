<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Station;

class StationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $time_start = microtime(true);
        Station::truncate();
        $entries = 0;
        $csvFile = fopen(base_path("database/data/Helsingin_ja_Espoon_kaupunkipyöräasemat_avoin.csv"), "r");
        $firstline = true;
        while (($data = fgetcsv($csvFile, 1000, ",")) !== FALSE) {
            // Skip first line of csv file
            if (!$firstline) {
                $entries++;
                Station::create(array(
                    'id' => $data[1],
                    'name_fi' => $data[2],
                    'name_swe' => $data[3],
                    'name_en' => $data[4],
                    'address_fi' => $data[5],
                    'address_swe' => $data[6],
                    'city_fi' => $data[7],
                    'city_swe' => $data[8],
                    'operator' => $data[9],
                    'capacity' => $data[10],
                    'long' => $data[11],
                    'lat' => $data[12],
                ));
            }
            $firstline = false;
        }
        fclose($csvFile);
        $time_end = microtime(true);
        $execution_time = ($time_end - $time_start);
        printf("Seeded %d entries in %s seconds.\n", $entries, $execution_time);
    }
}
