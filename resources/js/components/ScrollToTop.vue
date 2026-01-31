<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Camera, Terminal } from 'lucide-vue-next';

const isVisible = ref(false);

const checkScroll = () => {
  isVisible.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-10 opacity-0 scale-95"
    enter-to-class="translate-y-0 opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100 scale-100"
    leave-to-class="translate-y-10 opacity-0 scale-95"
  >
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed bottom-6 right-4 z-[100] group"
      aria-label="Scroll to top"
    >
      <div class="relative flex items-center justify-center h-7 w-7 md:h-8 md:w-8 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-300 group-hover:bg-black/60 group-hover:scale-110 group-active:scale-95 group-hover:border-white/40">
        <!-- Photography Element: Lens-like circle -->
        <div class="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
          <div class="absolute inset-0 border-[0.5px] border-white/5 opacity-50 rounded-full scale-150 -translate-x-1/4 -translate-y-1/4"></div>
        </div>
        
        <!-- Coding Element: Terminal-ish icon -->
        <div class="relative z-10 flex flex-col items-center justify-center">
            <svg 
              class="h-2.5 w-2.5 md:h-3 md:w-3 text-white transform transition-transform group-hover:-translate-y-0.5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              stroke-width="3"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            <div class="h-[1px] w-1.5 bg-white/50 rounded-full mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <!-- Decorative "focus" corners -->
        <div class="absolute top-0.5 left-0.5 h-0.5 w-0.5 border-t-[0.5px] border-l-[0.5px] border-white/40"></div>
        <div class="absolute top-0.5 right-0.5 h-0.5 w-0.5 border-t-[0.5px] border-r-[0.5px] border-white/40"></div>
        <div class="absolute bottom-0.5 left-0.5 h-0.5 w-0.5 border-b-[0.5px] border-l-[0.5px] border-white/40"></div>
        <div class="absolute bottom-0.5 right-0.5 h-0.5 w-0.5 border-b-[0.5px] border-r-[0.5px] border-white/40"></div>
      </div>
    </button>
  </transition>
</template>

<style scoped>
@keyframes pulse-border {
  0% { border-color: rgba(255, 255, 255, 0.2); }
  50% { border-color: rgba(255, 255, 255, 0.5); }
  100% { border-color: rgba(255, 255, 255, 0.2); }
}

button:hover div {
  animation: pulse-border 2s infinite;
}
</style>
