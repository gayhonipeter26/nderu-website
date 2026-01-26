<script setup lang="tsx">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { Link } from '@inertiajs/vue3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index';
import { Badge } from '@/components/ui/badge/index';
import { Button } from '@/components/ui/button/index';
import { Input } from '@/components/ui/input/index';
import { Camera, Users, Package, Calendar, MapPin, Play, Search, Heart } from 'lucide-vue-next';
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

const sessions = computed(() => props.sessions || []);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-');

const categories = computed(() => {
  if (!Array.isArray(sessions.value)) {
    return [{ value: 'all', label: 'All work', icon: Camera }];
  }

  const statusIcons: Record<string, any> = {
    published: Users,
    draft: Package,
  };

  const uniqueStatuses = Array.from(
    new Set(
      sessions.value
        .map((session) => session.status)
        .filter((status): status is Session['status'] => Boolean(status)),
    ),
  );

  return [{ value: 'all', label: 'All work', icon: Camera }].concat(
    uniqueStatuses.map((status) => {
      const value = slugify(status);
      return {
        value,
        label: status,
        icon: statusIcons[value] ?? MapPin,
      };
    }),
  );
});

const selectedCategory = ref('all');
const query = ref('');

const filteredSessions = computed(() => {
  if (!Array.isArray(sessions.value)) {
    return [];
  }

  return sessions.value.filter((session) => {
    const statusValue = session.status ? slugify(session.status) : null;
    const matchesStatus =
      selectedCategory.value === 'all' || statusValue === selectedCategory.value;
    const matchesQuery = query.value
      ? [session.title, session.summary ?? '', session.location ?? '']
          .join(' ')
          .toLowerCase()
          .includes(query.value.toLowerCase())
      : true;
    return matchesStatus && matchesQuery;
  });
});

const arcContainer = ref<HTMLDivElement | null>(null);
const galleryContainer = ref<HTMLDivElement | null>(null);
let arcRoot: Root | null = null;
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
    <section class="border-b bg-background">
      <div ref="galleryContainer" class="w-full"></div>
    </section>

    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div class="flex flex-1 items-center gap-3">
            <div class="relative w-full md:w-64">
              <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input v-model="query" placeholder="Search sessions" class="pl-9" />
            </div>
            <span class="text-sm text-muted-foreground">{{ filteredSessions.length }} results</span>
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
              <component :is="category.icon" class="mr-2 h-4 w-4" />
              {{ category.label }}
            </Button>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div v-if="filteredSessions.length" class="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card v-for="session in filteredSessions" :key="session.id" class="flex h-full flex-col overflow-hidden">
            <div v-if="session.hero_image_url" class="relative aspect-video w-full bg-muted">
              <img
                :src="session.hero_image_url"
                :alt="session.title"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div v-else class="relative aspect-video w-full bg-muted flex items-center justify-center">
              <span class="text-muted-foreground">No image</span>
            </div>
            <CardHeader class="flex flex-col gap-3">
              <div class="flex items-center justify-between text-xs text-muted-foreground">
                <span class="flex items-center gap-1">
                  <MapPin class="h-3.5 w-3.5" />
                  {{ session.location || 'Location TBC' }}
                </span>
                <span class="flex items-center gap-1">
                  <Calendar class="h-3.5 w-3.5" />
                  {{ session.scheduled_at || 'Unscheduled' }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <CardTitle class="text-lg">{{ session.title }}</CardTitle>
                <Badge :variant="session.status === 'Published' ? 'default' : 'outline'" class="text-xs capitalize">
                  {{ session.status }}
                </Badge>
              </div>
              <CardDescription class="line-clamp-3">{{ session.summary || 'Session summary coming soon.' }}</CardDescription>
            </CardHeader>
            <CardContent class="flex flex-1 flex-col justify-between space-y-4 text-sm text-muted-foreground">
              <div class="space-y-4">
                <div v-if="session.client" class="rounded-md border bg-muted/30 px-3 py-2">
                  <p class="font-medium text-foreground">Client</p>
                  <p>{{ session.client }}</p>
                </div>
                <div v-if="session.session_type" class="rounded-md border bg-muted/30 px-3 py-2">
                  <p class="font-medium text-foreground">Session Type</p>
                  <p>{{ session.session_type }}</p>
                </div>
                <div v-if="session.duration" class="rounded-md border bg-muted/30 px-3 py-2">
                  <p class="font-medium text-foreground">Duration</p>
                  <p>{{ session.duration }}</p>
                </div>
                <div class="rounded-md border bg-muted/30 px-3 py-2">
                  <p class="font-medium text-foreground">Deliverables planned</p>
                  <p>{{ session.deliverables_count || 0 }} items</p>
                </div>
                <div v-if="session.equipment && session.equipment.length > 0" class="rounded-md border bg-muted/30 px-3 py-2">
                  <p class="font-medium text-foreground">Equipment Used</p>
                  <div class="flex flex-wrap gap-1 mt-1">
                    <Badge v-for="item in session.equipment.slice(0, 3)" :key="item" variant="secondary" class="text-[10px] px-1.5 py-0.5">
                      {{ item }}
                    </Badge>
                    <Badge v-if="session.equipment.length > 3" variant="secondary" class="text-[10px] px-1.5 py-0.5">
                      +{{ session.equipment.length - 3 }}
                    </Badge>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                <Link :href="`/photography/${session.slug}`" class="inline-flex">
                  <Badge variant="secondary" class="gap-1 px-3 py-1 font-medium text-xs">
                    View gallery
                  </Badge>
                </Link>
                <span class="flex items-center gap-1">
                  <Heart class="h-3.5 w-3.5 text-rose-500" />
                  {{ session.likes_count || 0 }}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div v-else class="py-16 text-center">
          <p class="text-sm text-muted-foreground">No sessions match the selected filters.</p>
          <Button variant="outline" class="mt-4" @click="selectedCategory = 'all'; query = ''">
            Reset filters
          </Button>
        </div>
      </div>
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
            <Button as-child>
              <Link href="/contact">Schedule consultation</Link>
            </Button>
            <Button variant="outline" as-child>
              <Link href="/services">View full service list</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  </WebsiteLayout>
</template>
