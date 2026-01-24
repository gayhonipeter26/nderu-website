<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            ['title' => 'Web applications', 'summary' => 'Composable front-ends and APIs for product teams.', 'status' => 'Published'],
            ['title' => 'System architecture', 'summary' => 'Technical leadership, integration roadmaps, and scaling plans.', 'status' => 'Published'],
            ['title' => 'Consulting retainers', 'summary' => 'On-going guidance, code reviews, and delivery assurance.', 'status' => 'Published'],
            ['title' => 'Photography', 'summary' => 'Events, portraits, and product sets with consistent styling.', 'status' => 'Published'],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(
                ['title' => $service['title']],
                $service
            );
        }
    }
}
