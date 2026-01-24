<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-vue-next';

const page = usePage();
const currentUrl = computed(() => page.props.ziggy?.location || '');

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Photography', href: '/photography' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

const isActive = (href: string) => {
  if (href === '/') {
    return currentUrl.value === href;
  }
  return currentUrl.value.startsWith(href);
};
</script>

<template>
  <div class="min-h-screen bg-background text-foreground flex flex-col">
    <header class="border-b">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between gap-4">
          <Link href="/" class="text-lg font-semibold tracking-tight">
            NDERU.KE
          </Link>

          <nav class="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              :class="[
                'px-3 py-2 rounded-md transition-colors',
                isActive(item.href) ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
              ]"
            >
              {{ item.name }}
            </Link>
          </nav>

          <div class="md:hidden">
            <Sheet>
              <SheetTrigger as-child>
                <Button variant="ghost" size="icon">
                  <Menu class="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" class="w-72">
                <div class="mt-6 flex flex-col gap-2 text-sm font-medium">
                  <Link
                    v-for="item in navigation"
                    :key="item.name"
                    :href="item.href"
                    :class="[
                      'px-3 py-2 rounded-md transition-colors',
                      isActive(item.href) ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                    ]"
                  >
                    {{ item.name }}
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
