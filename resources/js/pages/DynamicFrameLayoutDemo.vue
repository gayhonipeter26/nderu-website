<script setup lang="tsx">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { DynamicFrameLayoutDemo } from '@/components/ui/dynamic-frame-layout-demo';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

const dynamicFrameContainer = ref<HTMLElement | null>(null);
let dynamicFrameRoot: Root | null = null;

onMounted(() => {
  if (dynamicFrameContainer.value) {
    dynamicFrameRoot = createRoot(dynamicFrameContainer.value);
    dynamicFrameRoot.render(
      <React.StrictMode>
        <DynamicFrameLayoutDemo />
      </React.StrictMode>,
    );
  }
});

onBeforeUnmount(() => {
  if (dynamicFrameRoot) {
    dynamicFrameRoot.unmount();
    dynamicFrameRoot = null;
  }
});
</script>

<template>
  <WebsiteLayout>
    <section class="relative h-screen">
      <div ref="dynamicFrameContainer" class="w-full h-full">
        <!-- DynamicFrameLayout component will be mounted here -->
      </div>
    </section>
  </WebsiteLayout>
</template>
