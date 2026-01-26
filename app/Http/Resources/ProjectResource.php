<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\MediaAssetResource;

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
            'gallery_count' => $this->whenLoaded('media', fn() => $this->media->count()),
            'gallery' => MediaAssetResource::collection($this->whenLoaded('media')),
            'created_at' => optional($this->created_at)->format('M d, Y'),
            'updated_at' => optional($this->updated_at)->toDateString(),
            'technologies' => $this->meta['technologies'] ?? [],
            'client' => $this->meta['client'] ?? null,
            'project_type' => $this->meta['project_type'] ?? 'Web Application',
            'completion_date' => $this->meta['completion_date'] ?? null,
        ];
    }
}
