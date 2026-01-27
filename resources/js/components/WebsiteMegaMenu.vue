<script setup lang="tsx">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import MegaMenu from '@/components/ui/mega-menu';
import { megaMenuData } from '@/components/ui/mega-menu-data';
import { Link } from '@inertiajs/vue3';

const containerRef = ref<HTMLDivElement | null>(null);
let root: Root | null = null;

onMounted(() => {
    if (containerRef.value) {
        root = createRoot(containerRef.value);
        root.render(
            <React.StrictMode>
                <div className="relative flex h-16 items-center justify-center bg-black">
                    <MegaMenu 
                        items={megaMenuData} 
                        className="text-white"
                    />
                </div>
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
