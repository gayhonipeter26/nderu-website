<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Http\Resources\PhotographySessionResource;
use App\Models\PhotographySession;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class PhotographyShowController extends Controller
{
    public function show(PhotographySession $session): Response
    {
        abort_if($session->status !== 'Published', 404);

        $session->load(['comments', 'media']);

        return Inertia::render('Photography/Show', [
            'session' => PhotographySessionResource::make($session)->resolve(),
            'comments' => CommentResource::collection(
                $session->comments()->latest()->get()
            )->resolve(),
        ]);
    }

    public function storeComment(Request $request, PhotographySession $session): RedirectResponse
    {
        abort_if($session->status !== 'Published', 404);

        $data = $request->validate([
            'author_name' => ['required', 'string', 'max:150'],
            'author_email' => ['nullable', 'email', 'max:150'],
            'body' => ['required', 'string', 'max:2000'],
        ]);

        $session->comments()->create($data);

        return Redirect::route('photography.show', $session)->with('success', 'Thanks for sharing your thoughts.');
    }

    public function like(PhotographySession $session): RedirectResponse
    {
        abort_if($session->status !== 'Published', 404);

        $session->increment('likes_count');

        return Redirect::route('photography.show', $session)->with('success', 'Appreciate the love on this set!');
    }
}
