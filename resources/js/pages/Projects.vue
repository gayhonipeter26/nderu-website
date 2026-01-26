<script setup lang="tsx">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { Link } from '@inertiajs/vue3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layers, Package, Camera, Users, Play, Search, Heart } from 'lucide-vue-next';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';
import MediaCarousel from '@/components/MediaCarousel.vue';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import StackFeatureSectionDemo from '@/components/ui/stack-feature-section-demo';

type Project = {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  category: string | null;
  year: number | null;
  featured: boolean;
  hero_image_url: string | null;
  case_study_video_url: string | null;
  likes_count: number;
  gallery_count?: number;
  created_at?: string;
  updated_at: string;
  technologies?: string[];
  client?: string;
  project_type?: string;
  completion_date?: string;
  meta?: Record<string, unknown> | null;
  gallery?: { id: number | string; url: string; kind: 'image' | 'video' }[];
};

const props = defineProps<{ projects: Project[] }>();

const projects = computed(() => props.projects || []);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-');

const categoryIcons: Record<string, any> = {
  design: Camera,
  photography: Camera,
  media: Camera,
  systems: Package,
  'web-apps': Layers,
  engineering: Layers,
  consulting: Users,
};

const projectsCategories = computed(() => {
  if (!Array.isArray(projects.value)) {
    return [{ value: 'all', label: 'All projects', icon: Layers }];
  }

  const uniqueLabels = Array.from(
    new Set(
      projects.value
        .map((project) => project.category?.trim())
        .filter((label): label is string => Boolean(label)),
    ),
  );

  return [{ value: 'all', label: 'All projects', icon: Layers }].concat(
    uniqueLabels.map((label) => {
      const value = slugify(label);
      const icon = Object.entries(categoryIcons).find(([key]) => value.includes(key))?.[1] ?? Layers;
      return { value, label, icon };
    }),
  );
});

const selectedCategory = ref('all');
const query = ref('');

const filteredProjects = computed(() => {
  if (!Array.isArray(projects.value)) {
    return [];
  }
  
  return projects.value.filter((project) => {
    const categoryValue = project.category ? slugify(project.category) : null;
    const matchesCategory =
      selectedCategory.value === 'all' || categoryValue === selectedCategory.value;
    const matchesQuery = query.value
      ? [project.title, project.summary ?? '']
          .join(' ')
          .toLowerCase()
          .includes(query.value.toLowerCase())
      : true;
    return matchesCategory && matchesQuery;
  });
});

const getProjectMedia = (project: Project) => {
  const slides: { id: string | number; url: string; kind: 'image' | 'video' }[] = [];

  if (project.gallery?.length) {
    slides.push(
      ...project.gallery.map((asset) => ({
        id: `gallery-${asset.id}`,
        url: asset.url,
        kind: asset.kind,
      })),
    );
  }

  if (project.hero_image_url && !slides.some((asset) => asset.kind === 'image' && asset.url === project.hero_image_url)) {
    slides.push({ id: `hero-${project.id}`, url: project.hero_image_url, kind: 'image' });
  }

  if (project.case_study_video_url && !slides.some((asset) => asset.kind === 'video' && asset.url === project.case_study_video_url)) {
    slides.push({ id: `case-video-${project.id}`, url: project.case_study_video_url, kind: 'video' });
  }

  return slides;
};

const marqueeContainer = ref<HTMLDivElement | null>(null);
let marqueeRoot: Root | null = null;

onMounted(() => {
  if (marqueeContainer.value) {
    marqueeRoot = createRoot(marqueeContainer.value);
    marqueeRoot.render(
      <React.StrictMode>
        <StackFeatureSectionDemo />
      </React.StrictMode>,
    );
  }
});

onBeforeUnmount(() => {
  if (marqueeRoot) {
    marqueeRoot.unmount();
    marqueeRoot = null;
  }
});
</script>

<template>
  <WebsiteLayout>
    <section class="border-b bg-background">
      <div ref="marqueeContainer" class="w-full"></div>
    </section>

    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div class="flex flex-1 items-center gap-3">
            <div class="relative w-full md:w-64">
              <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input v-model="query" placeholder="Search projects" class="pl-9" />
            </div>
            <span class="text-sm text-muted-foreground">{{ filteredProjects.length }} results</span>
          </div>
          <div class="flex flex-wrap gap-2">
            <Button
              v-for="category in projectsCategories"
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
        <div v-if="filteredProjects.length" class="grid auto-rows-fr gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card
            v-for="project in filteredProjects"
            :key="project.id"
            class="flex h-full min-h-[420px] flex-col overflow-hidden text-sm"
          >
            <div v-if="project.hero_image_url" class="relative aspect-video w-full bg-muted">
              <img
                :src="project.hero_image_url"
                :alt="project.title"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div v-else class="relative aspect-video w-full bg-muted flex items-center justify-center">
              <span class="text-muted-foreground">No image</span>
            </div>
            <CardHeader class="flex flex-col gap-2 p-4 pb-3">
              <div class="flex items-center justify-between text-xs text-muted-foreground">
                <Badge variant="outline" class="capitalize">
                  {{ project.category || 'Uncategorized' }}
                </Badge>
                <div class="flex items-center gap-2">
                  <span>{{ project.year || '—' }}</span>
                  <span v-if="project.gallery_count" class="flex items-center gap-1">
                    <Package class="h-3 w-3" />
                    {{ project.gallery_count }}
                  </span>
                </div>
              </div>
              <CardTitle class="text-base">{{ project.title }}</CardTitle>
              <CardDescription class="line-clamp-2 text-xs">
                {{ project.summary || 'Project summary coming soon.' }}
              </CardDescription>
              <div v-if="project.client" class="text-xs text-muted-foreground">
                Client: {{ project.client }}
              </div>
              <div v-if="project.technologies && project.technologies.length > 0" class="flex flex-wrap gap-1 mt-2">
                <Badge v-for="tech in project.technologies.slice(0, 3)" :key="tech" variant="secondary" class="text-[10px] px-1.5 py-0.5">
                  {{ tech }}
                </Badge>
                <Badge v-if="project.technologies.length > 3" variant="secondary" class="text-[10px] px-1.5 py-0.5">
                  +{{ project.technologies.length - 3 }}
                </Badge>
              </div>
            </CardHeader>
            <CardContent class="flex flex-1 flex-col justify-between gap-3 p-4 pt-0 text-xs text-muted-foreground">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span>{{ project.featured ? 'Featured' : 'Published' }}</span>
                  <Button size="sm" variant="outline" as-child>
                    <Link :href="`/projects/${project.slug}`">View Details</Link>
                  </Button>
                </div>
              </div>
              <div class="flex items-center justify-between pt-2 text-[11px] text-muted-foreground">
                <span class="flex items-center gap-1">
                  <Heart class="h-3.5 w-3.5 text-rose-500" />
                  {{ project.likes_count || 0 }}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div v-if="filteredProjects.length === 0" class="text-center py-16">
          <p class="text-sm text-muted-foreground">No projects match the selected filters.</p>
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
            <CardTitle class="text-2xl">Plan your next engagement</CardTitle>
            <CardDescription>
              Share objectives and timelines to receive a structured proposal covering delivery approach and costs.
            </CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button as-child>
              <Link href="/contact">Start a project</Link>
            </Button>
            <Button variant="outline" as-child>
              <Link href="/services">Review services</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  </WebsiteLayout>
</template>
