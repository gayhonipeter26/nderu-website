<script setup lang="ts">
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card/index';
import { Badge } from '@/components/ui/badge/index';
import { Button } from '@/components/ui/button/index';
import { ArrowUpRight } from 'lucide-vue-next';

type Stat = {
  label: string;
  value: number;
};

type Activity = {
  title: string;
  timestamp: string;
};

const props = defineProps<{ stats: Stat[]; recentActivity: Activity[] }>();

const breadcrumbs = computed(() => [
  { title: 'Admin', href: '/admin' },
  { title: 'Dashboard' },
]);

const quickLinks = [
  { title: 'Manage services', href: '/admin/services' },
  { title: 'Update projects', href: '/admin/projects' },
  { title: 'Write blog post', href: '/admin/blog' },
  { title: 'Review photography sessions', href: '/admin/photography' },
  { title: 'Edit FAQs', href: '/admin/faqs' },
  { title: 'Contact channels', href: '/admin/contact' },
];
</script>

<template>
  <AdminLayout :breadcrumbs="breadcrumbs">
    <div class="grid gap-6 p-6">
      <div class="flex flex-col gap-2">
        <Badge variant="secondary" class="w-fit">Overview</Badge>
        <h1 class="text-3xl font-semibold tracking-tight">Content operations</h1>
        <p class="text-muted-foreground text-sm">
          Review performance at a glance and jump directly into editing site content.
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card v-for="stat in props.stats" :key="stat.label">
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-medium text-muted-foreground">{{ stat.label }}</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-2xl font-semibold">{{ stat.value }}</p>
          </CardContent>
        </Card>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0">
            <CardTitle class="text-base">Recent activity</CardTitle>
            <Badge variant="outline" class="text-xs">Automatic feed</Badge>
          </CardHeader>
          <CardContent>
            <ul class="space-y-4 text-sm text-muted-foreground">
              <li
                v-for="item in props.recentActivity"
                :key="item.title"
                class="border-b last:border-0 pb-4 last:pb-0"
              >
                <p class="text-foreground font-medium">{{ item.title }}</p>
                <p>{{ item.timestamp }}</p>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0">
            <CardTitle class="text-base">Quick links</CardTitle>
            <Badge variant="outline" class="text-xs">Navigation</Badge>
          </CardHeader>
          <CardContent class="grid gap-3">
            <Button
              v-for="link in quickLinks"
              :key="link.href"
              as-child
              variant="outline"
              class="justify-between"
            >
              <Link :href="link.href">
                <span>{{ link.title }}</span>
                <ArrowUpRight class="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </AdminLayout>
</template>
