<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index';
import { Badge } from '@/components/ui/badge/index';
import { Button } from '@/components/ui/button/index';
import { Code, Database, Camera, Users } from 'lucide-vue-next';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import FullScreenScrollFXServicesDemoFixed from '@/components/ui/full-screen-scroll-fx-services-demo-fixed';
import { Demo as RulerCarouselDemo } from '@/components/ui/ruler-carousel-demo';
import { PricingToggle } from '@/components/ui/single-pricing-card-1-toggle';
import GridFeatureCardsCustom from '@/components/ui/grid-feature-cards-custom';
import { BGPattern } from '@/components/ui/bg-pattern';
import ServicesTestimonials from '@/components/ui/testimonials-services-demo';
import Hero195 from '@/components/ui/hero-195-1';
import { DynamicFrameLayoutPhotography } from '@/components/ui/dynamic-frame-layout-photography';

const heroContainer = ref<HTMLDivElement | null>(null);
const engagementContainer = ref<HTMLElement | null>(null);
const pricingContainer = ref<HTMLElement | null>(null);
const gridFeatureContainer = ref<HTMLElement | null>(null);
const testimonialsContainer = ref<HTMLElement | null>(null);
const hero195Container = ref<HTMLElement | null>(null);
const photographyContainer = ref<HTMLElement | null>(null);
let heroRoot: Root | null = null;
let engagementRoot: Root | null = null;
let pricingRoot: Root | null = null;
let gridFeatureRoot: Root | null = null;
let testimonialsRoot: Root | null = null;
let hero195Root: Root | null = null;
let photographyRoot: Root | null = null;

onMounted(() => {
  if (heroContainer.value) {
    heroRoot = createRoot(heroContainer.value);
    heroRoot.render(
      React.createElement(React.StrictMode, null,
        React.createElement(FullScreenScrollFXServicesDemoFixed)
      )
    );
  }
  if (engagementContainer.value) {
    engagementRoot = createRoot(engagementContainer.value);
    engagementRoot.render(
      React.createElement(React.StrictMode, null,
        React.createElement(RulerCarouselDemo)
      )
    );
  }
  if (pricingContainer.value) {
    pricingRoot = createRoot(pricingContainer.value);
    pricingRoot.render(
      React.createElement(React.StrictMode, null,
        React.createElement(PricingToggle)
      )
    );
  }
  if (gridFeatureContainer.value) {
    gridFeatureRoot = createRoot(gridFeatureContainer.value);
    gridFeatureRoot.render(
      React.createElement(React.StrictMode, null,
        React.createElement(GridFeatureCardsCustom)
      )
    );
  }
  if (testimonialsContainer.value) {
    testimonialsRoot = createRoot(testimonialsContainer.value);
    testimonialsRoot.render(
      React.createElement(React.StrictMode, null,
        React.createElement(ServicesTestimonials)
      )
    );
  }
  if (hero195Container.value) {
    hero195Root = createRoot(hero195Container.value);
    hero195Root.render(
      React.createElement(React.StrictMode, null,
        React.createElement(Hero195)
      )
    );
  }
  if (photographyContainer.value) {
    photographyRoot = createRoot(photographyContainer.value);
    photographyRoot.render(
      React.createElement(React.StrictMode, null,
        React.createElement(DynamicFrameLayoutPhotography)
      )
    );
  }
});

onBeforeUnmount(() => {
  if (heroRoot) {
    heroRoot.unmount();
    heroRoot = null;
  }
  if (engagementRoot) {
    engagementRoot.unmount();
    engagementRoot = null;
  }
  if (pricingRoot) {
    pricingRoot.unmount();
    pricingRoot = null;
  }
  if (gridFeatureRoot) {
    gridFeatureRoot.unmount();
    gridFeatureRoot = null;
  }
  if (testimonialsRoot) {
    testimonialsRoot.unmount();
    testimonialsRoot = null;
  }
  if (hero195Root) {
    hero195Root.unmount();
    hero195Root = null;
  }
  if (photographyRoot) {
    photographyRoot.unmount();
    photographyRoot = null;
  }
});
</script>

<template>
  <WebsiteLayout>
    <!-- Hero Section with FullScreenScrollFX -->
    <section class="relative">
      <div ref="heroContainer" class="w-full"></div>
    </section>

    <!-- Happy Clients Testimonials Section -->
    <section class="bg-background">
      <div ref="testimonialsContainer" class="w-full">
        <!-- Testimonials component will be mounted here -->
      </div>
    </section>

    <!-- Software Services Section -->
    <section class="bg-background">
      <div ref="hero195Container" class="w-full">
        <!-- Hero195 component will be mounted here -->
      </div>
    </section>

    <!-- Photography Services Section -->
    <section class="bg-background">
      <div ref="photographyContainer" class="w-full">
        <!-- DynamicFrameLayoutPhotography component will be mounted here -->
      </div>
    </section>

    <!-- Grid Feature Cards Section -->
    <section class="bg-background">
      <div ref="gridFeatureContainer" class="w-full">
        <!-- Grid Feature Cards component will be mounted here -->
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="bg-background">
      <div ref="pricingContainer" class="w-full">
        <!-- Pricing component will be mounted here -->
      </div>
    </section>

    <section class="bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="mt-12 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/contact">Start a conversation</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/projects">View delivery examples</Link>
          </Button>
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
