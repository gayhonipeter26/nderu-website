<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class MediaAssetResource extends JsonResource
{
    /**
     * @param  Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'kind' => $this->kind,
            'mime_type' => $this->mime_type,
            'collection' => $this->collection,
            'url' => Storage::disk($this->disk ?? 'public')->url($this->path),
            'position' => $this->position,
        ];
    }
}
