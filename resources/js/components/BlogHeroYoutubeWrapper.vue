<script setup lang="tsx">
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { BlogHeroYoutubeStyle } from './ui/blog-hero-youtube-style';

const container = ref<HTMLDivElement | null>(null);
let root: Root | null = null;

onMounted(() => {
  console.log('BlogHeroYoutubeWrapper mounted', container.value);
  if (container.value) {
    try {
      root = createRoot(container.value);
      root.render(
        <React.StrictMode>
          <BlogHeroYoutubeStyle />
        </React.StrictMode>
      );
      console.log('BlogHeroYoutubeStyle rendered successfully');
    } catch (error) {
      console.error('Error rendering BlogHeroYoutubeStyle:', error);
    }
  }
});

onBeforeUnmount(() => {
  if (root) {
    root.unmount();
    root = null;
  }
});
</script>

<template>
  <div ref="container" class="w-full min-h-[400px]"></div>
</template>
