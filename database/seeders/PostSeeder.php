<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'title' => 'Designing dependable SaaS architectures',
                'summary' => 'Practical considerations for scalability, observability, and ongoing maintenance.',
                'status' => 'Published',
                'reading_time' => '7 min',
                'published_at' => now()->subDays(10),
            ],
            [
                'title' => 'Working with the Vue 3 Composition API',
                'summary' => 'Patterns that keep larger front-end codebases organised and testable.',
                'status' => 'Published',
                'reading_time' => '6 min',
                'published_at' => now()->subDays(14),
            ],
            [
                'title' => 'Running a consulting practice with clarity',
                'summary' => 'How weekly cadences and communication frameworks keep projects aligned.',
                'status' => 'Draft',
                'reading_time' => '8 min',
                'published_at' => now()->addDays(7),
            ],
        ];

        foreach ($posts as $post) {
            Post::updateOrCreate(
                ['title' => $post['title']],
                $post + ['slug' => Str::slug($post['title'])]
            );
        }
    }
}
