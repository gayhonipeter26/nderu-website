<script setup lang="tsx">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { HeroAsciiOne } from './ui/hero-ascii-one';

const container = ref<HTMLDivElement | null>(null);
let root: Root | null = null;

onMounted(() => {
    if (container.value) {
        root = createRoot(container.value);
        root.render(
            <React.StrictMode>
                <HeroAsciiOne />
            </React.StrictMode>
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
    <div ref="container" class="w-full"></div>
</template>
