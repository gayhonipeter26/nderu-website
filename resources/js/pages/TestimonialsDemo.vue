<script setup lang="tsx">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { TestimonialsSectionDemo } from '@/components/blocks/testimonials-with-marquee-demo';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

const testimonialsContainer = ref<HTMLElement | null>(null);
let testimonialsRoot: Root | null = null;

onMounted(() => {
  if (testimonialsContainer.value) {
    testimonialsRoot = createRoot(testimonialsContainer.value);
    testimonialsRoot.render(
      <React.StrictMode>
        <TestimonialsSectionDemo />
      </React.StrictMode>,
    );
  }
});

onBeforeUnmount(() => {
  if (testimonialsRoot) {
    testimonialsRoot.unmount();
    testimonialsRoot = null;
  }
});
</script>

<template>
  <WebsiteLayout>
    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div class="space-y-4 text-center max-w-4xl mx-auto">
          <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight md:text-5xl">Testimonials Section</h1>
          <p class="text-sm sm:text-base text-muted-foreground">Interactive testimonials showcase with animated marquee scrolling and hover effects.</p>
        </div>
        <div ref="testimonialsContainer" class="w-full mt-8 sm:mt-12">
          <!-- Testimonials component will be mounted here -->
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
