<script setup lang="ts">
import { computed, ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, Users, Package, Calendar, MapPin, Play, Search } from 'lucide-vue-next';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

type Session = {
  id: number;
  title: string;
  summary: string | null;
  location: string | null;
  deliverables: number | null;
  status: 'Published' | 'Draft';
  scheduled_at: string | null;
  hero_image_url: string | null;
  highlight_video_url: string | null;
};

type ResourceCollection<T> = { data: T[] };

const props = defineProps<{ sessions: Session[] | ResourceCollection<Session> }>();

const sessions = computed<Session[]>(() => {
  const source = props.sessions;
  if (Array.isArray(source)) {
    return source;
  }

  if (source && Array.isArray(source.data)) {
    return source.data;
  }

  return [];
});

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-');

const categories = computed(() => {
  const statusIcons: Record<string, any> = {
    published: Users,
    draft: Package,
  };

  const uniqueStatuses = Array.from(
    new Set(
      sessions.value
        .map((session) => session.status)
        .filter((status): status is Session['status'] => Boolean(status)),
    ),
  );

  return [{ value: 'all', label: 'All work', icon: Camera }].concat(
    uniqueStatuses.map((status) => {
      const value = slugify(status);
      return {
        value,
        label: status,
        icon: statusIcons[value] ?? MapPin,
      };
    }),
  );
});

const selectedCategory = ref('all');
const query = ref('');

const filteredSessions = computed(() => {
  return sessions.value.filter((session) => {
    const statusValue = slugify(session.status);
    const matchesCategory =
      selectedCategory.value === 'all' || statusValue === selectedCategory.value;
    const matchesQuery = query.value
      ? [session.title, session.summary ?? '', session.location ?? '']
          .join(' ')
          .toLowerCase()
          .includes(query.value.toLowerCase())
      : true;
    return matchesCategory && matchesQuery;
  });
});
</script>

<template>
  <WebsiteLayout>
    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="space-y-4 text-center">
          <Badge variant="secondary" class="mx-auto w-fit">Photography</Badge>
          <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">
            Visual storytelling for events, people, and products
          </h1>
          <p class="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Flexible photography services with an emphasis on planning, reliable delivery, and clear rights usage for
            marketing teams.
          </p>
          <div class="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button as-child>
              <Link href="/contact">Book a session</Link>
            </Button>
            <Button variant="outline" as-child>
              <Link href="/services">Review services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div class="flex flex-1 items-center gap-3">
            <div class="relative w-full md:w-64">
              <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input v-model="query" placeholder="Search sessions" class="pl-9" />
            </div>
            <span class="text-sm text-muted-foreground">{{ filteredSessions.length }} results</span>
          </div>
          <div class="flex flex-wrap gap-2">
            <Button
              v-for="category in categories"
              :key="category.value"
              size="sm"
              :variant="selectedCategory === category.value ? 'default' : 'outline'"
              class="capitalize"
              @click="selectedCategory = category.value"
            >
              <component :is="category.icon" class="mr-2 h-4 w-4" />
              {{ category.label }}
            </Button>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div v-if="filteredSessions.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card v-for="session in filteredSessions" :key="session.id" class="overflow-hidden">
            <div v-if="session.hero_image_url" class="relative aspect-video w-full bg-muted">
              <img
                :src="session.hero_image_url"
                :alt="`Preview of ${session.title}`"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <CardHeader class="space-y-3">
              <div class="flex items-center justify-between text-xs text-muted-foreground">
                <span class="flex items-center gap-1">
                  <MapPin class="h-3.5 w-3.5" />
                  {{ session.location ?? 'Location TBC' }}
                </span>
                <span class="flex items-center gap-1">
                  <Calendar class="h-3.5 w-3.5" />
                  {{ session.scheduled_at ?? 'Unscheduled' }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <CardTitle class="text-lg">{{ session.title }}</CardTitle>
                <Badge :variant="session.status === 'Published' ? 'default' : 'outline'" class="text-xs capitalize">
                  {{ session.status }}
                </Badge>
              </div>
              <CardDescription>{{ session.summary ?? 'Session summary coming soon.' }}</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4 text-sm text-muted-foreground">
              <div class="rounded-md border bg-muted/30 px-3 py-2">
                <p class="font-medium text-foreground">Deliverables planned</p>
                <p>{{ session.deliverables ?? 0 }} items</p>
              </div>
              <div v-if="session.highlight_video_url" class="space-y-2">
                <p class="font-medium text-foreground">Highlight reel</p>
                <video
                  controls
                  preload="metadata"
                  class="h-40 w-full overflow-hidden rounded-md border bg-black"
                >
                  <source :src="session.highlight_video_url" type="video/mp4" />
                  <source :src="session.highlight_video_url" type="video/quicktime" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </CardContent>
          </Card>
        </div>

        <div v-else class="py-16 text-center">
          <p class="text-sm text-muted-foreground">No sessions match the selected filters.</p>
          <Button variant="outline" class="mt-4" @click="selectedCategory = 'all'; query = ''">
            Reset filters
          </Button>
        </div>
      </div>
    </section>

    <section class="bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Card class="max-w-3xl mx-auto">
          <CardHeader class="space-y-2 text-center">
            <CardTitle class="text-2xl">Next steps</CardTitle>
            <CardDescription>
              Share the brief, preferred dates, and distribution channels to receive a detailed shooting plan and quote.
            </CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button as-child>
              <Link href="/contact">Schedule consultation</Link>
            </Button>
            <Button variant="outline" as-child>
              <Link href="/services">View full service list</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  </WebsiteLayout>
</template>
