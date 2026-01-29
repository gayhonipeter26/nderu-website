<script setup lang="tsx">
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ContactCardWrapper from '@/components/ContactCardWrapper.vue';
import PhotographyProfileHeaderWrapper from '@/components/PhotographyProfileHeaderWrapper.vue';
import ReactTailwindImageGalleryDemo from '@/components/ui/react-tailwind-image-gallery-demo';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

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

defineProps<{ sessions: Session[] }>();

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
    <section id="profile-header" class="w-full">
      <PhotographyProfileHeaderWrapper banner-image="/assets/photos/profile.jpg"
        profile-image="/assets/photos/profile.jpg" :social-links="{
          tiktok: 'https://www.tiktok.com/@shutterbebz_254?_r=1&_t=ZS-93SHWHK7SgH',
          instagram: 'https://www.instagram.com/shutterbebz_254?igsh=MWcyZnRkbmE1dWJoYg==',
          threads: 'https://www.threads.com/@shutterbebz_254'
        }" />
    </section>


    <section id="corporate-events" class="min-h-screen bg-background pt-20">
      <div ref="galleryContainer" class="w-full h-full"></div>
    </section>

    <section class="bg-background py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <ContactCardWrapper type="photography" />
      </div>
    </section>
  </WebsiteLayout>
</template>
