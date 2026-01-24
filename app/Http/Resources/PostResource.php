<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

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
            'updated_at' => optional($this->updated_at)->toDateTimeString(),
        ];
    }
}
