<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'E-commerce platform rollout',
                'category' => 'Web applications',
                'summary' => 'Composable storefront with inventory, payments, and analytics for a retail scale-up.',
                'status' => 'Published',
                'year' => 2024,
                'featured' => true,
            ],
            [
                'title' => 'Hospital management suite',
                'category' => 'Systems',
                'summary' => 'Clinical records, scheduling, and billing platform with role-based access control.',
                'status' => 'Published',
                'year' => 2024,
            ],
            [
                'title' => 'Corporate photography coverage',
                'category' => 'Photography',
                'summary' => 'Conference and leadership portraits delivered with same-day selects.',
                'status' => 'Published',
                'year' => 2024,
            ],
            [
                'title' => 'SaaS analytics dashboard',
                'category' => 'Web applications',
                'summary' => 'Usage analytics and reporting for product teams with realtime feeds.',
                'status' => 'Draft',
                'year' => 2023,
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(
                ['title' => $project['title']],
                $project
            );
        }
    }
}
