<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use App\Models\Comment;
use App\Models\MediaAsset;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'category',
        'summary',
        'hero_image_path',
        'case_study_video_path',
        'year',
        'status',
        'featured',
        'meta',
        'likes_count',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'meta' => 'array',
        'year' => 'integer',
        'hero_image_path' => 'string',
        'case_study_video_path' => 'string',
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
        static::creating(function (Project $project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->title);
            }
        });
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'Published');
    }
}
