<?php

namespace Database\Seeders;

use App\Models\ArticleTag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArticleTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [];

        for ($i = 1; $i <= 100; $i++) {
            $data[$i]['article_id'] = rand(1, 100);
            $data[$i]['tag_id'] = rand(1, 10);
        }

        ArticleTag::insert($data);
    }
}
