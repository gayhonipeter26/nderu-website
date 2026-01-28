<script setup lang="tsx">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { PhotographyProfileHeader } from './ui/photography-profile-header';

const props = defineProps<{
  bannerImage?: string;
  profileImage?: string;
  socialLinks?: {
    tiktok?: string;
    instagram?: string;
    threads?: string;
  }
}>();

const container = ref<HTMLDivElement | null>(null);
let root: Root | null = null;

const render = () => {
  if (container.value) {
    if (root) root.unmount();
    root = createRoot(container.value);
    root.render(
      <React.StrictMode>
        <PhotographyProfileHeader 
          socialLinks={props.socialLinks} 
          bannerImage={props.bannerImage}
          profileImage={props.profileImage}
        />
      </React.StrictMode>
    );
  }
};

onMounted(render);
watch([() => props.socialLinks, () => props.bannerImage, () => props.profileImage], render, { deep: true });

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
