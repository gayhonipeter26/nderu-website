<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Database\Seeders\ServiceSeeder;
use Database\Seeders\ProjectSeeder;
use Database\Seeders\PostSeeder;
use Database\Seeders\PhotographySessionSeeder;
use Database\Seeders\FaqSeeder;
use Database\Seeders\ContactChannelSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call([
            ServiceSeeder::class,
            ProjectSeeder::class,
            PostSeeder::class,
            PhotographySessionSeeder::class,
            FaqSeeder::class,
            ContactChannelSeeder::class,
        ]);
    }
}
