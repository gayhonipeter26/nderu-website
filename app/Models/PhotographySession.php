<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use App\Models\Comment;
use App\Models\MediaAsset;

class PhotographySession extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'location',
        'summary',
        'hero_image_path',
        'highlight_video_path',
        'deliverables_count',
        'status',
        'scheduled_at',
        'likes_count',
    ];

    protected $casts = [
        'deliverables_count' => 'integer',
        'scheduled_at' => 'datetime',
        'hero_image_path' => 'string',
        'highlight_video_path' => 'string',
        'likes_count' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable')->latest();
    }

    public function media(): MorphMany
    {
        return $this->morphMany(MediaAsset::class, 'mediable')->orderBy('position');
    }

    protected static function booted(): void
    {
        static::creating(function (PhotographySession $session) {
            if (empty($session->slug)) {
                $session->slug = Str::slug($session->title);
            }
        });
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'Published');
    }
}
