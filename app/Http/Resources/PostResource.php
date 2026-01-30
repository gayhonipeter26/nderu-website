<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\MediaAssetResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'summary' => $this->summary,
            'body' => $this->body,
            'status' => $this->status,
            'reading_time' => $this->reading_time,
            'published' => optional($this->published_at)->toFormattedDateString(),
            'published_at' => optional($this->published_at)->toDateString(),
            'cover_image_url' => $this->cover_image_path ? Storage::url($this->cover_image_path) : null,
            'feature_video_url' => $this->feature_video_path ? Storage::url($this->feature_video_path) : null,
            'likes_count' => $this->likes_count ?? 0,
            'gallery_count' => $this->whenLoaded('media', fn() => $this->media->count()),
            'gallery' => MediaAssetResource::collection($this->whenLoaded('media')),
            'created_at' => optional($this->created_at)->format('M d, Y'),
            'updated_at' => optional($this->updated_at)->toDateTimeString(),
            'category' => $this->meta['category'] ?? 'Technology',
            'tags' => $this->meta['tags'] ?? [],
            'author' => $this->meta['author'] ?? 'Nderu Gathoni',
            'featured' => (bool) ($this->meta['featured'] ?? false),
        ];
    }
}
