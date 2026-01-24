<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $projects = Project::orderByDesc('updated_at')->get();

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
            'hero_image' => ['nullable', 'image', 'max:5120'],
            'case_study_video' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime', 'max:51200'],
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

        Project::create($payload);

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
            'hero_image' => ['nullable', 'image', 'max:5120'],
            'case_study_video' => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime', 'max:51200'],
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

        $project->delete();

        return redirect()->back()->with('success', 'Project removed.');
    }
}
