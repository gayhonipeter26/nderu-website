<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\MediaAssetResource;

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
            'deliverables_count' => $this->deliverables_count,
            'status' => $this->status,
            'scheduled_at' => $this->scheduled_at ? $this->scheduled_at->format('M d, Y') : null,
            'hero_image_url' => $this->hero_image_path ? Storage::url($this->hero_image_path) : null,
            'highlight_video_url' => $this->highlight_video_path ? Storage::url($this->highlight_video_path) : null,
            'likes_count' => $this->likes_count ?? 0,
            'gallery_count' => $this->whenLoaded('media', fn() => $this->media->count()),
            'gallery' => MediaAssetResource::collection($this->whenLoaded('media')),
            'created_at' => optional($this->created_at)->format('M d, Y'),
            'updated_at' => optional($this->updated_at)->toDateString(),
            'session_type' => $this->meta['session_type'] ?? 'Event Photography',
            'duration' => $this->meta['duration'] ?? null,
            'equipment' => $this->meta['equipment'] ?? [],
            'client' => $this->meta['client'] ?? null,
        ];
    }
}
