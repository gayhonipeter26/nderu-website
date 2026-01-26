<script setup lang="tsx">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index';
import { Badge } from '@/components/ui/badge/index';
import { Button } from '@/components/ui/button/index';
import { Download, Award, Users, Camera, Target, Calendar } from 'lucide-vue-next';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import ImageComparisonDemo from '@/components/ui/image-comparison-demo';
import FeatureCarouselDemo from '@/components/ui/feature-carousel-demo';
import { Demo as AgentPlanDemo } from '@/components/ui/agent-plan-demo';
import { UseTimeoutDemo } from '@/components/ui/use-timeout-demo';
import { LogoCloud } from '@/components/ui/logo-cloud-2';
import DocumentationAndCertifications from '@/components/ui/scroll-area-demo';

const overview = {
  title: 'Nderu.Ke',
  summary:
    'Full-stack engineer and photographer delivering dependable software, systems, and visual storytelling for teams across industries.',
  availability: 'Currently accepting new projects',
};

const metrics = [
  { label: 'Projects delivered', value: '50+', icon: Award },
  { label: 'Clients partnered', value: '30+', icon: Users },
  { label: 'Years of experience', value: '5+', icon: Target },
  { label: 'Photography sessions', value: '200+', icon: Camera },
];

const skillGroups = [
  {
    title: 'Engineering',
    skills: ['Vue.js & React', 'Laravel & Node.js', 'TypeScript', 'PostgreSQL & MySQL', 'AWS & Docker'],
  },
  {
    title: 'Consulting',
    skills: ['Technical discovery', 'Architecture planning', 'Process optimisation', 'Team leadership', 'Stakeholder alignment'],
  },
  {
    title: 'Creative',
    skills: ['Commercial photography', 'Event coverage', 'Portrait and lifestyle', 'Editing workflows', 'Brand storytelling'],
  },
];

const documents = [
  {
    title: 'Professional CV',
    description: 'Experience, engagements, and education.',
    href: '/documents/cv.pdf',
    updated: '2024',
  },
  {
    title: 'Certifications overview',
    description: 'AWS, Meta, photography, and project management credentials.',
    href: '/documents/certifications.pdf',
    updated: '2024',
  },
];

const certifications = [
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    year: '2023',
  },
  {
    name: 'Full Stack Web Development',
    issuer: 'Meta',
    year: '2023',
  },
  {
    name: 'Professional Photography Certificate',
    issuer: 'International Photography Association',
    year: '2022',
  },
  {
    name: 'Project Management Professional',
    issuer: 'PMI',
    year: '2022',
  },
];

const timeline = [
  {
    year: '2024',
    title: 'Independent consultancy',
    description: 'Leading software and photography engagements for regional and global clients.',
  },
  {
    year: '2022',
    title: 'Technical leadership',
    description: 'Guided teams delivering SaaS and enterprise platforms in healthcare and retail.',
  },
  {
    year: '2020',
    title: 'Photography practice',
    description: 'Established commercial photography services covering events and branding.',
  },
  {
    year: '2018',
    title: 'Software engineering',
    description: 'Joined product teams building web applications and platform tooling.',
  },
];

const heroContainer = ref<HTMLDivElement | null>(null);
const timelineContainer = ref<HTMLDivElement | null>(null);
const useTimeoutContainer = ref<HTMLElement | null>(null);
const logoCloudContainer = ref<HTMLElement | null>(null);
const docsContainer = ref<HTMLElement | null>(null);
let heroRoot: Root | null = null;
let timelineRoot: Root | null = null;
let useTimeoutRoot: Root | null = null;
let logoCloudRoot: Root | null = null;
let docsRoot: Root | null = null;

onMounted(() => {
  if (heroContainer.value) {
    heroRoot = createRoot(heroContainer.value);
    heroRoot.render(
      <React.StrictMode>
        <FeatureCarouselDemo />
      </React.StrictMode>,
    );
  }
  if (timelineContainer.value) {
    timelineRoot = createRoot(timelineContainer.value);
    timelineRoot.render(
      <React.StrictMode>
        <AgentPlanDemo />
      </React.StrictMode>,
    );
  }
  if (useTimeoutContainer.value) {
    useTimeoutRoot = createRoot(useTimeoutContainer.value);
    useTimeoutRoot.render(
      <React.StrictMode>
        <UseTimeoutDemo />
      </React.StrictMode>,
    );
  }
  if (logoCloudContainer.value) {
    logoCloudRoot = createRoot(logoCloudContainer.value);
    logoCloudRoot.render(
      <React.StrictMode>
        <LogoCloud />
      </React.StrictMode>,
    );
  }
  if (docsContainer.value) {
    docsRoot = createRoot(docsContainer.value);
    docsRoot.render(
      <React.StrictMode>
        <DocumentationAndCertifications />
      </React.StrictMode>,
    );
  }
});

onBeforeUnmount(() => {
  if (heroRoot) {
    heroRoot.unmount();
    heroRoot = null;
  }
  if (timelineRoot) {
    timelineRoot.unmount();
    timelineRoot = null;
  }
  if (useTimeoutRoot) {
    useTimeoutRoot.unmount();
    useTimeoutRoot = null;
  }
  if (logoCloudRoot) {
    logoCloudRoot.unmount();
    logoCloudRoot = null;
  }
  if (docsRoot) {
    docsRoot.unmount();
    docsRoot = null;
  }
});
</script>

<template>
  <WebsiteLayout>
    <section class="border-b bg-background">
      <div class="relative isolate min-h-screen">
        <div class="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div class="w-full">
            <!-- Mobile-First Layout -->
            <div class="space-y-8 lg:hidden">
              <!-- Mobile: About Content First -->
              <div class="text-center space-y-6">
                <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                  Nderu.ke
                </h1>
                <p class="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                  {{ overview.summary }}
                </p>
                <p class="text-xs sm:text-sm text-muted-foreground">
                  Crafting digital excellence with passion and precision.
                </p>
              </div>

              <!-- Mobile: Animation -->
              <div class="relative">
                <div class="bg-background border rounded-2xl shadow-xl overflow-hidden">
                  <div ref="heroContainer" class="w-full h-[400px] sm:h-[500px]"></div>
                </div>
              </div>

              <!-- Mobile: Additional Content -->
              <div class="space-y-6 text-center">
                <div>
                  <h3 class="text-lg font-semibold mb-2 text-foreground">Digital Craftsmanship</h3>
                  <p class="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                    Bridging technical excellence and creative vision through full-stack applications and compelling visual narratives.
                  </p>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-2 text-foreground">Dual Expertise</h3>
                  <p class="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                    Combining software engineering and professional photography for comprehensive digital solutions.
                  </p>
                </div>
              </div>
            </div>

            <!-- Desktop: Side-by-Side Layout -->
            <div class="hidden lg:block">
              <div class="text-center mb-8">
                <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                  Nderu.ke
                </h1>
              </div>
              
              <div class="w-full relative">
                <div class="bg-background border rounded-2xl shadow-2xl overflow-hidden">
                  <div class="grid grid-cols-1 lg:grid-cols-4 gap-0">
                    <!-- Left Side: Animation (3/4 width) -->
                    <div class="lg:col-span-3 relative">
                      <div ref="heroContainer" class="w-full h-[700px] lg:h-[800px]"></div>
                    </div>
                    
                    <!-- Right Side: About Content (1/4 width) -->
                    <div class="lg:col-span-1 p-4 lg:p-6">
                      <div class="space-y-4 h-full flex flex-col justify-center">
                        <!-- Summary -->
                        <div class="text-center">
                          <h3 class="text-base font-semibold mb-2 text-foreground">Nderu.ke</h3>
                          <p class="text-sm text-muted-foreground leading-relaxed">
                            {{ overview.summary }}<br>
                            <span class="text-xs">Crafting digital excellence with passion and precision.</span>
                          </p>
                        </div>

                        <!-- Content Sections -->
                        <div class="space-y-4">
                          <div class="text-center">
                            <h3 class="text-base font-semibold mb-2 text-foreground">Digital Craftsmanship</h3>
                            <p class="text-muted-foreground leading-relaxed text-xs">
                              Bridging technical excellence and creative vision through full-stack applications and compelling visual narratives.
                            </p>
                          </div>

                          <div class="text-center">
                            <h3 class="text-base font-semibold mb-2 text-foreground">Dual Expertise</h3>
                            <p class="text-muted-foreground leading-relaxed text-xs">
                              Combining software engineering and professional photography for comprehensive digital solutions.
                            </p>
                          </div>
                        </div>
                        
                        <!-- Bottom Accent -->
                        <div class="text-center pt-2">
                          <div class="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>
                            <span>Crafting Digital Excellence</span>
                            <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Current Focus Section -->
    <section class="py-8 sm:py-12 lg:py-16 bg-muted/30">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-4 text-center max-w-4xl mx-auto">
          <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight md:text-4xl">Current Focus</h2>
          <p class="text-sm sm:text-base text-muted-foreground">Currently developing scalable healthcare management systems and innovative digital solutions while advancing expertise in full-stack architecture and modern web technologies</p>
        </div>
        <div ref="useTimeoutContainer" class="w-full mt-8 sm:mt-12">
          <!-- UseTimeout component will be mounted here -->
        </div>
      </div>
    </section>

    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div class="space-y-2 text-center max-w-4xl mx-auto">
          <h2 class="text-xl sm:text-2xl font-semibold tracking-tight md:text-3xl">Capabilities</h2>
          <p class="text-sm sm:text-base text-muted-foreground">Technologies and platforms I work with to deliver exceptional results.</p>
        </div>
        <div ref="logoCloudContainer" class="mt-6 sm:mt-8 md:mt-10">
          <!-- Logo Cloud component will be mounted here -->
        </div>
      </div>
    </section>

    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div class="space-y-2 text-center max-w-4xl mx-auto">
          <h2 class="text-xl sm:text-2xl font-semibold tracking-tight md:text-3xl">Resources</h2>
          <p class="text-sm sm:text-base text-muted-foreground">Documentation, certificates, and supporting materials you can view or download.</p>
        </div>
        <div ref="docsContainer" class="w-full mt-6 sm:mt-8 md:mt-10">
          <!-- Documentation and Certifications component will be mounted here -->
        </div>
      </div>
    </section>

    <section class="bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div class="space-y-4 text-center max-w-2xl mx-auto">
          <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight md:text-4xl">Career Timeline</h2>
          <p class="text-sm sm:text-base text-muted-foreground">Interactive career progression with project milestones and achievements. Click tasks to expand and see details.</p>
        </div>
        <div ref="timelineContainer" class="w-full mt-8 sm:mt-12 h-[500px] sm:h-[600px] lg:h-[700px]">
          <!-- Agent Plan component will be mounted here -->
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
