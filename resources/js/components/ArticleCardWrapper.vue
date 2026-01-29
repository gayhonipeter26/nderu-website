<template>
  <div ref="container" class="w-full"></div>
</template>

<script setup lang="ts">
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import ArticleCardDemo from '@/components/ui/card-23-demo';

const container = ref<HTMLDivElement | null>(null);
let root: Root | null = null;

onMounted(() => {
  if (container.value) {
    root = createRoot(container.value);
    root.render(
      React.createElement(React.StrictMode, null,
        React.createElement(ArticleCardDemo)
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
