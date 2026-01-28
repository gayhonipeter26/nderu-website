<script setup lang="tsx">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import ContactCardDemo from './ui/contact-card-demo';
import PhotographyContactCardDemo from './ui/photography-contact-card-demo';

const props = defineProps<{
  type?: 'default' | 'photography'
}>();

const container = ref<HTMLDivElement | null>(null);
let root: Root | null = null;

const renderComponent = () => {
  if (container.value) {
    if (root) root.unmount();
    root = createRoot(container.value);
    root.render(
      <React.StrictMode>
        {props.type === 'photography' ? <PhotographyContactCardDemo /> : <ContactCardDemo />}
      </React.StrictMode>
    );
  }
};

onMounted(renderComponent);

watch(() => props.type, renderComponent);

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
