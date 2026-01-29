<script setup lang="tsx">
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Demo from '@/components/ui/spatial-product-showcase-demo';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

const showcaseContainer = ref<HTMLElement | null>(null);
let showcaseRoot: Root | null = null;

onMounted(() => {
  if (showcaseContainer.value) {
    showcaseRoot = createRoot(showcaseContainer.value);
    showcaseRoot.render(
      <React.StrictMode>
        <Demo />
      </React.StrictMode>,
    );
  }
});

onBeforeUnmount(() => {
  if (showcaseRoot) {
    showcaseRoot.unmount();
    showcaseRoot = null;
  }
});
</script>

<template>
  <WebsiteLayout>
    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div class="space-y-4 text-center max-w-4xl mx-auto">
          <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight md:text-5xl">Spatial Product Showcase</h1>
          <p class="text-sm sm:text-base text-muted-foreground">Interactive product showcase with animated transitions and dynamic switching between services.</p>
        </div>
        <div ref="showcaseContainer" class="w-full mt-8 sm:mt-12">
          <!-- Spatial Product Showcase component will be mounted here -->
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
