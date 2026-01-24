<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            [
                'question' => 'What is the usual response time?',
                'answer' => 'All enquiries receive a reply within one working day, including availability and next steps.',
                'status' => 'Published',
            ],
            [
                'question' => 'Do you work remotely with international teams?',
                'answer' => 'Yes. Weekly cadences and shared workspaces keep collaboration aligned across time zones.',
                'status' => 'Published',
            ],
            [
                'question' => 'How do you structure engagements?',
                'answer' => 'New work begins with discovery calls followed by tailored proposals or retainers.',
                'status' => 'Draft',
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::updateOrCreate(
                ['question' => $faq['question']],
                $faq
            );
        }
    }
}
