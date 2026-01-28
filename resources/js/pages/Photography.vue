<script setup lang="tsx">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { Link } from '@inertiajs/vue3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index';
import { Button } from '@/components/ui/button/index';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import ReactTailwindImageGalleryDemo from '@/components/ui/react-tailwind-image-gallery-demo';

type Session = {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  location: string | null;
  deliverables_count: number | null;
  status: 'Published' | 'Draft';
  scheduled_at: string | null;
  hero_image_url: string | null;
  highlight_video_url: string | null;
  likes_count: number;
  gallery_count?: number;
  created_at?: string;
  updated_at: string;
  session_type?: string;
  duration?: string;
  equipment?: string[];
  client?: string;
};

const props = defineProps<{ sessions: Session[] }>();

const galleryContainer = ref<HTMLDivElement | null>(null);
let galleryRoot: Root | null = null;

onMounted(() => {
  if (galleryContainer.value) {
    galleryRoot = createRoot(galleryContainer.value);
    galleryRoot.render(
      <React.StrictMode>
        <ReactTailwindImageGalleryDemo />
      </React.StrictMode>,
    );
  }
});

onBeforeUnmount(() => {
  if (galleryRoot) {
    galleryRoot.unmount();
    galleryRoot = null;
  }
});
</script>

<template>
  <WebsiteLayout>
    <section id="corporate-events" class="min-h-screen bg-background">
      <div ref="galleryContainer" class="w-full h-full"></div>
    </section>

    <section class="bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Card class="max-w-3xl mx-auto">
          <CardHeader class="space-y-2 text-center">
            <CardTitle class="text-2xl">Next steps</CardTitle>
            <CardDescription>
              Share the brief, preferred dates, and distribution channels to receive a detailed shooting plan and quote.
            </CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/contact">Schedule consultation</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/services">View full service list</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  </WebsiteLayout>
</template>
