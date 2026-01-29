<script setup lang="tsx">
import { Link } from '@inertiajs/vue3';
import { Layers, Package, Camera, Users, Search } from 'lucide-vue-next';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import HeroAsciiOneWrapper from '@/components/HeroAsciiOneWrapper.vue';
import ProjectTimelineWrapper from '@/components/ProjectTimelineWrapper.vue';
import ArticleCardProjectsDemo from '@/components/ui/card-23-projects-demo';
import UsedTechnologiesWrapper from '@/components/UsedTechnologiesWrapper.vue';
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

    <section id="project-timeline" class="py-20 bg-black border-y border-neutral-900">
      <div class="container mx-auto px-4 mb-24 font-mono">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/10 pb-12">
          <div class="max-w-2xl">
            <div class="flex items-center gap-2 text-white/30 text-[10px] tracking-[0.4em] uppercase mb-4">
              <span class="w-2 h-2 bg-blue-500/50"></span>
              DEPLOYMENT_HISTORY.V3
            </div>
            <h2 class="text-2xl md:text-4xl font-bold tracking-tighter text-white uppercase leading-none">Project Evolution</h2>
          </div>
          <div class="flex flex-col gap-2 text-right opacity-30 text-[9px] tracking-[0.2em] uppercase shrink-0">
            <span>NODE_IDENTIFIER / 0X7F</span>
            <span>TIMELINE_STATUS / RECONSTRUCTED</span>
            <div class="h-px w-full bg-white/20 mt-2"></div>
          </div>
        </div>
        <p class="text-gray-500 mt-8 text-sm tracking-wide max-w-xl">
          A granular record of architectural milestones and technical deployments.
        </p>
      </div>
      <ProjectTimelineWrapper />
    </section>

    <UsedTechnologiesWrapper />

    <section id="featured-projects" class="py-24 bg-black border-y border-white/5 font-mono">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-12">
          {/* Main Controls Header */}
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
            <div>
              <div class="flex items-center gap-3 text-white/40 text-[10px] tracking-[0.4em] uppercase mb-3">
                <span class="w-1.5 h-1.5 bg-white/40"></span>
                // PROJECT_REPOSITORY
              </div>
              <h2 class="text-2xl md:text-4xl font-bold tracking-tighter text-white uppercase">Archive</h2>
            </div>
            
            <div class="flex flex-col gap-2 min-w-[220px]">
              <div class="relative group">
                <div class="absolute -left-2 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-white opacity-20 group-focus-within:opacity-100 transition-opacity"></div>
                <Search class="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-white/30" />
                <input 
                  v-model="query" 
                  placeholder="[SEARCH_QUERY]" 
                  class="w-full bg-white/[0.02] border border-white/10 pl-8 pr-3 py-1.5 text-[10px] text-white focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/20 uppercase tracking-[0.1em] font-bold"
                />
              </div>
              <div class="flex justify-between items-center text-[8px] tracking-[0.2em] text-white/30 uppercase">
                <span>STATUS / ACTIVE</span>
                <span class="text-white">PTR / {{ filteredProjects.length }}_LOGS</span>
              </div>
            </div>
          </div>

          {/* Technical Category Tabs */}
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 border-l border-t border-white/10 shadow-2xl">
            <button 
              v-for="category in projectsCategories" 
              :key="category.value"
              @click="selectedCategory = category.value"
              :class="[
                'flex flex-col items-center justify-center gap-1.5 px-2 py-2 text-[8px] tracking-[0.1em] font-bold uppercase transition-all relative group border-r border-b border-white/10',
                selectedCategory === category.value 
                  ? 'bg-white text-black' 
                  : 'bg-black text-white/30 hover:text-white hover:bg-white/[0.01]'
              ]"
            >
              <component :is="category.icon" :class="['h-3.5 w-3.5', selectedCategory === category.value ? 'text-black' : 'text-white/20 group-hover:text-white transition-colors']" />
              <span class="text-center">{{ category.label }}</span>
              <div v-if="selectedCategory === category.value" class="absolute inset-x-0 bottom-0 h-1 bg-black/10"></div>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section id="mobile-solutions" class="bg-background">
      <div ref="articleCardContainer" class="w-full">
        <!-- Article Cards component will be mounted here -->
      </div>
    </section>

    <section id="system-architecture" class="py-32 bg-black border-t border-white/5 font-mono">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative p-12 md:p-20 border border-white/10 bg-white/[0.02] overflow-hidden group">
          {/* Background Accents */}
          <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[120px] pointer-events-none"></div>
          <div class="absolute -bottom-8 -left-8 w-32 h-32 border border-white/5 rotate-45 pointer-events-none"></div>
          
          <div class="relative z-10 max-w-3xl mx-auto text-center">
            <div class="inline-flex items-center gap-2 mb-6 text-white/30 text-[10px] tracking-[0.4em] uppercase">
              <span class="w-1 h-1 bg-white animate-pulse"></span>
              INIT_ENGAGEMENT_SEQUENCE
            </div>
            <h2 class="text-3xl md:text-5xl font-bold tracking-tighter text-white uppercase mb-6">Plan your next engagement</h2>
            <p class="text-gray-500 text-sm md:text-base tracking-wide leading-relaxed mb-12">
              Share objectives and timelines to receive a structured proposal covering delivery approach, resource allocation, and projected costs.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact" class="w-full sm:w-auto px-10 py-4 bg-white text-black text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white/90 transition-colors text-center">
                [START_PROJECT]
              </Link>
              <Link href="/services" class="w-full sm:w-auto px-10 py-4 border border-white/20 text-white text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white/5 transition-colors text-center">
                // REVIEW_SERVICES
              </Link>
            </div>
          </div>

          {/* Technical Notations */}
          <div class="absolute top-4 left-6 text-[8px] text-white/10 tracking-widest uppercase">
            ESTABLISH_CONNECTION_REF_402
          </div>
          <div class="absolute bottom-4 right-6 text-[8px] text-white/10 tracking-widest uppercase">
            © 2026 / SYSTEM_ARCHITECT
          </div>
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
