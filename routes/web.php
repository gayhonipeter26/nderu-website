<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\PhotographySessionController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\ContactChannelController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\PhotographySessionResource;
use App\Http\Resources\FaqResource;
use App\Http\Resources\ContactChannelResource;
use App\Models\Service;
use App\Models\Project;
use App\Models\Post;
use App\Models\PhotographySession;
use App\Models\Faq;
use App\Models\ContactChannel;

// Website Routes
Route::get('/', function () {
    return Inertia::render('Home', [
        'services' => ServiceResource::collection(
            Service::published()->orderBy('title')->take(4)->get()
        )->resolve(),
        'projects' => ProjectResource::collection(
            Project::published()->latest('updated_at')->take(3)->get()
        )->resolve(),
        'posts' => PostResource::collection(
            Post::published()->latest('published_at')->take(3)->get()
        )->resolve(),
        'channels' => ContactChannelResource::collection(
            ContactChannel::published()->orderBy('display_order')->get()
        )->resolve(),
    ]);
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/services', function () {
    return Inertia::render('Services', [
        'services' => ServiceResource::collection(
            Service::published()->orderBy('title')->get()
        )->resolve(),
    ]);
})->name('services');

Route::get('/projects', function () {
    return Inertia::render('Projects', [
        'projects' => ProjectResource::collection(
            Project::published()->orderByDesc('year')->get()
        )->resolve(),
    ]);
})->name('projects');

Route::get('/photography', function () {
    return Inertia::render('Photography', [
        'sessions' => PhotographySessionResource::collection(
            PhotographySession::published()->orderByDesc('scheduled_at')->get()
        )->resolve(),
    ]);
})->name('photography');

Route::get('/blog', function () {
    return Inertia::render('Blog', [
        'posts' => PostResource::collection(
            Post::published()->orderByDesc('published_at')->get()
        )->resolve(),
    ]);
})->name('blog');

Route::get('/contact', function () {
    return Inertia::render('Contact', [
        'channels' => ContactChannelResource::collection(
            ContactChannel::published()->orderBy('display_order')->get()
        )->resolve(),
        'faqs' => FaqResource::collection(
            Faq::published()->orderBy('question')->get()
        )->resolve(),
    ]);
})->name('contact');

// Admin Routes
Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', DashboardController::class)->name('dashboard');

        Route::resource('services', ServiceController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        Route::resource('projects', ProjectController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        Route::resource('blog', PostController::class)
            ->parameters(['blog' => 'post'])
            ->only(['index', 'store', 'update', 'destroy']);

        Route::resource('photography', PhotographySessionController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        Route::resource('faqs', FaqController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        Route::resource('contact', ContactChannelController::class)
            ->only(['index', 'store', 'update', 'destroy']);
    });

// Dashboard Route (keeping existing)
Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';
