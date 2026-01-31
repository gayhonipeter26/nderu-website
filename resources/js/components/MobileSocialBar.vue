<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {
  Instagram,
  Facebook,
  MessageCircle,
  MessageSquare, // For Threads alternative
  ChevronLeft,
  X,
  Send,
  Linkedin,
  Github,
  Phone
} from 'lucide-vue-next';

const TikTokPath = "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";
const TikTokIcon = `<svg viewBox="0 0 24 24" class="h-4 w-4">
  <path fill="#FE2C55" d="${TikTokPath}" style="transform: translate(0.5px, 0.5px)"/>
  <path fill="#25F4EE" d="${TikTokPath}" style="transform: translate(-0.5px, -0.5px)"/>
  <path fill="white" d="${TikTokPath}"/>
</svg>`;
const ThreadsIcon = `<svg viewBox="0 0 448 512" fill="currentColor" class="h-4 w-4"><path d="M331.5 235.7c2.2 .9 4.2 1.9 6.3 2.8c2.9 1.3 5.3 2.5 8.8 4.6l.7 .7c1.5 .9 1.9 2.1 2.3 3.7c.1 .9 0 2.2-.1 3.1c-.2 2.1-.8 3.9-2.1 5.8c-1.4 2.1-3.1 4.1-5 6c-5.5 5.4-11.4 10.6-17.4 15.7c-2.1 1.7-4.1 3.5-6.3 5.2c-3.1 2.4-6.1 4.8-9.6 6.9c-.5 .3-1 .5-1.5 .8c-2.1 1.2-4.3 1.9-6.7 1.8c-10.1-.2-19-3-27.3-8.6c-11.5-7.8-19.3-18.5-24-31.3c-4.5-12-5.3-24.5-3.5-37.1c1.7-12.1 6.1-23.2 13.1-33.1c7.2-10.3 16.7-17.8 28.3-22c10.6-3.9 21.3-4.1 32.2-1.3c11.7 3 21.6 8.8 30.1 17.2c3.5 3.5 6.4 7.3 8.9 11.4c.8 1.5 1.5 3.1 2.2 4.6c.2 .5 .2 1.1 .2 1.6V262.1c0 6.1-3.3 11.1-8.5 14.1c-1.8 1-3.9 1.5-6 1.5c-4.1 0-7.8-2.1-10.2-5.4c-.5-.7-1-1.5-1.4-2.3c-.2-.5-.3-1.2-.3-1.7V229.3c-1.3-1.4-2.5-2.8-3.8-4.2c-2.4-2.8-5-5.4-7.8-7.8c-6.1-5.3-13.1-9-21.1-10.3c-13.1-2.2-25.8 0-37.4 6.4c-9.3 5.2-16.7 12.1-21.8 21.1c-5.2 9.1-7.2 19-7.2 29.5c.1 10.1 1.9 19.8 6.1 28.8c4.6 9.9 11.3 18 20.3 24.1c11.1 7.5 23.4 11 36.6 9.8c11.1-.9 21.2-4.8 30-11.5c2.3-1.7 4.5-3.5 6.5-5.5l1.5-1.5c.2-.2 .4-.4 .7-.5c1.6-1.1 3.5-1.6 5.5-1.6c4.1 0 7.8-2.1 10.2-5.4c.5 .7 1 1.5 1.4 2.3c.5 1.1 .7 2.3 .7 3.5v12c0 10.5 0 20.9-.1 31.4c-.1 4.3-.1 8.6-.2 12.9c0 11.1-4.8 20.4-13.8 27c-12.4 9.1-26.4 13.6-41.5 13.5c-15.1-.1-29.3-3.6-42.5-11.2C130.6 448.5 108 424 93.3 392c-12.7-27.7-18.8-56.8-19.1-87.4c-.2-33.1 4-65.7 16.5-96.8c12.5-31.1 31.5-57.8 56.4-79.5c20.3-17.7 43.5-30.8 69.1-38.9c33-10.4 66.8-12.5 101-5.1c32.7 7 62.5 21.3 88.5 42.1c14.2 11.4 27.2 24 38.3 38.3c2.4 3.1 3.8 6.8 3.8 10.8c0 5-2.6 9.4-6.6 11.9c-1.8 1.2-4 1.8-6.1 1.8V174.1c-11.2-14.5-24-27.4-38.4-38.7c-25.5-20.1-54.6-34.1-86.4-40.8c-33.4-7.2-66.9-5.1-100 5.1c-24.8 7.7-47.5 19.9-67.4 36.4C102.3 157.1 82 186.2 69 221.7C55 259.9 50.3 299.8 50.3 340.5V360c.1 41.5 8 81.3 26 118.4c19.1 39.4 47.1 70.8 84.4 92.5c34.8 20.3 73.1 30.5 113.8 31c34.8 .4 68.3-6.8 98.9-23.7c31.1-17.2 54.3-42 66.7-75.1c2.1-5.7 3.3-11.6 3.4-17.7c.1-26.6 0-53.1 0-79.7V250.4c0-4.6-.3-9.2-.8-13.8c-.8-7.9-2.9-15.6-7-22.5c-7-11.7-17-19.8-29.2-24.8c-11.1-4.5-22.7-6.2-34.6-5c-17.8 1.8-33.2 8.5-46.1 21c-4.4 4.3-8.3 9-11.5 14.1c-2.4 3.9-4.3 8.1-5.8 12.5c-.5 1.5-.9 3.1-1.2 4.7c-.1 .5-.2 1.1-.2 1.6V235.7z"/></svg>`;

const socialLinks = [
  { name: 'Call', icon: Phone, href: 'tel:+254718574798', color: '#ffffff', hoverColor: '#22c55e', action: 'Call', label: 'Quick Call' },
  { name: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/254718574798', color: '#25D366', hoverColor: '#25D366', action: 'Chat', label: 'nderu.ke' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/shutterbebz_254?igsh=MWcyZnRkbmE1dWJoYg==', color: '#E1306C', hoverColor: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', action: 'Follow', label: '@shutterbebz_254' },
  { name: 'TikTok', isSvg: true, svg: TikTokIcon, href: 'https://www.tiktok.com/@shutterbebz_254?_r=1&_t=ZS-93SHWHK7SgH', color: '#ff0050', hoverColor: 'linear-gradient(90deg, #25F4EE 0%, #FE2C55 100%)', action: 'Watch', label: '@shutterbebz_254' },
  { name: 'Threads', isSvg: true, svg: ThreadsIcon, href: 'https://www.threads.com/@shutterbebz_254', color: '#ffffff', hoverColor: '#ffffff', action: 'View', label: '@shutterbebz_254' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/nderu', color: '#1877F2', hoverColor: '#0866FF', action: 'Connect', label: 'GathoniNderu' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/nderu-gathoni-67226b241/', color: '#0A66C2', hoverColor: '#0A66C2', action: 'Connect', label: 'Nderu Gathoni' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/gayhonipeter26', color: '#ffffff', hoverColor: '#2ea44f', action: 'Code', label: 'Nderu Gathoni' },
];

const isExpanded = ref(false);
const selectedSocial = ref<any>(null); 
const whatsappMessage = ref('');
const whatsappTitle = ref('');
const whatsappType = ref('Service');
const whatsappName = ref('');
const whatsappContact = ref('');
const whatsappCountryCode = ref('+254');
const isCustomCountry = ref(false);
const containerRef = ref<HTMLElement | null>(null);
const activeIndex = ref(2);

const handleCountryChange = (e: any) => {
  if (e.target.value === 'custom') {
    isCustomCountry.value = true;
    whatsappCountryCode.value = '+';
  }
};

const buildWhatsappUrl = (social: any) => {
  const fullMsg = `*New Inquiry from Website*
---
*Name:* ${whatsappName.value}
*Contact:* ${whatsappCountryCode.value}${whatsappContact.value}
*Type:* ${whatsappType.value}
*Title:* ${whatsappTitle.value}

*Message:* 
${whatsappMessage.value}`;
  return `${social.href}?text=${encodeURIComponent(fullMsg)}`;
};

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
  if (!isExpanded.value) selectedSocial.value = null;
};

const selectSocial = (social: any) => {
  selectedSocial.value = social;
};

const goBack = () => {
  selectedSocial.value = null;
};

const handleScroll = () => {
  if (!containerRef.value || !isExpanded.value || selectedSocial.value) return;
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
        :class="isExpanded ? (selectedSocial ? (selectedSocial.name === 'WhatsApp' ? 'w-[80vw] max-w-[360px] h-auto p-3' : 'w-[65vw] max-w-[260px] h-auto p-2.5') : 'w-[40vw] max-w-[220px] h-10 p-0.5') : 'w-7 h-7'"
        @click="!isExpanded && toggleExpand()">
        <!-- Viewfinder Corners (Visible in both states) -->
        <div class="absolute top-0.5 left-0.5 h-1 w-1 border-t border-l border-white/40"></div>
        <div class="absolute top-0.5 right-0.5 h-1 w-1 border-t border-r border-white/40"></div>
        <div class="absolute bottom-0.5 left-0.5 h-1 w-1 border-b border-l border-white/40"></div>
        <div class="absolute bottom-0.5 right-0.5 h-1 w-1 border-b border-r border-white/40"></div>

        <!-- Collapsed Icon -->
        <div v-if="!isExpanded" class="flex items-center justify-center w-full h-full">
          <div class="relative">
            <MessageSquare class="h-3 w-3 text-white" />
          </div>
        </div>

        <!-- Expanded Quick Panel Close -->
        <button v-if="isExpanded" @click.stop="toggleExpand"
          class="absolute top-1 right-1.5 z-30 h-5 w-5 flex items-center justify-center text-white/30 hover:text-white transition-colors">
          <X class="h-3 w-3" />
        </button>

        <!-- Expanded Content Switcher (Icons or Dialog) -->
        <transition mode="out-in" enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100"
          leave-to-class="opacity-0 -translate-y-4">
          <!-- PLATFORM DIALOG -->
          <div v-if="selectedSocial" :key="'dialog-' + selectedSocial.name" class="flex flex-col gap-3 h-auto w-full">
            <!-- Platform Header -->
            <div class="flex items-center gap-2 border-b border-white/10 pb-3">
              <!-- Tiny Back Button -->
              <button @click.stop="goBack"
                class="h-7 w-7 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all active:scale-95">
                <ChevronLeft class="h-3.5 w-3.5" />
              </button>
              <div
                class="h-7 w-7 shrink-0 flex items-center justify-center rounded-lg bg-white/5 border border-white/10">
                <component v-if="!selectedSocial.isSvg" :is="selectedSocial.icon" class="h-3.5 w-3.5"
                  :style="{ color: selectedSocial.color || 'white' }" />
                <div v-else v-html="selectedSocial.svg" class="h-3.5 w-3.5"
                  :style="{ color: selectedSocial.color || 'white' }"></div>
              </div>
              <div class="flex flex-col">
                <span class="text-[9px] uppercase tracking-[0.2em] text-white/30 font-black leading-none mb-0.5">{{
                  selectedSocial.name }}</span>
                <span class="text-[11px] text-white/60 font-medium leading-none">{{ selectedSocial.label }}</span>
              </div>
            </div>

            <!-- Platform Content (Vertical for WhatsApp, Horizontal for Others) -->
            <div class="w-full overflow-visible">
              <!-- WHATSAPP RICHER FORM -->
              <div v-if="selectedSocial.name === 'WhatsApp'" class="flex flex-col gap-2">
                <!-- Row 1: Name & Type -->
                <div class="grid grid-cols-2 gap-2">
                  <div class="flex flex-col gap-0.5">
                    <label class="text-[9px] text-white/40 uppercase tracking-widest font-black ml-0.5">Name</label>
                    <input v-model="whatsappName" @click.stop
                      class="bg-white/5 border border-white/10 rounded-lg text-[10px] text-white h-8 px-2 outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-white/10 shadow-inner"
                      placeholder="Full name..." />
                  </div>
                  <div class="flex flex-col gap-0.5">
                    <label class="text-[9px] text-white/40 uppercase tracking-widest font-black ml-0.5">Category</label>
                    <select v-model="whatsappType" @click.stop
                      class="bg-white/10 border border-white/10 rounded-lg text-[10px] text-white h-8 px-2 outline-none focus:ring-1 focus:ring-white/20 transition-all cursor-pointer shadow-inner appearance-none pr-6"
                      style="background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E'); background-repeat: no-repeat; background-position: right 0.4rem center; background-size: 0.8rem;">
                      <option value="Service" class="bg-zinc-900 text-white">Service</option>
                      <option value="Enquiry" class="bg-zinc-900 text-white">Enquiry</option>
                      <option value="Collaboration" class="bg-zinc-900 text-white">Collaboration</option>
                      <option value="Photography" class="bg-zinc-900 text-white">Photography</option>
                    </select>
                  </div>
                </div>

                <!-- Row 2: Phone with Country Code -->
                <div class="flex flex-col gap-0.5">
                  <label class="text-[9px] text-white/40 uppercase tracking-widest font-black ml-0.5">Phone
                    Number</label>
                  <div class="flex gap-1.5 items-center">
                    <div class="relative flex-shrink-0">
                      <select v-if="!isCustomCountry" v-model="whatsappCountryCode" @click.stop
                        @change="handleCountryChange"
                        class="bg-white/10 border border-white/10 rounded-lg text-[10px] text-white h-8 px-1 outline-none focus:ring-1 focus:ring-white/20 transition-all cursor-pointer shadow-inner appearance-none w-14 text-center">
                        <option value="+254" class="bg-zinc-900 text-white">🇰🇪 +254</option>
                        <option value="+256" class="bg-zinc-900 text-white">🇺🇬 +256</option>
                        <option value="+255" class="bg-zinc-900 text-white">🇹🇿 +255</option>
                        <option value="+44" class="bg-zinc-900 text-white">🇬🇧 +44</option>
                        <option value="+1" class="bg-zinc-900 text-white">🇺🇸 +1</option>
                        <option value="+971" class="bg-zinc-900 text-white">🇦🇪 +971</option>
                        <option value="custom"
                          class="bg-zinc-800 text-white/70 font-bold italic border-t border-white/10">Other...</option>
                      </select>
                      <div v-else class="flex items-center gap-1">
                        <input v-model="whatsappCountryCode" @click.stop type="text"
                          class="bg-white/15 border border-white/20 rounded-lg text-[10px] text-white h-8 w-11 px-1 outline-none focus:ring-1 focus:ring-white/30 transition-all shadow-inner text-center font-bold"
                          placeholder="+" autofocus />
                        <button @click.stop="isCustomCountry = false; whatsappCountryCode = '+254'"
                          class="text-[9px] text-white/30 hover:text-white/60 transition-colors uppercase font-black">
                          List
                        </button>
                      </div>
                    </div>
                    <input v-model="whatsappContact" @click.stop type="tel"
                      class="flex-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-white h-8 px-2 outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-white/10 shadow-inner"
                      placeholder="712345678" />
                  </div>
                </div>

                <!-- Row 3: Title -->
                <div class="flex flex-col gap-0.5">
                  <label class="text-[9px] text-white/40 uppercase tracking-widest font-black ml-0.5">Title</label>
                  <input v-model="whatsappTitle" @click.stop
                    class="bg-white/5 border border-white/10 rounded-lg text-[10px] text-white h-8 px-2 outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-white/10 font-medium shadow-inner"
                    placeholder="e.g. Website Overhaul, Branding..." />
                </div>

                <!-- Row 4: Message -->
                <div class="flex flex-col gap-0.5">
                  <label class="text-[9px] text-white/40 uppercase tracking-widest font-black ml-0.5">Message</label>
                  <textarea v-model="whatsappMessage" @click.stop
                    class="bg-white/5 border border-white/10 rounded-lg text-[10px] text-white p-2 outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-white/10 font-medium h-14 resize-none shadow-inner leading-normal"
                    placeholder="Share project context..."></textarea>
                </div>

                <!-- Send Button -->
                <a :href="buildWhatsappUrl(selectedSocial)" target="_blank" rel="noopener noreferrer"
                  class="h-8 w-full flex items-center justify-center gap-1.5 rounded-full bg-white text-black text-[9px] font-black uppercase tracking-widest hover:bg-green-500 hover:text-white transition-all active:scale-95 shadow-lg group">
                  <Send
                    class="h-2.5 w-2.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  Send Inquiry
                </a>
              </div>

              <!-- CALL OPTIONS (Two Numbers) -->
              <div v-else-if="selectedSocial.name === 'Call'" class="flex flex-col gap-2">
                <!-- Number 1 -->
                <div
                  class="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-xl p-2 pl-3">
                  <div class="flex flex-col">
                    <span class="text-[9px] text-white/40 uppercase tracking-widest font-black">Direct</span>
                    <span class="text-[12px] text-white font-sans font-medium tracking-normal leading-tight">+254 718
                      574 798</span>
                    <span class="text-[8px] text-green-400 font-medium leading-none mt-0.5">For Photography & General
                      Inquiries</span>
                  </div>
                  <a href="tel:+254718574798"
                    class="h-8 w-8 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition-transform active:scale-95">
                    <component :is="selectedSocial.icon" class="h-3.5 w-3.5" />
                  </a>
                </div>

                <!-- Number 2 -->
                <div
                  class="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-xl p-2 pl-3">
                  <div class="flex flex-col">
                    <span class="text-[9px] text-white/40 uppercase tracking-widest font-black">Support</span>
                    <span class="text-[12px] text-white font-sans font-medium tracking-normal leading-tight">+254 794
                      471 900</span>
                    <span class="text-[8px] text-green-400 font-medium leading-none mt-0.5">For Technical Support & Web
                      Dev</span>
                  </div>
                  <a href="tel:+254716140476"
                    class="h-8 w-8 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition-transform active:scale-95">
                    <component :is="selectedSocial.icon" class="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <!-- OTHER PLATFORMS (Compact Horizontal) -->
              <div v-else class="flex flex-col items-center justify-center gap-2 h-auto py-1 text-center">
                <div class="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 shadow-inner w-full">
                  <span class="text-[10px] text-white font-bold tracking-tight block truncate">{{ selectedSocial.label
                  }}</span>
                </div>
                <a :href="selectedSocial.href" target="_blank" rel="noopener noreferrer"
                  class="h-8 w-full flex items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 active:scale-95 shadow-lg text-[9px] font-black uppercase tracking-widest border border-white/10 hover:border-transparent visit-button"
                  :class="{
                    'hover-whatsapp': selectedSocial.name === 'WhatsApp',
                    'hover-instagram': selectedSocial.name === 'Instagram',
                    'hover-tiktok': selectedSocial.name === 'TikTok',
                    'hover-threads': selectedSocial.name === 'Threads',
                    'hover-facebook': selectedSocial.name === 'Facebook',
                    'hover-linkedin': selectedSocial.name === 'LinkedIn',
                    'hover-github': selectedSocial.name === 'GitHub',
                    'hover-call': selectedSocial.name === 'Call'
                  }">
                  {{ selectedSocial.name === 'Call' ? 'Call Now' : 'Visit Account' }}
                </a>
              </div>
            </div>
          </div>

          <!-- ICONS LIST -->
          <div v-else-if="isExpanded" :key="'icons'" ref="containerRef"
            class="flex items-center gap-1 h-full overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6"
            style="-ms-overflow-style: none; scrollbar-width: none; overscroll-behavior-x: contain;">
            <div v-for="(social, index) in socialLinks" :key="social.name" @click.stop="selectSocial(social)"
              class="social-item flex-shrink-0 flex flex-col items-center justify-center min-w-[2rem] h-full transition-all duration-300 active:scale-75 snap-center cursor-pointer"
              :style="{
                transform: `scale(var(--scale, 1))`,
                opacity: `var(--opacity, 0.6)`
              }">
              <div class="h-6 w-6 flex items-center justify-center rounded-md bg-white/5 border border-white/10">
                <component v-if="!social.isSvg" :is="social.icon" class="h-3 w-3 text-white transition-colors" />
                <div v-else v-html="social.svg" class="h-3 w-3 text-white transition-colors"></div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Samsung Pill Indicator -->
      <transition enter-active-class="duration-300 ease-out" enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0">
        <div v-if="isExpanded" class="w-4 h-0.5 bg-white/20 rounded-full mt-1.5 overflow-hidden">
          <div class="h-full bg-white/60 transition-all duration-300 ease-out rounded-full" :style="{
            width: '20%',
            marginLeft: `${(activeIndex / (socialLinks.length - 1)) * 80}%`
          }"></div>
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

/* Brand Hover Effects */
.visit-button {
  transition: all 0.3s ease;
}

.hover-whatsapp:hover {
  background-color: #25D366 !important;
  color: white !important;
}

.hover-instagram:hover {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%) !important;
  color: white !important;
}

.hover-tiktok:hover {
  background: linear-gradient(90deg, #25F4EE 0%, #FE2C55 100%) !important;
  color: white !important;
}

.hover-threads:hover {
  background-color: white !important;
  color: black !important;
}

.hover-facebook:hover {
  background-color: #0866FF !important;
  color: white !important;
}

.hover-linkedin:hover {
  background-color: #0A66C2 !important;
  color: white !important;
}

.hover-github:hover {
  background-color: #2ea44f !important;
  color: white !important;
}

.hover-call:hover {
  background-color: #22c55e !important;
  color: white !important;
}
</style>
