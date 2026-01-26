<script setup lang="tsx">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
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
let galleryRoot: Root | null = null;

onMounted(() => {
  if (galleryContainer.value) {
    galleryRoot = createRoot(galleryContainer.value);
    galleryRoot.render(
      <React.StrictMode>
        <GalleryPage />
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
    <section class="border-b bg-background">
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
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid auto-rows-fr gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card v-for="post in filteredPosts" :key="post.id" class="flex h-full min-h-[420px] flex-col overflow-hidden text-sm">
            <div v-if="post.cover_image_url" class="relative aspect-video w-full bg-muted">
              <img
                :src="post.cover_image_url"
                :alt="post.title"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div v-else class="relative aspect-video w-full bg-muted flex items-center justify-center">
              <span class="text-muted-foreground">No image</span>
            </div>
            <CardHeader class="flex flex-col gap-2 p-4 pb-3">
              <div class="flex items-center justify-between text-xs text-muted-foreground">
                <div class="flex items-center gap-2">
                  <Badge v-if="post.category" variant="outline" class="capitalize">
                    {{ post.category }}
                  </Badge>
                  <Badge v-if="post.featured" variant="default" class="text-xs">
                    Featured
                  </Badge>
                </div>
                <div class="flex items-center gap-2">
                  <span v-if="post.gallery_count" class="flex items-center gap-1">
                    <Package class="h-3 w-3" />
                    {{ post.gallery_count }}
                  </span>
                </div>
              </div>
              <CardTitle class="text-base">{{ post.title }}</CardTitle>
              <CardDescription class="line-clamp-2 text-xs">{{ post.summary || 'Summary coming soon.' }}</CardDescription>
              <div v-if="post.author" class="text-xs text-muted-foreground">
                By {{ post.author }}
              </div>
              <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-1 mt-2">
                <Badge v-for="tag in post.tags.slice(0, 3)" :key="tag" variant="secondary" class="text-[10px] px-1.5 py-0.5">
                  {{ tag }}
                </Badge>
                <Badge v-if="post.tags.length > 3" variant="secondary" class="text-[10px] px-1.5 py-0.5">
                  +{{ post.tags.length - 3 }}
                </Badge>
              </div>
            </CardHeader>
            <CardContent class="flex flex-1 flex-col justify-between gap-3 p-4 pt-0 text-xs text-muted-foreground">
              <div class="space-y-3">
                <div v-if="post.feature_video_url" class="space-y-2">
                  <p class="flex items-center gap-2 font-medium text-foreground">
                    <Play class="h-4 w-4" /> Feature video
                  </p>
                  <div class="overflow-hidden rounded-md border bg-black">
                    <video controls preload="metadata" class="aspect-video h-full w-full">
                      <source :src="post.feature_video_url" type="video/mp4" />
                      <source :src="post.feature_video_url" type="video/quicktime" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between pt-2 text-[11px] text-muted-foreground">
                <Link :href="`/blog/${post.slug}`" class="inline-flex">
                  <Badge variant="secondary" class="gap-1 px-2.5 py-1 text-[11px]">
                    Read article
                  </Badge>
                </Link>
                <span class="flex items-center gap-1">
                  <Heart class="h-3.5 w-3.5 text-rose-500" />
                  {{ post.likes_count || 0 }}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div v-if="filteredPosts.length === 0" class="text-center py-16">
          <p class="text-sm text-muted-foreground">No posts match the current search.</p>
          <Button variant="outline" class="mt-4" @click="selectedCategory = 'all'; query = ''">
            Clear search
          </Button>
        </div>
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
