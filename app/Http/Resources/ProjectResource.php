<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProjectResource extends JsonResource
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
            'category' => $this->category,
            'summary' => $this->summary,
            'year' => $this->year,
            'status' => $this->status,
            'featured' => (bool) $this->featured,
            'hero_image_url' => $this->hero_image_path ? Storage::url($this->hero_image_path) : null,
            'case_study_video_url' => $this->case_study_video_path ? Storage::url($this->case_study_video_path) : null,
            'meta' => $this->meta ?? [],
            'likes_count' => $this->likes_count ?? 0,
            'updated_at' => optional($this->updated_at)->toDateString(),
        ];
    }
}
