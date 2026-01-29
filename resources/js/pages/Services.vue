<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { Button } from '@/components/ui/button/index';
import { DynamicFrameLayoutPhotography } from '@/components/ui/dynamic-frame-layout-photography';
import FullScreenScrollFXServicesDemoFixed from '@/components/ui/full-screen-scroll-fx-services-demo-fixed';
import Hero195 from '@/components/ui/hero-195-1';
import { Demo as RulerCarouselDemo } from '@/components/ui/ruler-carousel-demo';
import { PricingToggle } from '@/components/ui/single-pricing-card-1-toggle';
import ServicesTestimonials from '@/components/ui/testimonials-services-demo';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

const heroContainer = ref<HTMLDivElement | null>(null);
const engagementContainer = ref<HTMLElement | null>(null);
const pricingContainer = ref<HTMLElement | null>(null);
const testimonialsContainer = ref<HTMLElement | null>(null);
const hero195Container = ref<HTMLElement | null>(null);
const photographyContainer = ref<HTMLElement | null>(null);
let heroRoot: Root | null = null;
let engagementRoot: Root | null = null;
let pricingRoot: Root | null = null;
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

    <!-- Pricing Section -->
    <section class="bg-background">
      <div ref="pricingContainer" class="w-full">
        <!-- Pricing component will be mounted here -->
      </div>
    </section>

    <!-- Happy Clients Testimonials Section -->
    <section class="bg-background">
      <div ref="testimonialsContainer" class="w-full">
        <!-- Testimonials component will be mounted here -->
      </div>
    </section>

    <!-- Engagement Section with Ruler Carousel -->
    <section class="bg-background py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Engagement Approach
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe in collaborative partnerships and transparent communication throughout your project journey
          </p>
        </div>
      </div>
      <div ref="engagementContainer" class="w-full">
        <!-- RulerCarouselDemo component will be mounted here -->
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
