<script setup lang="tsx">
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Link } from '@inertiajs/vue3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index';
import { Badge } from '@/components/ui/badge/index';
import { Button } from '@/components/ui/button/index';
import { Input } from '@/components/ui/input/index';
import { Calendar, Clock, Heart, Search, Play } from 'lucide-vue-next';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';
import MediaCarousel from '@/components/MediaCarousel.vue';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { GalleryPage } from '@/components/ui/gallery-demo';
import ArticleCardBlogDemo from '@/components/ui/card-23-blog-demo';

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

const galleryContainer = ref<HTMLDivElement | null>(null);
const articleCardContainer = ref<HTMLDivElement | null>(null);
let galleryRoot: Root | null = null;
let articleCardRoot: Root | null = null;

onMounted(() => {
  if (galleryContainer.value) {
    galleryRoot = createRoot(galleryContainer.value);
    galleryRoot.render(
      <React.StrictMode>
        <GalleryPage />
      </React.StrictMode>,
    );
  }
  if (articleCardContainer.value) {
    articleCardRoot = createRoot(articleCardContainer.value);
    articleCardRoot.render(
      <React.StrictMode>
        <ArticleCardBlogDemo posts={props.posts} />
      </React.StrictMode>,
    );
  }
});

onBeforeUnmount(() => {
  if (galleryRoot) {
    galleryRoot.unmount();
    galleryRoot = null;
  }
  if (articleCardRoot) {
    articleCardRoot.unmount();
    articleCardRoot = null;
  }
});

const posts = computed(() => props.posts || []);

const categories = computed(() => {
  if (!Array.isArray(posts.value)) {
    return [{ value: 'all', label: 'All posts' }];
  }

  const unique = Array.from(
    new Set(
      posts.value
        .map((post) => post.category)
        .filter((category): category is string => Boolean(category)),
    ),
  );

  return [{ value: 'all', label: 'All posts' }].concat(
    unique.map((category) => ({ value: category, label: category })),
  );
});

const selectedCategory = ref('all');
const query = ref('');

const filteredPosts = computed(() => {
  if (!Array.isArray(posts.value)) {
    return [];
  }

  return posts.value.filter((post) => {
    const matchesCategory =
      selectedCategory.value === 'all' || post.category === selectedCategory.value;
    const matchesQuery = query.value
      ? [post.title, post.summary ?? '']
          .join(' ')
          .toLowerCase()
          .includes(query.value.toLowerCase())
      : true;
    return matchesCategory && matchesQuery;
  });
});

// Watch for changes in filteredPosts and re-render React component
watch(filteredPosts, (newPosts) => {
  if (articleCardContainer.value && articleCardRoot) {
    articleCardRoot.render(
      <React.StrictMode>
        <ArticleCardBlogDemo posts={newPosts} />
      </React.StrictMode>,
    );
  }
});

const formatDate = (value: string | null) => {
  if (!value) {
    return 'Unscheduled';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

const getPostMedia = (post: Post) => {
  const slides: { id: string | number; url: string; kind: 'image' | 'video' }[] = [];

  if (post.gallery?.length) {
    slides.push(
      ...post.gallery.map((asset) => ({
        id: `gallery-${asset.id}`,
        url: asset.url,
        kind: asset.kind,
      })),
    );
  }

  if (post.cover_image_url && !slides.some((asset) => asset.kind === 'image' && asset.url === post.cover_image_url)) {
    slides.push({ id: `cover-${post.id}`, url: post.cover_image_url, kind: 'image' });
  }

  if (post.feature_video_url && !slides.some((asset) => asset.kind === 'video' && asset.url === post.feature_video_url)) {
    slides.push({ id: `video-${post.id}`, url: post.feature_video_url, kind: 'video' });
  }

  return slides;
};
</script>

<template>
  <WebsiteLayout>
    <section id="blog" class="border-b bg-background">
      <div ref="galleryContainer" class="w-full"></div>
    </section>

    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div class="flex flex-1 items-center gap-3">
            <div class="relative w-full md:w-64">
              <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input v-model="query" placeholder="Search posts" class="pl-9" />
            </div>
            <span class="text-sm text-muted-foreground">{{ filteredPosts.length }} results</span>
          </div>
          <div class="flex flex-wrap gap-2">
            <Button
              v-for="category in categories"
              :key="category.value"
              size="sm"
              :variant="selectedCategory === category.value ? 'default' : 'outline'"
              class="capitalize"
              @click="selectedCategory = category.value"
            >
              {{ category.label }}
            </Button>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-background">
      <div ref="articleCardContainer" class="w-full">
        <!-- Article Cards component will be mounted here -->
      </div>
    </section>

    <section class="bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Card class="max-w-3xl mx-auto">
          <CardHeader class="space-y-2 text-center">
            <CardTitle class="text-2xl">Stay in touch</CardTitle>
            <CardDescription>
              Receive a quarterly summary of published articles and upcoming projects.
            </CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Input placeholder="you@email.com" class="sm:w-60" />
            <Button>Subscribe</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  </WebsiteLayout>
</template>
