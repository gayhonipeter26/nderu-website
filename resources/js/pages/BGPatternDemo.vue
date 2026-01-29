<script setup lang="tsx">
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import DemoOne from '@/components/ui/bg-pattern-demo';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

const bgPatternContainer = ref<HTMLElement | null>(null);
let bgPatternRoot: Root | null = null;

onMounted(() => {
  if (bgPatternContainer.value) {
    bgPatternRoot = createRoot(bgPatternContainer.value);
    bgPatternRoot.render(
      <React.StrictMode>
        <DemoOne />
      </React.StrictMode>,
    );
  }
});

onBeforeUnmount(() => {
  if (bgPatternRoot) {
    bgPatternRoot.unmount();
    bgPatternRoot = null;
  }
});
</script>

<template>
  <WebsiteLayout>
    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div class="space-y-4 text-center max-w-4xl mx-auto">
          <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight md:text-5xl">Background Patterns</h1>
          <p class="text-sm sm:text-base text-muted-foreground">Modern CSS background patterns with customizable masks and variants.</p>
        </div>
        <div ref="bgPatternContainer" class="w-full mt-8 sm:mt-12">
          <!-- BG Pattern component will be mounted here -->
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
