<script setup lang="tsx">
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import BlogHeroYoutubeWrapper from '@/components/BlogHeroYoutubeWrapper.vue';
import ContactCardWrapper from '@/components/ContactCardWrapper.vue';
import { YoutubeContentSections } from '@/components/ui/youtube-content-sections';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

type Post = {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  reading_time: string | null;
  published_at: string | null;
  cover_image_url: string | null;
  feature_video_url: string | null;
  status: string;
  likes_count: number;
  gallery_count?: number;
  created_at?: string;
  updated_at: string;
  category?: string;
  tags?: string[];
  author?: string;
  featured?: boolean;
  gallery?: { id: number | string; url: string; kind: 'image' | 'video' }[];
};

const props = defineProps<{ posts: Post[] }>();

const contentSectionsContainer = ref<HTMLDivElement | null>(null);
let contentSectionsRoot: Root | null = null;

onMounted(() => {
  if (contentSectionsContainer.value) {
    contentSectionsRoot = createRoot(contentSectionsContainer.value);
    contentSectionsRoot.render(
      <React.StrictMode>
        <YoutubeContentSections posts={props.posts} />
      </React.StrictMode>,
    );
  }
});

onBeforeUnmount(() => {
  if (contentSectionsRoot) {
    contentSectionsRoot.unmount();
    contentSectionsRoot = null;
  }
});

const posts = computed(() => props.posts || []);

</script>

<template>
  <WebsiteLayout>
    <section id="blog-hero" class="border-b bg-background">
      <BlogHeroYoutubeWrapper />
    </section>

    <!-- YouTube-Style Content Sections -->
    <div ref="contentSectionsContainer" class="w-full"></div>

    <section class="bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div class="max-w-3xl mx-auto">
          <ContactCardWrapper type="secure-gateway" />
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
