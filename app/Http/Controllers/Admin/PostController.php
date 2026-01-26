<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(Request $request): Response
    {
        $posts = Post::with('media')
            ->orderByDesc('published_at')
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
            'cover_image' => ['nullable', 'image', 'max:204800'],
            'feature_video' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime', 'max:204800'],
            'gallery' => ['nullable', 'array', 'max:20'],
            'gallery.*' => ['image', 'max:204800'],
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

        $post = Post::create($payload);

        $this->storeGallery($post, $request->file('gallery', []));

        $this->ensureCoverImage($post);

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
            'cover_image' => ['nullable', 'image', 'max:204800'],
            'feature_video' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime', 'max:204800'],
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

        $this->removeGallery($post, $request->input('gallery_remove', []));

        $this->storeGallery($post, $request->file('gallery', []));

        $this->ensureCoverImage($post);

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

        $post->media()->each->delete();

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

    /**
     * @param  array<int, UploadedFile|null>  $files
     */
    protected function storeGallery(Post $post, array $files): void
    {
        $files = array_filter($files);

        if (empty($files)) {
            return;
        }

        $position = (int) $post->media()->max('position');

        foreach ($files as $index => $file) {
            $path = $file->store('blog/gallery', 'public');

            $post->media()->create([
                'path' => $path,
                'disk' => 'public',
                'kind' => str_starts_with($file->getMimeType(), 'video') ? 'video' : 'image',
                'mime_type' => $file->getMimeType(),
                'collection' => 'gallery',
                'position' => $position + $index + 1,
            ]);
        }

        $this->reorderMedia($post);
    }

    protected function removeGallery(Post $post, array $assetIds): void
    {
        if (empty($assetIds)) {
            return;
        }

        $ids = collect($assetIds)
            ->filter(fn ($id) => is_numeric($id))
            ->map(fn ($id) => (int) $id)
            ->all();

        if (empty($ids)) {
            return;
        }

        $post->media()->whereIn('id', $ids)->get()->each->delete();

        $this->reorderMedia($post);
    }

    protected function reorderMedia(Post $post): void
    {
        $post->load('media');

        $post->media
            ->sortBy('position')
            ->values()
            ->each(function ($asset, $index) {
                if ($asset->position !== $index + 1) {
                    $asset->updateQuietly(['position' => $index + 1]);
                }
            });
    }

    protected function ensureCoverImage(Post $post): void
    {
        $post->refresh();

        if ($post->cover_image_path) {
            return;
        }

        $firstImage = $post->media()
            ->where('kind', 'image')
            ->orderBy('position')
            ->first();

        if ($firstImage) {
            $post->updateQuietly(['cover_image_path' => $firstImage->path]);
        }
    }
}
