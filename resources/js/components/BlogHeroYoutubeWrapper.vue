<script setup lang="tsx">
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { BlogHeroYoutubeStyle } from './ui/blog-hero-youtube-style';

const props = defineProps<{
    showPlayerExternally?: boolean;
    video?: any;
    recommendations?: any[];
    uploadedVideos?: any[];
}>();

const emit = defineEmits(['search', 'tabChange', 'videoUploaded', 'playerClose']);
const container = ref<HTMLDivElement | null>(null);
let root: Root | null = null;

const handleSearch = (query: string) => {
  emit('search', query);
};

const handleTabChange = (tab: string) => {
  emit('tabChange', tab);
};

const handleVideoUploaded = (data: any) => {
  emit('videoUploaded', data);
};

const handlePlayerClose = () => {
  emit('playerClose');
};

const render = () => {
  if (root) {
    root.render(
      <React.StrictMode>
      <BlogHeroYoutubeStyle 
        onSearch={handleSearch} 
        onTabChange={handleTabChange} 
        onVideoUploaded={handleVideoUploaded}
        video={props.video}
        recommendations={props.recommendations}
        uploadedVideos={props.uploadedVideos}
        showPlayerExternally={props.showPlayerExternally}
        onPlayerClose={handlePlayerClose}
      />
      </React.StrictMode>
    );
  }
};

watch(() => [props.showPlayerExternally, props.video, props.recommendations, props.uploadedVideos], render);

onMounted(() => {
  console.log('BlogHeroYoutubeWrapper mounted', container.value);
  if (container.value) {
    try {
      root = createRoot(container.value);
      render();
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
  <div ref="container" class="w-full"></div>
</template>
