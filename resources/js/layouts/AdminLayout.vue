<script setup lang="ts">
import AppSidebarLayout from '@/layouts/app/AppSidebarLayout.vue';
import type { BreadcrumbItem, NavItem } from '@/types';
import { ClipboardList, Image, Layers, MessagesSquare, Newspaper, Phone, Settings2 } from 'lucide-vue-next';
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

type Props = {
  breadcrumbs?: BreadcrumbItem[];
};

const props = withDefaults(defineProps<Props>(), {
  breadcrumbs: () => [],
});

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/admin', icon: Settings2 },
  { title: 'Services', href: '/admin/services', icon: ClipboardList },
  { title: 'Projects', href: '/admin/projects', icon: Layers },
  { title: 'Blog', href: '/admin/blog', icon: Newspaper },
  { title: 'Photography', href: '/admin/photography', icon: Image },
  { title: 'FAQs', href: '/admin/faqs', icon: MessagesSquare },
  { title: 'Contact', href: '/admin/contact', icon: Phone },
];

const page = usePage();

const enhancedNav = computed(() =>
  navItems.map((item) => ({
    ...item,
    isActive: page.url === item.href,
  })),
);
</script>

<template>
  <AppSidebarLayout :breadcrumbs="props.breadcrumbs" :navItems="enhancedNav">
    <slot />
  </AppSidebarLayout>
</template>
