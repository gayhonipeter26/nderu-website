<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactChannel;
use App\Models\Faq;
use App\Models\PhotographySession;
use App\Models\Post;
use App\Models\Project;
use App\Models\Service;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $stats = [
            ['label' => 'Services', 'value' => Service::count()],
            ['label' => 'Projects', 'value' => Project::count()],
            ['label' => 'Blog posts', 'value' => Post::count()],
            ['label' => 'Photography sessions', 'value' => PhotographySession::count()],
        ];

        $recentActivity = collect()
            ->merge(
                Service::orderByDesc('updated_at')->take(3)->get()->map(fn ($service) => [
                    'title' => "Service updated: {$service->title}",
                    'timestamp' => optional($service->updated_at)->toDateTimeString(),
                ])
            )
            ->merge(
                Project::orderByDesc('updated_at')->take(3)->get()->map(fn ($project) => [
                    'title' => "Project updated: {$project->title}",
                    'timestamp' => optional($project->updated_at)->toDateTimeString(),
                ])
            )
            ->merge(
                Post::orderByDesc('updated_at')->take(3)->get()->map(fn ($post) => [
                    'title' => "Post updated: {$post->title}",
                    'timestamp' => optional($post->updated_at)->toDateTimeString(),
                ])
            )
            ->sortByDesc('timestamp')
            ->take(6)
            ->values()
            ->map(function (array $item) {
                return [
                    'title' => $item['title'],
                    'timestamp' => $item['timestamp']
                        ? Carbon::parse($item['timestamp'])->format('Y-m-d H:i')
                        : null,
                ];
            });

        return Inertia::render('admin/Dashboard', [
            'stats' => $stats,
            'recentActivity' => $recentActivity,
        ]);
    }
}
