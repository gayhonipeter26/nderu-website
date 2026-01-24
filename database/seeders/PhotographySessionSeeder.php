<?php

namespace Database\Seeders;

use App\Models\PhotographySession;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PhotographySessionSeeder extends Seeder
{
    public function run(): void
    {
        $sessions = [
            [
                'title' => 'Corporate conference 2024',
                'location' => 'Nairobi, Kenya',
                'summary' => 'Coverage of keynote sessions, workshops, and evening networking.',
                'deliverables_count' => 3,
                'status' => 'Published',
            ],
            [
                'title' => 'Executive portrait session',
                'location' => 'Studio session',
                'summary' => 'Headshots and brand imagery for leadership communications.',
                'deliverables_count' => 2,
                'status' => 'Published',
            ],
            [
                'title' => 'Product launch catalogue',
                'location' => 'Client studio',
                'summary' => 'E-commerce imagery across hero, lifestyle, and detail shots.',
                'deliverables_count' => 4,
                'status' => 'Draft',
            ],
        ];

        foreach ($sessions as $session) {
            PhotographySession::updateOrCreate(
                ['title' => $session['title']],
                $session + ['slug' => Str::slug($session['title'])]
            );
        }
    }
}
