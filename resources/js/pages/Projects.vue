<script setup lang="ts">
import { computed, ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layers, Package, Camera, Users, Play, Search } from 'lucide-vue-next';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

type Project = {
  id: number;
  title: string;
  summary: string | null;
  category: string | null;
  year: number | null;
  featured: boolean;
  hero_image_url: string | null;
  case_study_video_url: string | null;
};

type ResourceCollection<T> = { data: T[] };

const props = defineProps<{ projects: Project[] | ResourceCollection<Project> }>();

const projects = computed<Project[]>(() => {
  const source = props.projects;
  if (Array.isArray(source)) {
    return source;
  }

  if (source && Array.isArray(source.data)) {
    return source.data;
  }

  return [];
});

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
</script>

<template>
  <WebsiteLayout>
    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="space-y-4 text-center">
          <Badge variant="secondary" class="mx-auto w-fit">Projects</Badge>
          <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">
            Selected work across software and media delivery
          </h1>
          <p class="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Engagements ranging from enterprise platforms to photography assignments, delivered with the same
            process-driven approach.
          </p>
        </div>
      </div>
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
        <div v-if="filteredProjects.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card v-for="project in filteredProjects" :key="project.id" class="overflow-hidden">
            <div v-if="project.hero_image_url" class="relative aspect-video w-full bg-muted">
              <img
                :src="project.hero_image_url"
                :alt="`Hero image for ${project.title}`"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <CardHeader class="space-y-3">
              <div class="flex items-center justify-between text-xs text-muted-foreground">
                <Badge variant="outline" class="capitalize">
                  {{ project.category ?? 'Uncategorized' }}
                </Badge>
                <span>{{ project.year ?? '—' }}</span>
              </div>
              <CardTitle class="text-lg">{{ project.title }}</CardTitle>
              <CardDescription>{{ project.summary ?? 'Case study coming soon.' }}</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4 text-sm text-muted-foreground">
              <div class="flex items-center justify-between">
                <span>{{ project.featured ? 'Featured case study' : 'Published engagement' }}</span>
                <Button size="sm" variant="outline" as-child>
                  <Link href="/contact">Discuss collaboration</Link>
                </Button>
              </div>
              <div v-if="project.case_study_video_url" class="space-y-2">
                <p class="flex items-center gap-2 font-medium text-foreground">
                  <Play class="h-4 w-4" /> Case study video
                </p>
                <video controls preload="metadata" class="h-40 w-full overflow-hidden rounded-md border bg-black">
                  <source :src="project.case_study_video_url" type="video/mp4" />
                  <source :src="project.case_study_video_url" type="video/quicktime" />
                  Your browser does not support the video tag.
                </video>
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
