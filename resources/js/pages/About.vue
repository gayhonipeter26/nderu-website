<script setup lang="tsx">
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { AboutMeScrollingContent } from '@/components/ui/about-me-scrolly-sections';
import { Demo as AgentPlanDemo } from '@/components/ui/agent-plan-demo';
import { InstagramCtaSections } from '@/components/ui/instagram-cta-sections';
import { InstagramProfileHeader } from '@/components/ui/instagram-profile-header';
import { LogoCloud } from '@/components/ui/logo-cloud-2';
import DocumentationAndCertifications from '@/components/ui/scroll-area-demo';
import { StoryViewerDemo } from '@/components/ui/story-viewer-demo';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

const profileHeaderContainer = ref<HTMLDivElement | null>(null);
const scrollyContentContainer = ref<HTMLDivElement | null>(null);
const logoCloudContainer = ref<HTMLElement | null>(null);
const timelineContainer = ref<HTMLDivElement | null>(null);
const docsContainer = ref<HTMLElement | null>(null);
const ctaContainer = ref<HTMLDivElement | null>(null);

const activeTab = ref('about');

let profileHeaderRoot: Root | null = null;
let scrollyContentRoot: Root | null = null;
let logoCloudRoot: Root | null = null;
let timelineRoot: Root | null = null;
let docsRoot: Root | null = null;
let ctaRoot: Root | null = null;

const renderProfileHeader = () => {
  if (profileHeaderContainer.value) {
    if (!profileHeaderRoot) {
      profileHeaderRoot = createRoot(profileHeaderContainer.value);
    }
    profileHeaderRoot.render(
      <React.StrictMode>
        <InstagramProfileHeader
          name="Nderu.ke"
          username="nderu_ke"
          avatarUrl="/images/profile.jpg"
          bio="Builder of Practical Systems. Software engineer designing HMS, POS & Workflow-driven tools."
          activeTab={activeTab.value}
          onTabChange={(tab) => {
            activeTab.value = tab;
          }}
        >
          <StoryViewerDemo />
        </InstagramProfileHeader>
      </React.StrictMode>
    );
  }
};

onMounted(() => {
  renderProfileHeader();

  if (scrollyContentContainer.value) {
    scrollyContentRoot = createRoot(scrollyContentContainer.value);
    scrollyContentRoot.render(
      <React.StrictMode>
        <AboutMeScrollingContent />
      </React.StrictMode>
    );
  }

  if (logoCloudContainer.value) {
    logoCloudRoot = createRoot(logoCloudContainer.value);
    logoCloudRoot.render(
      <React.StrictMode>
        <LogoCloud />
      </React.StrictMode>
    );
  }

  if (timelineContainer.value) {
    timelineRoot = createRoot(timelineContainer.value);
    timelineRoot.render(
      <React.StrictMode>
        <AgentPlanDemo />
      </React.StrictMode>
    );
  }

  if (docsContainer.value) {
    docsRoot = createRoot(docsContainer.value);
    docsRoot.render(
      <React.StrictMode>
        <DocumentationAndCertifications />
      </React.StrictMode>
    );
  }

  if (ctaContainer.value) {
    ctaRoot = createRoot(ctaContainer.value);
    ctaRoot.render(
      <React.StrictMode>
        <InstagramCtaSections />
      </React.StrictMode>
    );
  }
});

watch(activeTab, () => {
  renderProfileHeader();
});

onBeforeUnmount(() => {
  [profileHeaderRoot, scrollyContentRoot, logoCloudRoot, timelineRoot, docsRoot, ctaRoot].forEach(root => root?.unmount());
});
</script>

<template>
  <WebsiteLayout>
    <!-- Instagram Hero Section -->
    <section class="bg-background border-b border-border/40">
      <div ref="profileHeaderContainer" class="w-full"></div>
    </section>

    <!-- Main Content Section: Sticky Sidebar Layout -->
    <section v-show="activeTab === 'about'" class="bg-background relative">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row gap-0">

          <!-- Left Sidebar (Sticky) -->
          <aside
            class="lg:w-1/3 lg:h-fit lg:sticky lg:top-24 py-16 lg:py-24 border-r border-border/40 lg:pr-12 lg:self-start z-10 bg-background">
            <div class="space-y-10">
              <div class="space-y-4">
                <h2 class="text-sm font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                  <div class="size-2 bg-primary animate-pulse rounded-full" />
                  Primary Profile
                </h2>
                <h1 class="text-3xl lg:text-3xl font-bold tracking-tight text-foreground leading-tight">
                  About Me — Software Engineer & Photographer
                </h1>
              </div>

              <div class="space-y-6 text-muted-foreground leading-relaxed text-base font-medium">
                <p>
                  I’m a software engineer and photographer who builds practical systems and captures real moments.
                  Whether I’m designing software or framing a shot, my focus is the same: clarity, purpose, and
                  real-world impact.
                </p>
              </div>

              <div class="pt-8 border-t border-border/40">
                <div class="flex flex-col gap-4">
                  <div class="flex items-center gap-3 text-sm">
                    <span class="font-bold text-foreground w-24">Location</span>
                    <span class="text-muted-foreground">Nairobi, Kenya</span>
                  </div>
                  <div class="flex items-center gap-3 text-sm">
                    <span class="font-bold text-foreground w-24">Focus</span>
                    <span class="text-muted-foreground">HMS / POS / SaaS</span>
                  </div>
                  <div class="flex items-center gap-3 text-sm">
                    <span class="font-bold text-foreground w-24">Status</span>
                    <span class="flex items-center gap-2 text-muted-foreground">
                      <span class="size-2 bg-green-500 rounded-full" />
                      Available for projects
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <!-- Right Content (Scrollable) -->
          <main class="lg:w-2/3 min-h-[50vh]">
            <div ref="scrollyContentContainer" class="w-full"></div>
          </main>
        </div>
      </div>
    </section>

    <!-- Resources Shared Section -->
    <section v-show="activeTab === 'about' || activeTab === 'philosophy'"
      class="bg-background border-y border-border/40 relative overflow-hidden">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="flex flex-col gap-32">
          <!-- Technical Stack -->
          <div class="space-y-12">
            <div class="space-y-4 text-center">
              <h2 class="text-sm font-bold uppercase tracking-[0.2em] text-primary">Technical Stack</h2>
              <h3 class="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Core Competencies</h3>
            </div>
            <div ref="logoCloudContainer" class="w-full"></div>
          </div>

          <!-- Resources & Assets -->
          <div class="space-y-12">
            <div class="space-y-4 text-center">
              <h2 class="text-sm font-bold uppercase tracking-[0.2em] text-primary">Verification</h2>
              <h3 class="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Resources & Assets</h3>
            </div>
            <div ref="docsContainer" class="w-full"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Career Timeline Section -->
    <section v-show="activeTab === 'about' || activeTab === 'trajectory'" class="bg-background py-24">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-12 mb-16 text-center lg:text-left">
          <div class="space-y-4">
            <h2 class="text-sm font-bold uppercase tracking-[0.2em] text-primary">Trajectory</h2>
            <h3 class="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Professional Journey</h3>
          </div>
        </div>
        <div ref="timelineContainer" class="w-full h-[600px] md:h-[800px]"></div>
      </div>
    </section>

    <!-- Footer CTA Section -->
    <div ref="ctaContainer" class="w-full"></div>

  </WebsiteLayout>
</template>

<style scoped>
:deep(.no-scrollbar::-webkit-scrollbar) {
  display: none;
}

:deep(.no-scrollbar) {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
