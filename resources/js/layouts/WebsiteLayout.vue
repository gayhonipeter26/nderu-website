<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { Menu } from 'lucide-vue-next';
import { computed } from 'vue';
import { Button } from '@/components/ui/button/index';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet/index';
import WebsiteMegaMenu from '@/components/WebsiteMegaMenu.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';
import MobileSocialBar from '@/components/MobileSocialBar.vue';
import { ref } from 'vue';
import { ChevronUp, ChevronDown } from 'lucide-vue-next';

defineProps<{ loadingDescription?: string; }>();

const page = usePage();
const currentUrl = computed(() => (page.props as any).ziggy?.location || '');
const isMenuVisible = ref(true);

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};



const isActive = (href: string) => {
  if (href === '/') {
    return currentUrl.value === href;
  }
  return currentUrl.value.startsWith(href);
};
</script>

<template>
  <div class="min-h-screen bg-background text-foreground flex flex-col relative">
    <!-- Persistent Toggle Button (Top Right) -->
    <div class="fixed top-2 right-4 z-[100] hidden md:block">
      <Button variant="secondary" size="icon"
        class="h-8 w-8 rounded-full shadow-lg bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 transition-all hover:scale-105"
        @click="toggleMenu" :title="isMenuVisible ? 'Hide Menu' : 'Show Menu'">
        <ChevronUp v-if="isMenuVisible" class="h-4 w-4" />
        <ChevronDown v-else class="h-4 w-4" />
      </Button>
    </div>

    <header
      class="border-b bg-black transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden z-[90] fixed top-0 w-full left-0"
      :class="isMenuVisible ? 'h-16 opacity-100' : 'h-0 opacity-0 border-none pointer-events-none'">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between gap-4">
          <Link href="/" class="text-lg font-semibold tracking-tight text-white">
            NDERU.KE
          </Link>

          <!-- Desktop Mega Menu -->
          <div class="hidden md:flex flex-1 items-center justify-center">
            <WebsiteMegaMenu />
          </div>

          <!-- Spacer for the floating toggle on the right -->
          <div class="hidden md:block w-10"></div>

          <!-- Mobile Menu -->
          <div class="md:hidden">
            <Sheet>
              <SheetTrigger as-child>
                <Button variant="ghost" size="icon" class="text-white hover:text-white">
                  <Menu class="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" class="w-72">
                <div class="mt-6 flex flex-col gap-2 text-sm font-medium">
                  <Link href="/" :class="[
                    'px-3 py-2 rounded-md transition-colors',
                    isActive('/') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                  ]">
                    Home
                  </Link>
                  <Link href="/about" :class="[
                    'px-3 py-2 rounded-md transition-colors',
                    isActive('/about') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                  ]">
                    About
                  </Link>

                  <Link href="/services" :class="[
                    'px-3 py-2 rounded-md transition-colors',
                    isActive('/services') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                  ]">
                    Services
                  </Link>
                  <Link href="/projects" :class="[
                    'px-3 py-2 rounded-md transition-colors',
                    isActive('/projects') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                  ]">
                    Coding
                  </Link>
                  <Link href="/photography" :class="[
                    'px-3 py-2 rounded-md transition-colors',
                    isActive('/photography') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                  ]">
                    Photography
                  </Link>

                  <Link href="/blog" :class="[
                    'px-3 py-2 rounded-md transition-colors',
                    isActive('/blog') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                  ]">
                    Blog
                  </Link>
                  <Link href="/contact" :class="[
                    'px-3 py-2 rounded-md transition-colors',
                    isActive('/contact') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                  ]">
                    Contact
                  </Link>
                  <div class="px-3 py-4 flex items-center gap-2 mt-4 border-t border-muted/50">
                    <img src="https://flagcdn.com/w40/ke.png" srcset="https://flagcdn.com/w80/ke.png 2x" width="40"
                      alt="Kenya" class="inline-block rounded shadow-md animate-flag-wave" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>

    <div class="h-16 w-full shrink-0"></div>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid gap-6 md:grid-cols-4 text-sm">
          <div class="space-y-2">
            <p class="font-semibold">NDERU.KE</p>
            <p class="text-muted-foreground">
              Transforming ideas into digital experiences through software and photography.
            </p>
          </div>
          <div class="space-y-2">
            <p class="font-semibold">Quick Links</p>
            <div class="flex flex-col gap-1 text-muted-foreground">
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
              <Link href="/projects">Coding</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div class="space-y-2">
            <p class="font-semibold">Services</p>
            <div class="flex flex-col gap-1 text-muted-foreground">
              <Link href="/services">Web Development</Link>
              <Link href="/services">System Architecture</Link>
              <Link href="/services">Photography</Link>
              <Link href="/services">Consulting</Link>
            </div>
          </div>
          <div class="space-y-2">
            <p class="font-semibold">Contact</p>
            <div class="flex flex-col gap-1 text-muted-foreground">
              <span>Nairobi, Kenya</span>
              <span>Available globally</span>
            </div>
          </div>
        </div>
        <p class="mt-8 text-center text-xs text-muted-foreground">&copy; 2024 NDERU.KE. All rights reserved.</p>
      </div>
    </footer>

    <!-- Global Components -->
    <ScrollToTop />
    <MobileSocialBar />
  </div>
</template>
