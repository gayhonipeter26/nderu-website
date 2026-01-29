<script setup lang="tsx">
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Demo } from '@/components/blocks/features-11-demo';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

const featuresContainer = ref<HTMLElement | null>(null);
let featuresRoot: Root | null = null;

onMounted(() => {
  if (featuresContainer.value) {
    featuresRoot = createRoot(featuresContainer.value);
    featuresRoot.render(
      <React.StrictMode>
        <Demo />
      </React.StrictMode>,
    );
  }
});

onBeforeUnmount(() => {
  if (featuresRoot) {
    featuresRoot.unmount();
    featuresRoot = null;
  }
});
</script>

<template>
  <WebsiteLayout>
    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div class="space-y-4 text-center max-w-4xl mx-auto">
          <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight md:text-5xl">Features Showcase</h1>
          <p class="text-sm sm:text-base text-muted-foreground">Advanced tracking system and UX features demonstration.</p>
        </div>
        <div ref="featuresContainer" class="w-full mt-8 sm:mt-12">
          <!-- Features component will be mounted here -->
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
