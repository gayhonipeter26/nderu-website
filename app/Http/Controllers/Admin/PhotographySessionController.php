<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PhotographySessionResource;
use App\Models\PhotographySession;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PhotographySessionController extends Controller
{
    public function index(Request $request): Response
    {
        $sessions = PhotographySession::orderByDesc('updated_at')->get();

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
            'hero_image' => ['nullable', 'image', 'max:5120'],
            'highlight_video' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime', 'max:51200'],
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
            $payload['hero_image_path'] = $request->file('hero_image')
                ->store('photography/hero-images', 'public');
        }

        if ($request->hasFile('highlight_video')) {
            $payload['highlight_video_path'] = $request->file('highlight_video')
                ->store('photography/highlight-videos', 'public');
        }

        PhotographySession::create($payload);

        return redirect()->back()->with('success', 'Session created.');
    }

    public function update(Request $request, PhotographySession $photographySession): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'location' => ['nullable', 'string', 'max:150'],
            'summary' => ['nullable', 'string'],
            'hero_image' => ['nullable', 'image', 'max:5120'],
            'highlight_video' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime', 'max:51200'],
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

        $photographySession->delete();

        return redirect()->back()->with('success', 'Session removed.');
    }
}
