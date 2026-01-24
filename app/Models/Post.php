<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use App\Models\Comment;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'summary',
        'cover_image_path',
        'feature_video_path',
        'body',
        'status',
        'likes_count',
        'reading_time',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'cover_image_path' => 'string',
        'feature_video_path' => 'string',
        'likes_count' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable')->latest();
    }

    protected static function booted(): void
    {
        static::creating(function (Post $post) {
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }
        });
    }

    public function scopePublished($query)
    {
        return $query
            ->where('status', 'Published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }
}
