<script setup lang="tsx">
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { UsedTechnologiesMarquee } from '@/components/ui/used-technologies-marquee';

const containerRef = ref<HTMLDivElement | null>(null);
let root: Root | null = null;

onMounted(() => {
    if (containerRef.value) {
        root = createRoot(containerRef.value);
        root.render(
            <React.StrictMode>
                <UsedTechnologiesMarquee />
            </React.StrictMode>,
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

<template>
  <div ref="containerRef" class="w-full"></div>
</template>
