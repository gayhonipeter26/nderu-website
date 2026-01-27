<script setup lang="tsx">
import { Link } from '@inertiajs/vue3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index';
import { Button } from '@/components/ui/button/index';
import { Badge } from '@/components/ui/badge/index';
import { ArrowRight, Award, CheckCircle, Users, Star } from 'lucide-vue-next';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';
import SparklesHeroWrapper from '@/components/SparklesHeroWrapper.vue';
import { onBeforeUnmount, onMounted, ref, computed } from 'vue';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { DemoOne } from '@/components/ui/silk-background-animation-demo';
import CaseStudiesDemo from '@/components/ui/case-studies-demo';
import { TestimonialsSectionCustom } from '@/components/blocks/testimonials-with-marquee-custom';
import { TypewriterEffectCustom } from '@/components/ui/typewriter-effect-custom';
import ExpandingCardsRecentWorkDemo from '@/components/ui/expanding-cards-recent-work-demo';

const props = defineProps<{
  services?: Array<{
    id: number;
    title: string;
    summary: string;
    status: string;
    updated_at: string;
    icon?: any;
    description?: string;
    points?: string[];
  }>;
  projects?: Array<{
    id: number;
    slug: string;
    title: string;
    summary: string | null;
    category: string | null;
    year: number | null;
    featured: boolean;
    hero_image_url: string | null;
    likes_count: number;
  }>;
  posts?: Array<{
    id: number;
    slug: string;
    title: string;
    summary: string | null;
    reading_time: string | null;
    published_at: string | null;
    cover_image_url: string | null;
    likes_count: number;
  }>;
  channels?: Array<{
    id: number;
    name: string;
    url: string;
    type: string;
  }>;
}>();

const stats = [
  { label: 'Projects delivered', value: '50+', icon: CheckCircle },
  { label: 'Years experience', value: '5+', icon: Award },
  { label: 'Clients partnered', value: '30+', icon: Users },
  { label: 'Photos captured', value: '10K+', icon: Star },
];

const silkContainer = ref<HTMLDivElement | null>(null);
const caseStudiesContainer = ref<HTMLDivElement | null>(null);
const testimonialsContainer = ref<HTMLDivElement | null>(null);
const typewriterContainer = ref<HTMLDivElement | null>(null);
const expandingCardsContainer = ref<HTMLDivElement | null>(null);
let silkRoot: Root | null = null;
let caseStudiesRoot: Root | null = null;
let testimonialsRoot: Root | null = null;
let typewriterRoot: Root | null = null;
let expandingCardsRoot: Root | null = null;

onMounted(() => {
  if (silkContainer.value) {
    silkRoot = createRoot(silkContainer.value);
    silkRoot.render(
      <React.StrictMode>
        <DemoOne />
      </React.StrictMode>,
    );
  }
  if (caseStudiesContainer.value) {
    console.log('Mounting case studies component');
    caseStudiesRoot = createRoot(caseStudiesContainer.value);
    caseStudiesRoot.render(
      <React.StrictMode>
        <CaseStudiesDemo />
      </React.StrictMode>,
    );
    console.log('Case studies component mounted');
  }
  if (testimonialsContainer.value) {
    testimonialsRoot = createRoot(testimonialsContainer.value);
    testimonialsRoot.render(
      <React.StrictMode>
        <TestimonialsSectionCustom />
      </React.StrictMode>,
    );
  }
  if (typewriterContainer.value) {
    typewriterRoot = createRoot(typewriterContainer.value);
    typewriterRoot.render(
      <React.StrictMode>
        <TypewriterEffectCustom />
      </React.StrictMode>,
    );
  }
  if (expandingCardsContainer.value) {
    expandingCardsRoot = createRoot(expandingCardsContainer.value);
    expandingCardsRoot.render(
      <React.StrictMode>
        <ExpandingCardsRecentWorkDemo />
      </React.StrictMode>,
    );
  }
});

onBeforeUnmount(() => {
  if (silkRoot) {
    silkRoot.unmount();
    silkRoot = null;
  }
  if (caseStudiesRoot) {
    caseStudiesRoot.unmount();
    caseStudiesRoot = null;
  }
  if (testimonialsRoot) {
    testimonialsRoot.unmount();
    testimonialsRoot = null;
  }
  if (typewriterRoot) {
    typewriterRoot.unmount();
    typewriterRoot = null;
  }
  if (expandingCardsRoot) {
    expandingCardsRoot.unmount();
    expandingCardsRoot = null;
  }
});
</script>

<template>
  <WebsiteLayout>
    <section id="hero" class="border-b bg-background">
      <div class="relative isolate overflow-hidden">
        <!-- Background Image -->
        <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" 
             style="background-image: url('/assets/photos/your-image-name.jpg');">
          <div class="absolute inset-0 bg-black/20"></div>
        </div>
        <!-- Silk Animation Container -->
        <div ref="silkContainer" class="absolute inset-0 opacity-90" />
        <div class="container relative mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
          <div class="flex-1" aria-hidden="true"></div>
          <div class="relative z-20 flex w-full flex-col items-center pb-16">
            <Button asChild size="lg" class="bg-white text-black hover:bg-neutral-100">
              <Link href="/services">
                Work with me
                <ArrowRight class="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    <section id="case-studies">
      <div ref="caseStudiesContainer" class="w-full"></div>
    </section>

    <section id="recent-work" class="py-16 bg-background">
      <div ref="expandingCardsContainer" class="w-full">
        <!-- Expanding Cards Recent Work component will be mounted here -->
      </div>
    </section>

    <!-- Testimonials Section with Marquee -->
    <section id="testimonials" class="border-b bg-background">
      <div ref="testimonialsContainer" class="w-full">
        <!-- Testimonials with marquee component will be mounted here -->
      </div>
    </section>

    <!-- Typewriter Effect Section -->
    <section id="typewriter" class="bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div ref="typewriterContainer" class="w-full">
          <!-- Typewriter Effect component will be mounted here -->
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
