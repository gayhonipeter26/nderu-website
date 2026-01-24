<?php

namespace Database\Seeders;

use App\Models\ContactChannel;
use Illuminate\Database\Seeder;

class ContactChannelSeeder extends Seeder
{
    public function run(): void
    {
        $channels = [
            [
                'label' => 'Email',
                'value' => 'hello@nderu.com',
                'type' => 'mailto',
                'status' => 'Published',
                'display_order' => 1,
            ],
            [
                'label' => 'Phone',
                'value' => '+254 700 123 456',
                'type' => 'tel',
                'status' => 'Published',
                'display_order' => 2,
            ],
            [
                'label' => 'Availability note',
                'value' => 'Currently booking projects with mid-April starts.',
                'type' => 'note',
                'status' => 'Draft',
                'display_order' => 3,
            ],
        ];

        foreach ($channels as $channel) {
            ContactChannel::updateOrCreate(
                ['label' => $channel['label']],
                $channel
            );
        }
    }
}
