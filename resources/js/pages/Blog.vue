<script setup lang="tsx">
import { Search } from 'lucide-vue-next';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import BlogHeroYoutubeWrapper from '@/components/BlogHeroYoutubeWrapper.vue';
import ContactCardWrapper from '@/components/ContactCardWrapper.vue';
import { Button } from '@/components/ui/button/index';
import ArticleCardBlogDemo from '@/components/ui/card-23-blog-demo';
import { Input } from '@/components/ui/input/index';
import { VideoArticlesList } from '@/components/ui/video-article-card';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

type Post = {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  reading_time: string | null;
  published_at: string | null;
  cover_image_url: string | null;
  feature_video_url: string | null;
  status: string;
  likes_count: number;
  gallery_count?: number;
  created_at?: string;
  updated_at: string;
  category?: string;
  tags?: string[];
  author?: string;
  featured?: boolean;
  gallery?: { id: number | string; url: string; kind: 'image' | 'video' }[];
};

const props = defineProps<{ posts: Post[] }>();

const videoListContainer = ref<HTMLDivElement | null>(null);
const articleCardContainer = ref<HTMLDivElement | null>(null);

let videoListRoot: Root | null = null;
let articleCardRoot: Root | null = null;

const featuredVideos = computed(() =>
  (props.posts || []).filter(post => post.feature_video_url)
);

onMounted(() => {
  if (videoListContainer.value) {
    videoListRoot = createRoot(videoListContainer.value);
    videoListRoot.render(
      <React.StrictMode>
        <VideoArticlesList articles={featuredVideos.value} />
      </React.StrictMode>,
    );
  }

  if (articleCardContainer.value) {
    articleCardRoot = createRoot(articleCardContainer.value);
    articleCardRoot.render(
      <React.StrictMode>
        <ArticleCardBlogDemo posts={props.posts} />
      </React.StrictMode>,
    );
  }
});

onBeforeUnmount(() => {
  if (videoListRoot) {
    videoListRoot.unmount();
    videoListRoot = null;
  }
  if (articleCardRoot) {
    articleCardRoot.unmount();
    articleCardRoot = null;
  }
});

const posts = computed(() => props.posts || []);

const categories = computed(() => {
  if (!Array.isArray(posts.value)) {
    return [{ value: 'all', label: 'All posts' }];
  }

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
const activeTab = ref<'articles' | 'videos'>('articles');

const filteredPosts = computed(() => {
  if (!Array.isArray(posts.value)) {
    return [];
  }

  return posts.value.filter((post) => {
    const matchesCategory =
      selectedCategory.value === 'all' || post.category === selectedCategory.value;
    const matchesQuery = query.value
      ? [post.title, post.summary ?? '']
        .join(' ')
        .toLowerCase()
        .includes(query.value.toLowerCase())
      : true;
    return matchesCategory && matchesQuery;
  });
});

// Watch for changes in filteredPosts and re-render React component
watch(filteredPosts, (newPosts) => {
  if (articleCardContainer.value && articleCardRoot) {
    articleCardRoot.render(
      <React.StrictMode>
        <ArticleCardBlogDemo posts={newPosts} />
      </React.StrictMode>,
    );
  }
});

watch(featuredVideos, (newVideos) => {
  if (videoListContainer.value && videoListRoot) {
    videoListRoot.render(
      <React.StrictMode>
        <VideoArticlesList articles={newVideos} />
      </React.StrictMode>,
    );
  }
});


</script>

<template>
  <WebsiteLayout>
    <section id="blog-hero" class="border-b bg-background">
      <BlogHeroYoutubeWrapper />
    </section>

    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div class="flex flex-1 items-center gap-3">
              <div class="relative w-full md:w-64">
                <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input v-model="query" placeholder="Search posts" class="pl-9" />
              </div>
              <span class="text-sm text-muted-foreground">{{ filteredPosts.length }} results</span>
            </div>

            <div class="flex items-center gap-1 bg-muted/30 p-1 rounded-lg self-start md:self-auto">
              <Button size="sm" :variant="activeTab === 'articles' ? 'secondary' : 'ghost'"
                class="text-xs h-8 px-4 rounded-md transition-all" @click="activeTab = 'articles'">
                Articles
              </Button>
              <Button size="sm" :variant="activeTab === 'videos' ? 'secondary' : 'ghost'"
                class="text-xs h-8 px-4 rounded-md transition-all" @click="activeTab = 'videos'">
                Videos
              </Button>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 border-t pt-6" v-if="activeTab === 'articles'">
            <Button v-for="category in categories" :key="category.value" size="sm"
              :variant="selectedCategory === category.value ? 'default' : 'outline'" class="capitalize"
              @click="selectedCategory = category.value">
              {{ category.label }}
            </Button>
          </div>
        </div>
      </div>
    </section>

    <div v-show="activeTab === 'videos'" ref="videoListContainer" class="bg-background min-h-[400px]"></div>

    <section v-show="activeTab === 'articles'" class="bg-background min-h-[400px]">
      <div ref="articleCardContainer" class="w-full">
        <!-- Article Cards component will be mounted here -->
      </div>
    </section>

    <section class="bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div class="max-w-3xl mx-auto">
          <ContactCardWrapper type="secure-gateway" />
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
