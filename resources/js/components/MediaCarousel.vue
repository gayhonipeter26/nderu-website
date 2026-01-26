<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

interface MediaItem {
  id: string | number;
  url: string;
  kind: 'image' | 'video';
  mime_type?: string | null;
}

const props = withDefaults(
  defineProps<{ media: MediaItem[]; interval?: number; heightClass?: string; pauseOnHover?: boolean }>(),
  {
    interval: 5000,
    heightClass: 'aspect-video',
    pauseOnHover: true,
  },
);

const currentIndex = ref(0);
const hasMedia = computed(() => props.media?.length ?? 0);
const currentMedia = computed(() => props.media?.[currentIndex.value]);
const showControls = computed(() => (props.media?.length ?? 0) > 1);
let timer: number | null = null;

function stop() {
  if (timer !== null) {
    window.clearInterval(timer);
    timer = null;
  }
}

function next() {
  if (!props.media?.length) return;
  currentIndex.value = (currentIndex.value + 1) % props.media.length;
}

function prev() {
  if (!props.media?.length) return;
  currentIndex.value = (currentIndex.value - 1 + props.media.length) % props.media.length;
}

function start() {
  stop();
  if (props.media?.length > 1) {
    timer = window.setInterval(() => {
      next();
    }, props.interval);
  }
}

watch(
  () => props.media,
  (items) => {
    currentIndex.value = 0;
    if (items?.length) {
      start();
    } else {
      stop();
    }
  },
  { immediate: true },
);

onMounted(() => {
  if (props.media?.length) {
    start();
  }
});

onBeforeUnmount(() => {
  stop();
});

function handleHover(enter: boolean) {
  if (!props.pauseOnHover || !showControls.value) {
    return;
  }
  if (enter) {
    stop();
  } else {
    start();
  }
}
</script>

<template>
  <div v-if="hasMedia" :class="['relative overflow-hidden rounded-lg border bg-muted', heightClass]" @mouseenter="handleHover(true)" @mouseleave="handleHover(false)">
    <Transition name="fade" mode="out-in">
      <div :key="currentMedia?.id ?? 'placeholder'" class="h-full w-full">
        <img
          v-if="currentMedia && currentMedia.kind === 'image'"
          :src="currentMedia.url"
          class="h-full w-full object-cover"
          loading="lazy"
          alt="Gallery media"
        />
        <video
          v-else-if="currentMedia && currentMedia.kind === 'video'"
          :src="currentMedia.url"
          class="h-full w-full object-cover"
          controls
          preload="metadata"
        />
      </div>
    </Transition>

    <div v-if="showControls" class="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
      <button
        type="button"
        class="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow"
        @click.stop="prev"
      >
        <span class="sr-only">Previous</span>
        ‹
      </button>
      <button
        type="button"
        class="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow"
        @click.stop="next"
      >
        <span class="sr-only">Next</span>
        ›
      </button>
    </div>

    <div v-if="showControls" class="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
      <button
        v-for="(_, index) in props.media"
        :key="index"
        type="button"
        class="h-2.5 w-2.5 rounded-full border border-background transition"
        :class="index === currentIndex ? 'bg-background' : 'bg-background/50'
      "
        @click.stop="currentIndex = index"
      />
    </div>
  </div>
  <slot v-else />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
