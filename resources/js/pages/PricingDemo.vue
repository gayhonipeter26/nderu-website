<script setup lang="tsx">
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import DemoOne from '@/components/ui/single-pricing-card-1-demo';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

const pricingContainer = ref<HTMLElement | null>(null);
let pricingRoot: Root | null = null;

onMounted(() => {
  if (pricingContainer.value) {
    pricingRoot = createRoot(pricingContainer.value);
    pricingRoot.render(
      <React.StrictMode>
        <DemoOne />
      </React.StrictMode>,
    );
  }
});

onBeforeUnmount(() => {
  if (pricingRoot) {
    pricingRoot.unmount();
    pricingRoot = null;
  }
});
</script>

<template>
  <WebsiteLayout>
    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div class="space-y-4 text-center max-w-4xl mx-auto">
          <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight md:text-5xl">Pricing Plans</h1>
          <p class="text-sm sm:text-base text-muted-foreground">Flexible pricing options designed to grow with your business.</p>
        </div>
        <div ref="pricingContainer" class="w-full mt-8 sm:mt-12">
          <!-- Pricing component will be mounted here -->
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
