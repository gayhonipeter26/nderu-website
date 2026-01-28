<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $projects = Project::with('media')->orderByDesc('updated_at')->get();

        return Inertia::render('admin/Projects/Index', [
            'projects' => ProjectResource::collection($projects)->resolve(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'category' => ['nullable', 'string', 'max:100'],
            'summary' => ['nullable', 'string'],
            'status' => ['required', Rule::in(['Published', 'Draft'])],
            'year' => ['nullable', 'integer', 'between:2000,2100'],
            'featured' => ['boolean'],
            'hero_image' => ['nullable', 'image', 'max:204800'],
            'case_study_video' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime', 'max:204800'],
            'gallery' => ['nullable', 'array', 'max:20'],
            'gallery.*' => ['image', 'max:204800'],
        ]);

        $payload = [
            'title' => $data['title'],
            'category' => $data['category'] ?? null,
            'summary' => $data['summary'] ?? null,
            'status' => $data['status'],
            'year' => $data['year'] ?? null,
            'featured' => $data['featured'] ?? false,
        ];

        if ($request->hasFile('hero_image')) {
            $payload['hero_image_path'] = $request->file('hero_image')->store('projects/hero-images', 'public');
        }

        if ($request->hasFile('case_study_video')) {
            $payload['case_study_video_path'] = $request->file('case_study_video')->store('projects/case-study-videos', 'public');
        }

        $project = Project::create($payload);

        $this->storeGallery($project, $request->file('gallery', []));

        $this->ensureCoverImage($project);

        return redirect()->back()->with('success', 'Project created.');
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'category' => ['nullable', 'string', 'max:100'],
            'summary' => ['nullable', 'string'],
            'status' => ['required', Rule::in(['Published', 'Draft'])],
            'year' => ['nullable', 'integer', 'between:2000,2100'],
            'featured' => ['boolean'],
            'hero_image' => ['nullable', 'image', 'max:204800'],
            'case_study_video' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime', 'max:204800'],
            'gallery' => ['nullable', 'array', 'max:20'],
            'gallery.*' => ['image', 'max:204800'],
            'gallery_remove' => ['nullable', 'array'],
            'gallery_remove.*' => ['integer'],
        ]);

        $payload = [
            'title' => $data['title'],
            'category' => $data['category'] ?? null,
            'summary' => $data['summary'] ?? null,
            'status' => $data['status'],
            'year' => $data['year'] ?? null,
            'featured' => $data['featured'] ?? false,
        ];

        if ($request->hasFile('hero_image')) {
            if ($project->hero_image_path) {
                Storage::disk('public')->delete($project->hero_image_path);
            }

            $payload['hero_image_path'] = $request->file('hero_image')->store('projects/hero-images', 'public');
        }

        if ($request->hasFile('case_study_video')) {
            if ($project->case_study_video_path) {
                Storage::disk('public')->delete($project->case_study_video_path);
            }

            $payload['case_study_video_path'] = $request->file('case_study_video')->store('projects/case-study-videos', 'public');
        }

        $project->update($payload);

        $this->removeGallery($project, $request->input('gallery_remove', []));

        $this->storeGallery($project, $request->file('gallery', []));

        $this->ensureCoverImage($project);

        return redirect()->back()->with('success', 'Project updated.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        if ($project->hero_image_path) {
            Storage::disk('public')->delete($project->hero_image_path);
        }

        if ($project->case_study_video_path) {
            Storage::disk('public')->delete($project->case_study_video_path);
        }

        $project->media()->get()->each->delete();

        $project->delete();

        return redirect()->back()->with('success', 'Project removed.');
    }

    /**
     * @param  array<int, UploadedFile|null>  $files
     */
    protected function storeGallery(Project $project, array $files): void
    {
        $files = array_filter($files);

        if (empty($files)) {
            return;
        }

        $position = (int) $project->media()->max('position');

        foreach ($files as $index => $file) {
            $path = $file->store('projects/gallery', 'public');

            $project->media()->create([
                'path' => $path,
                'disk' => 'public',
                'kind' => str_starts_with($file->getMimeType(), 'video') ? 'video' : 'image',
                'mime_type' => $file->getMimeType(),
                'collection' => 'gallery',
                'position' => $position + $index + 1,
            ]);
        }

        $this->reorderMedia($project);
    }

    protected function removeGallery(Project $project, array $assetIds): void
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

        $project->media()->whereIn('id', $ids)->get()->each->delete();

        $this->reorderMedia($project);
    }

    protected function reorderMedia(Project $project): void
    {
        $project->load('media');

        $project->media
            ->sortBy('position')
            ->values()
            ->each(function ($asset, $index) {
                if ($asset->position !== $index + 1) {
                    $asset->updateQuietly(['position' => $index + 1]);
                }
            });
    }

    protected function ensureCoverImage(Project $project): void
    {
        $project->refresh();

        if ($project->hero_image_path) {
            return;
        }

        $firstImage = $project->media()
            ->where('kind', 'image')
            ->orderBy('position')
            ->first();

        if ($firstImage) {
            $project->updateQuietly(['hero_image_path' => $firstImage->path]);
        }
    }
}
