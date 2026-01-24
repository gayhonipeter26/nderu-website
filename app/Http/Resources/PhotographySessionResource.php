<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PhotographySessionResource extends JsonResource
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
            'location' => $this->location,
            'summary' => $this->summary,
            'deliverables' => $this->deliverables_count,
            'status' => $this->status,
            'scheduled_at' => optional($this->scheduled_at)->toDateString(),
            'hero_image_url' => $this->hero_image_path ? Storage::url($this->hero_image_path) : null,
            'highlight_video_url' => $this->highlight_video_path ? Storage::url($this->highlight_video_path) : null,
            'likes_count' => $this->likes_count ?? 0,
            'updated_at' => optional($this->updated_at)->toDateString(),
        ];
    }
}
