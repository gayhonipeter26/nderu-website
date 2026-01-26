<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class PostShowController extends Controller
{
    public function show(Post $post): Response
    {
        $post->load(['comments', 'media']);

        return Inertia::render('Blog/Show', [
            'post' => PostResource::make($post)->resolve(),
            'comments' => CommentResource::collection(
                $post->comments()->latest()->get()
            )->resolve(),
        ]);
    }

    public function storeComment(Request $request, Post $post): RedirectResponse
    {
        $data = $request->validate([
            'author_name' => ['required', 'string', 'max:150'],
            'author_email' => ['nullable', 'email', 'max:150'],
            'body' => ['required', 'string', 'max:2000'],
        ]);

        $post->comments()->create($data);

        return Redirect::route('blog.show', $post)->with('success', 'Thanks for sharing your thoughts.');
    }

    public function like(Post $post): RedirectResponse
    {
        $post->increment('likes_count');

        return Redirect::route('blog.show', $post)->with('success', 'Appreciate the support!');
    }
}
