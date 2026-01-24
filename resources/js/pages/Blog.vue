<script setup lang="ts">
import { computed, ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Search, Play } from 'lucide-vue-next';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

type Post = {
  id: number;
  title: string;
  summary: string | null;
  reading_time: string | null;
  published_at: string | null;
  cover_image_url: string | null;
  feature_video_url: string | null;
  status: string;
  category?: string | null;
};

type ResourceCollection<T> = { data: T[] };

const props = defineProps<{ posts: Post[] | ResourceCollection<Post> }>();

const posts = computed<Post[]>(() => {
  const source = props.posts;
  if (Array.isArray(source)) {
    return source;
  }

  if (source && Array.isArray(source.data)) {
    return source.data;
  }

  return [];
});

const categories = computed(() => {
  const unique = Array.from(
    new Set(
      posts.value
        .map((post) => post.category)
        .filter((category): category is string => Boolean(category)),
    ),
  );

  return [{ value: 'all', label: 'All posts' }].concat(
    unique.map((category) => ({ value: category, label: category })),
  );
});

const selectedCategory = ref('all');
const query = ref('');

const filteredPosts = computed(() => {
  return posts.value.filter((post) => {
    const matchesCategory =
      selectedCategory.value === 'all' || post.category === selectedCategory.value;
    const matchesQuery = query.value
      ? [post.title, post.summary ?? '', post.reading_time ?? '']
          .join(' ')
          .toLowerCase()
          .includes(query.value.toLowerCase())
      : true;
    return matchesCategory && matchesQuery;
  });
});

const formatDate = (value: string | null) => {
  if (!value) {
    return 'Unscheduled';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};
</script>

<template>
  <WebsiteLayout>
    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="space-y-4 text-center">
          <Badge variant="secondary" class="mx-auto w-fit">Blog</Badge>
          <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">
            Field notes on engineering, consulting, and creative practice
          </h1>
          <p class="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Writing that documents lessons from client engagements, product builds, and photography work.
          </p>
          <Button as-child>
            <Link href="/contact">Request a topic</Link>
          </Button>
        </div>
      </div>
    </section>

    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div class="flex flex-1 items-center gap-3">
            <div class="relative w-full md:w-64">
              <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input v-model="query" placeholder="Search posts" class="pl-9" />
            </div>
            <span class="text-sm text-muted-foreground">{{ filteredPosts.length }} results</span>
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
              {{ category.label }}
            </Button>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card v-for="post in filteredPosts" :key="post.id">
            <div v-if="post.cover_image_url" class="relative aspect-video w-full bg-muted">
              <img
                :src="post.cover_image_url"
                :alt="`Cover image for ${post.title}`"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <CardHeader class="space-y-3">
              <div class="flex items-center justify-between text-xs text-muted-foreground">
                <span class="flex items-center gap-1">
                  <Calendar class="h-3.5 w-3.5" />
                  {{ formatDate(post.published_at) }}
                </span>
                <span class="flex items-center gap-1">
                  <Clock class="h-3.5 w-3.5" />
                  {{ post.reading_time ?? '—' }}
                </span>
              </div>
              <CardTitle class="text-lg">{{ post.title }}</CardTitle>
              <CardDescription>{{ post.summary ?? 'Summary coming soon.' }}</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4 text-sm text-muted-foreground">
              <div v-if="post.feature_video_url" class="space-y-2">
                <p class="flex items-center gap-2 font-medium text-foreground">
                  <Play class="h-4 w-4" /> Feature video
                </p>
                <video controls preload="metadata" class="h-40 w-full overflow-hidden rounded-md border bg-black">
                  <source :src="post.feature_video_url" type="video/mp4" />
                  <source :src="post.feature_video_url" type="video/quicktime" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <Button variant="outline" size="sm" as-child>
                <Link href="/contact">Request full article</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div v-if="filteredPosts.length === 0" class="text-center py-16">
          <p class="text-sm text-muted-foreground">No posts match the current search.</p>
          <Button variant="outline" class="mt-4" @click="selectedCategory = 'all'; query = ''">
            Clear search
          </Button>
        </div>
      </div>
    </section>

    <section class="bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Card class="max-w-3xl mx-auto">
          <CardHeader class="space-y-2 text-center">
            <CardTitle class="text-2xl">Stay in touch</CardTitle>
            <CardDescription>
              Receive a quarterly summary of published articles and upcoming projects.
            </CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Input placeholder="you@email.com" class="sm:w-60" />
            <Button>Subscribe</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  </WebsiteLayout>
</template>
