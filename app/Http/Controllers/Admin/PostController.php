<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(Request $request): Response
    {
        $posts = Post::orderByDesc('published_at')
            ->orderByDesc('updated_at')
            ->get();

        return Inertia::render('admin/Blog/Index', [
            'posts' => PostResource::collection($posts)->resolve(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'summary' => ['nullable', 'string'],
            'reading_time' => ['nullable', 'string', 'max:50'],
            'status' => ['required', Rule::in(['Published', 'Draft'])],
            'published_at' => ['nullable', 'date'],
            'cover_image' => ['nullable', 'image', 'max:5120'],
            'feature_video' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime', 'max:51200'],
        ]);

        $payload = [
            'title' => $data['title'],
            'summary' => $data['summary'] ?? null,
            'reading_time' => $data['reading_time'] ?? null,
            'status' => $data['status'],
            'published_at' => $this->normalizeDate($data['published_at'] ?? null),
        ];

        if ($request->hasFile('cover_image')) {
            $payload['cover_image_path'] = $request->file('cover_image')
                ->store('blog/covers', 'public');
        }

        if ($request->hasFile('feature_video')) {
            $payload['feature_video_path'] = $request->file('feature_video')
                ->store('blog/videos', 'public');
        }

        Post::create($payload);

        return redirect()->back()->with('success', 'Post created.');
    }

    public function update(Request $request, Post $post): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'summary' => ['nullable', 'string'],
            'reading_time' => ['nullable', 'string', 'max:50'],
            'status' => ['required', Rule::in(['Published', 'Draft'])],
            'published_at' => ['nullable', 'date'],
            'cover_image' => ['nullable', 'image', 'max:5120'],
            'feature_video' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime', 'max:51200'],
        ]);

        $payload = [
            'title' => $data['title'],
            'summary' => $data['summary'] ?? null,
            'reading_time' => $data['reading_time'] ?? null,
            'status' => $data['status'],
            'published_at' => $this->normalizeDate($data['published_at'] ?? null),
        ];

        if ($request->hasFile('cover_image')) {
            if ($post->cover_image_path) {
                Storage::disk('public')->delete($post->cover_image_path);
            }

            $payload['cover_image_path'] = $request->file('cover_image')
                ->store('blog/covers', 'public');
        }

        if ($request->hasFile('feature_video')) {
            if ($post->feature_video_path) {
                Storage::disk('public')->delete($post->feature_video_path);
            }

            $payload['feature_video_path'] = $request->file('feature_video')
                ->store('blog/videos', 'public');
        }

        $post->update($payload);

        return redirect()->back()->with('success', 'Post updated.');
    }

    public function destroy(Post $post): RedirectResponse
    {
        if ($post->cover_image_path) {
            Storage::disk('public')->delete($post->cover_image_path);
        }

        if ($post->feature_video_path) {
            Storage::disk('public')->delete($post->feature_video_path);
        }

        $post->delete();

        return redirect()->back()->with('success', 'Post removed.');
    }

    protected function normalizeDate(?string $date): ?Carbon
    {
        if (empty($date)) {
            return null;
        }

        return Carbon::parse($date)->startOfDay();
    }
}
