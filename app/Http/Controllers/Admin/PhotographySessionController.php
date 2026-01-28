<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PhotographySessionResource;
use App\Models\PhotographySession;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PhotographySessionController extends Controller
{
    public function index(Request $request): Response
    {
        $sessions = PhotographySession::with('media')->orderByDesc('updated_at')->get();

        return Inertia::render('admin/Photography/Index', [
            'sessions' => PhotographySessionResource::collection($sessions),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'location' => ['nullable', 'string', 'max:150'],
            'summary' => ['nullable', 'string'],
            'hero_image' => ['nullable', 'image', 'max:204800'],
            'highlight_video' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime', 'max:204800'],
            'deliverables' => ['nullable', 'integer', 'min:0'],
            'status' => ['required', Rule::in(['Published', 'Draft'])],
            'scheduled_at' => ['nullable', 'date'],
            'gallery' => ['nullable', 'array', 'max:20'],
            'gallery.*' => ['image', 'max:204800'],
        ]);

        $payload = [
            'title' => $data['title'],
            'location' => $data['location'] ?? null,
            'summary' => $data['summary'] ?? null,
            'deliverables_count' => $data['deliverables'] ?? 0,
            'status' => $data['status'],
            'scheduled_at' => $data['scheduled_at'] ?? null,
        ];

        if ($request->hasFile('hero_image')) {
            $payload['hero_image_path'] = $request->file('hero_image')
                ->store('photography/hero-images', 'public');
        }

        if ($request->hasFile('highlight_video')) {
            $payload['highlight_video_path'] = $request->file('highlight_video')
                ->store('photography/highlight-videos', 'public');
        }

        $session = PhotographySession::create($payload);

        $this->storeGallery($session, $request->file('gallery', []));

        $this->ensureHeroImage($session);

        return redirect()->back()->with('success', 'Session created.');
    }

    public function update(Request $request, PhotographySession $photographySession): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'location' => ['nullable', 'string', 'max:150'],
            'summary' => ['nullable', 'string'],
            'hero_image' => ['nullable', 'image', 'max:204800'],
            'highlight_video' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime', 'max:204800'],
            'deliverables' => ['nullable', 'integer', 'min:0'],
            'status' => ['required', Rule::in(['Published', 'Draft'])],
            'scheduled_at' => ['nullable', 'date'],
        ]);

        $payload = [
            'title' => $data['title'],
            'location' => $data['location'] ?? null,
            'summary' => $data['summary'] ?? null,
            'deliverables_count' => $data['deliverables'] ?? 0,
            'status' => $data['status'],
            'scheduled_at' => $data['scheduled_at'] ?? null,
        ];

        if ($request->hasFile('hero_image')) {
            if ($photographySession->hero_image_path) {
                Storage::disk('public')->delete($photographySession->hero_image_path);
            }

            $payload['hero_image_path'] = $request->file('hero_image')
                ->store('photography/hero-images', 'public');
        }

        if ($request->hasFile('highlight_video')) {
            if ($photographySession->highlight_video_path) {
                Storage::disk('public')->delete($photographySession->highlight_video_path);
            }

            $payload['highlight_video_path'] = $request->file('highlight_video')
                ->store('photography/highlight-videos', 'public');
        }

        $photographySession->update($payload);

        $this->removeGallery($photographySession, $request->input('gallery_remove', []));

        $this->storeGallery($photographySession, $request->file('gallery', []));

        $this->ensureHeroImage($photographySession);

        return redirect()->back()->with('success', 'Session updated.');
    }

    public function destroy(PhotographySession $photographySession): RedirectResponse
    {
        if ($photographySession->hero_image_path) {
            Storage::disk('public')->delete($photographySession->hero_image_path);
        }

        if ($photographySession->highlight_video_path) {
            Storage::disk('public')->delete($photographySession->highlight_video_path);
        }

        $photographySession->media()->get()->each->delete();

        $photographySession->delete();

        return redirect()->back()->with('success', 'Session removed.');
    }

    /**
     * @param  array<int, UploadedFile|null>  $files
     */
    protected function storeGallery(PhotographySession $session, array $files): void
    {
        $files = array_filter($files);

        if (empty($files)) {
            return;
        }

        $position = (int) $session->media()->max('position');

        foreach ($files as $index => $file) {
            $path = $file->store('photography/gallery', 'public');

            $session->media()->create([
                'path' => $path,
                'disk' => 'public',
                'kind' => str_starts_with($file->getMimeType(), 'video') ? 'video' : 'image',
                'mime_type' => $file->getMimeType(),
                'collection' => 'gallery',
                'position' => $position + $index + 1,
            ]);
        }

        $this->reorderMedia($session);
    }

    protected function removeGallery(PhotographySession $session, array $assetIds): void
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

        $session->media()->whereIn('id', $ids)->get()->each->delete();

        $this->reorderMedia($session);
    }

    protected function reorderMedia(PhotographySession $session): void
    {
        $session->load('media');

        $session->media
            ->sortBy('position')
            ->values()
            ->each(function ($asset, $index) {
                if ($asset->position !== $index + 1) {
                    $asset->updateQuietly(['position' => $index + 1]);
                }
            });
    }

    protected function ensureHeroImage(PhotographySession $session): void
    {
        $session->refresh();

        if ($session->hero_image_path) {
            return;
        }

        $firstImage = $session->media()
            ->where('kind', 'image')
            ->orderBy('position')
            ->first();

        if ($firstImage) {
            $session->updateQuietly(['hero_image_path' => $firstImage->path]);
        }
    }
}
