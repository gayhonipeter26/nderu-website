<template>
  <div ref="testimonialsContainer" class="w-full"></div>
</template>

<script setup lang="ts">
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { Testimonials } from '@/components/ui/testimonials-columns-1-demo';

const testimonialsContainer = ref<HTMLDivElement | null>(null);
let testimonialsRoot: Root | null = null;

onMounted(() => {
  if (testimonialsContainer.value) {
    testimonialsRoot = createRoot(testimonialsContainer.value);
    testimonialsRoot.render(
      React.createElement(React.StrictMode, null,
        React.createElement(Testimonials)
      )
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
