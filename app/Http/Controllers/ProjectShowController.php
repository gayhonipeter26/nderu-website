<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProjectShowController extends Controller
{
    public function show(Project $project): Response
    {
        abort_if($project->status !== 'Published', 404);

        $project->load(['comments', 'media']);

        return Inertia::render('Projects/Show', [
            'project' => ProjectResource::make($project)->resolve(),
            'comments' => CommentResource::collection(
                $project->comments()->latest()->get()
            )->resolve(),
        ]);
    }

    public function storeComment(Request $request, Project $project): RedirectResponse
    {
        abort_if($project->status !== 'Published', 404);

        $data = $request->validate([
            'author_name' => ['required', 'string', 'max:150'],
            'author_email' => ['nullable', 'email', 'max:150'],
            'body' => ['required', 'string', 'max:2000'],
        ]);

        $project->comments()->create($data);

        return Redirect::route('projects.show', $project)->with('success', 'Thanks for sharing your thoughts.');
    }

    public function like(Project $project): RedirectResponse
    {
        abort_if($project->status !== 'Published', 404);

        $project->increment('likes_count');

        return Redirect::route('projects.show', $project)->with('success', 'Glad the case study resonated!');
    }
}
