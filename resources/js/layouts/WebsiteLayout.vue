<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { Menu } from 'lucide-vue-next';
import { computed } from 'vue';
import { Button } from '@/components/ui/button/index';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet/index';
import WebsiteMegaMenu from '@/components/WebsiteMegaMenu.vue';

defineProps<{ loadingDescription?: string; }>();

const page = usePage();
const currentUrl = computed(() => (page.props as any).ziggy?.location || '');



const isActive = (href: string) => {
  if (href === '/') {
    return currentUrl.value === href;
  }
  return currentUrl.value.startsWith(href);
};
</script>

<template>
  <div class="min-h-screen bg-background text-foreground flex flex-col">
    <header class="border-b bg-black">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between gap-4">
          <Link href="/" class="text-lg font-semibold tracking-tight text-white">
            NDERU.KE
          </Link>

          <!-- Desktop Mega Menu -->
          <div class="hidden md:flex flex-1 items-center justify-center">
            <WebsiteMegaMenu />
          </div>

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
                    Projects
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
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>

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
              <Link href="/projects">Projects</Link>
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
  </div>
</template>
