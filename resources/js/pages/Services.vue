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
import SpatialProductShowcaseDemo from '@/components/ui/spatial-product-showcase-demo';
import { Demo as RulerCarouselDemo } from '@/components/ui/ruler-carousel-demo';
import { PricingToggle } from '@/components/ui/single-pricing-card-1-toggle';
import GridFeatureCardsCustom from '@/components/ui/grid-feature-cards-custom';
import { BGPattern } from '@/components/ui/bg-pattern';

const heroContainer = ref<HTMLDivElement | null>(null);
const engagementContainer = ref<HTMLElement | null>(null);
const pricingContainer = ref<HTMLElement | null>(null);
const gridFeatureContainer = ref<HTMLElement | null>(null);
let heroRoot: Root | null = null;
let engagementRoot: Root | null = null;
let pricingRoot: Root | null = null;
let gridFeatureRoot: Root | null = null;

onMounted(() => {
  if (heroContainer.value) {
    heroRoot = createRoot(heroContainer.value);
    heroRoot.render(
      React.createElement(React.StrictMode, null,
        React.createElement(SpatialProductShowcaseDemo)
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
});
</script>

<template>
  <WebsiteLayout>
    <!-- Hero Section with Spatial Product Showcase and Grid Background -->
    <section class="relative min-h-[60vh] sm:min-h-[80vh] md:min-h-screen">
      <div class="absolute inset-0 z-[-10]">
        <BGPattern variant="grid" mask="fade-edges" :size="24" sm:size="32" fill="hsl(var(--muted-foreground) / 0.1)" />
      </div>
      <div ref="heroContainer" class="w-full relative z-10 min-h-[60vh] sm:min-h-[80vh] md:min-h-screen"></div>
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
        <div class="space-y-4 text-center">
          <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Engagement approach</h2>
          <p class="text-muted-foreground max-w-2xl mx-auto">
            A repeatable sequence ensures projects remain predictable and transparent from onboarding to handover.
          </p>
        </div>
        <div ref="engagementContainer" class="w-full mt-8 sm:mt-12">
          <!-- Ruler Carousel component will be mounted here -->
        </div>
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
