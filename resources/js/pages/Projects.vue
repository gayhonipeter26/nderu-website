<script setup lang="tsx">
import { Link } from '@inertiajs/vue3';
import { Layers, Package, Camera, Users, Search } from 'lucide-vue-next';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import HeroAsciiOneWrapper from '@/components/HeroAsciiOneWrapper.vue';
import { Button } from '@/components/ui/button/index';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index';
import ArticleCardProjectsDemo from '@/components/ui/card-23-projects-demo';
import { Input } from '@/components/ui/input/index';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';


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


const articleCardContainer = ref<HTMLDivElement | null>(null);
let articleCardRoot: Root | null = null;

onMounted(() => {
  if (articleCardContainer.value) {
    articleCardRoot = createRoot(articleCardContainer.value);
    articleCardRoot.render(
      <React.StrictMode>
        <ArticleCardProjectsDemo projects={filteredProjects.value} />
      </React.StrictMode>,
    );
  }
});

// Watch for changes in filteredProjects and re-render React component
watch(filteredProjects, (newProjects) => {
  if (articleCardContainer.value && articleCardRoot) {
    articleCardRoot.render(
      <React.StrictMode>
        <ArticleCardProjectsDemo projects={newProjects} />
      </React.StrictMode>,
    );
  }
});

onBeforeUnmount(() => {
  if (articleCardRoot) {
    articleCardRoot.unmount();
    articleCardRoot = null;
  }
});
</script>

<template>
  <WebsiteLayout>
    <section id="hero-animation" class="w-full">
      <HeroAsciiOneWrapper />
    </section>


    <section id="featured-projects" class="border-b bg-background">
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
            <Button v-for="category in projectsCategories" :key="category.value" size="sm"
              :variant="selectedCategory === category.value ? 'default' : 'outline'" class="capitalize"
              @click="selectedCategory = category.value">
              <component :is="category.icon" class="mr-2 h-4 w-4" />
              {{ category.label }}
            </Button>
          </div>
        </div>
      </div>
    </section>

    <section id="mobile-solutions" class="bg-background">
      <div ref="articleCardContainer" class="w-full">
        <!-- Article Cards component will be mounted here -->
      </div>
    </section>

    <section id="system-architecture" class="bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Card class="max-w-3xl mx-auto">
          <CardHeader class="space-y-2 text-center">
            <CardTitle class="text-2xl">Plan your next engagement</CardTitle>
            <CardDescription>
              Share objectives and timelines to receive a structured proposal covering delivery approach and costs.
            </CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/contact">Start a project</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/services">Review services</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  </WebsiteLayout>
</template>
