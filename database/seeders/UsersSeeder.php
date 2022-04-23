<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();

        $user->name = 'Admin';
        $user->email = 'admin@admin.com';
        $user->email_verified_at = now();
        $user->password = bcrypt('password');
        $user->remember_token = Str::random();
        $user->created_at = $user->updated_at =  now();

        $user->save();
    }
}
