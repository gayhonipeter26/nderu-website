<template>
  <div ref="container" class="w-full"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import FullScreenScrollFXDemo from '@/components/ui/full-screen-scroll-fx-demo';

const container = ref<HTMLDivElement | null>(null);
let root: Root | null = null;

onMounted(() => {
  if (container.value) {
    root = createRoot(container.value);
    root.render(
      React.createElement(React.StrictMode, null,
        React.createElement(FullScreenScrollFXDemo)
      )
    );
  }
});

onBeforeUnmount(() => {
  if (root) {
    root.unmount();
    root = null;
  }
});
</script>
