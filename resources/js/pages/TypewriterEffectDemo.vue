<script setup lang="tsx">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { TypewriterEffectSmoothDemo } from '@/components/ui/typewriter-effect-demo';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

const typewriterContainer = ref<HTMLElement | null>(null);
let typewriterRoot: Root | null = null;

onMounted(() => {
  if (typewriterContainer.value) {
    typewriterRoot = createRoot(typewriterContainer.value);
    typewriterRoot.render(
      <React.StrictMode>
        <TypewriterEffectSmoothDemo />
      </React.StrictMode>,
    );
  }
});

onBeforeUnmount(() => {
  if (typewriterRoot) {
    typewriterRoot.unmount();
    typewriterRoot = null;
  }
});
</script>

<template>
  <WebsiteLayout>
    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div class="space-y-4 text-center max-w-4xl mx-auto">
          <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight md:text-5xl">Typewriter Effect</h1>
          <p class="text-sm sm:text-base text-muted-foreground">Interactive typewriter animation with smooth text revealing and blinking cursor effects.</p>
        </div>
        <div ref="typewriterContainer" class="w-full mt-8 sm:mt-12">
          <!-- Typewriter Effect component will be mounted here -->
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
