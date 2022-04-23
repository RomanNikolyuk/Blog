<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(TagsSeeder::class);
        $this->call(ArticleSeeder::class);
        $this->call(CommentsSeeder::class);
        $this->call(LikesSeeder::class);
        $this->call(ViewsSeeder::class);
        $this->call(ArticleTagSeeder::class);
        $this->call(UsersSeeder::class);
    }
}
