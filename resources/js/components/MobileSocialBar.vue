<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { 
  Instagram, 
  Facebook, 
  MessageCircle,
  MessageSquare, // For Threads alternative
  X
} from 'lucide-vue-next';

const TikTokIcon = `<svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`;
const ThreadsIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M10 14.5c.8-1.3 2.5-2 3.5-1s.3 2.7-1 3.5c-1.3.8-2.7.5-3.5-.3s-.3-2.7 1-3.7z"/><path d="M17 19c-2.3 2-6 2.5-9 1s-4.5-4-4.5-8 2-7.5 5-8.5 7.5-.5 9.5 2 2 6.5-1 8.5-5.5 1.5-7-1.5"/></svg>`;

const socialLinks = [
  { name: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/254700000000' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/nderu' },
  { name: 'TikTok', isSvg: true, svg: TikTokIcon, href: 'https://tiktok.com/@nderu' },
  { name: 'Threads', isSvg: true, svg: ThreadsIcon, href: 'https://threads.net/@nderu' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/nderu' },
];

const isExpanded = ref(false);
const containerRef = ref<HTMLElement | null>(null);
const activeIndex = ref(2);

const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
};

const handleScroll = () => {
  if (!containerRef.value || !isExpanded.value) return;
  const container = containerRef.value;
  const items = container.querySelectorAll('.social-item');
  const centerX = container.scrollLeft + container.offsetWidth / 2;
  
  let closestIndex = 0;
  let minDiff = Infinity;
  
  items.forEach((item, index) => {
    const itemCenter = (item as HTMLElement).offsetLeft + (item as HTMLElement).offsetWidth / 2;
    const diff = Math.abs(centerX - itemCenter);
    
    const maxDist = 80;
    const scale = Math.max(1, 1.4 - (diff / maxDist) * 0.4);
    const opacity = Math.max(0.4, 1 - (diff / maxDist) * 0.6);
    
    (item as HTMLElement).style.setProperty('--scale', scale.toString());
    (item as HTMLElement).style.setProperty('--opacity', opacity.toString());
    
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = index;
    }
  });
  
  activeIndex.value = closestIndex;
};

onMounted(() => {
  if (containerRef.value) {
    containerRef.value.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }
});

onUnmounted(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener('scroll', handleScroll);
  }
});
</script>

<template>
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] md:hidden w-auto pointer-events-none">
    <div class="relative flex flex-col items-center pointer-events-auto">
      
      <!-- Content Container -->
      <div 
        class="relative transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden rounded-lg bg-black/40 backdrop-blur-md border border-white/20 shadow-2xl"
        :class="isExpanded ? 'w-[40vw] h-10 p-0.5' : 'w-7 h-7 md:w-8 md:h-8'"
        @click="!isExpanded && toggleExpand()"
      >
        <!-- Viewfinder Corners (Visible in both states) -->
        <div class="absolute top-0.5 left-0.5 h-0.5 w-0.5 border-t-[0.5px] border-l-[0.5px] border-white/40"></div>
        <div class="absolute top-0.5 right-0.5 h-0.5 w-0.5 border-t-[0.5px] border-r-[0.5px] border-white/40"></div>
        <div class="absolute bottom-0.5 left-0.5 h-0.5 w-0.5 border-b-[0.5px] border-l-[0.5px] border-white/40"></div>
        <div class="absolute bottom-0.5 right-0.5 h-0.5 w-0.5 border-b-[0.5px] border-r-[0.5px] border-white/40"></div>

        <!-- Collapsed Icon -->
        <div 
          v-if="!isExpanded"
          class="flex items-center justify-center w-full h-full"
        >
          <div class="relative">
            <MessageSquare class="h-2.5 w-2.5 text-white" />
            <div class="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-[1px] bg-white/50 rounded-full animate-pulse"></div>
          </div>
        </div>

        <!-- Expanded Quick Panel Close -->
        <button 
          v-if="isExpanded"
          @click.stop="toggleExpand"
          class="absolute top-0.5 right-0.5 z-20 h-3 w-3 flex items-center justify-center text-white/50 hover:text-white"
        >
          <X class="h-2 w-2" />
        </button>

        <!-- Expanded Social Switcher -->
        <div 
          v-if="isExpanded"
          ref="containerRef"
          class="flex items-center gap-1 h-full overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6"
          style="-ms-overflow-style: none; scrollbar-width: none; overscroll-behavior-x: contain;"
        >
          <a
            v-for="(social, index) in socialLinks"
            :key="social.name"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            class="social-item flex-shrink-0 flex flex-col items-center justify-center min-w-[1.8rem] h-full transition-all duration-300 active:scale-75 snap-center"
            :style="{
              transform: `scale(var(--scale, 1))`,
              opacity: `var(--opacity, 0.6)`
            }"
          >
            <div class="h-5 w-5 flex items-center justify-center rounded-md bg-white/5 border border-white/10">
                <component 
                  v-if="!social.isSvg" 
                  :is="social.icon" 
                  class="h-2.5 w-2.5 text-white"
                />
                <div 
                  v-else 
                  v-html="social.svg" 
                  class="h-2.5 w-2.5 text-white"
                ></div>
            </div>
          </a>
        </div>
      </div>

      <!-- Samsung Pill Indicator -->
      <transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="isExpanded" class="w-4 h-0.5 bg-white/20 rounded-full mt-1.5 overflow-hidden">
            <div 
            class="h-full bg-white/60 transition-all duration-300 ease-out rounded-full"
            :style="{ 
                width: '20%', 
                marginLeft: `${(activeIndex / (socialLinks.length - 1)) * 80}%` 
            }"
            ></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.social-item {
  transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s ease;
  will-change: transform, opacity;
}
</style>
