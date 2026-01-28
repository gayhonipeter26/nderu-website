<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { router } from '@inertiajs/vue3';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';
import { Badge } from '@/components/ui/badge/index';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index';
import { Button } from '@/components/ui/button/index';
import MediaCarousel from '@/components/MediaCarousel.vue';
import {
  Heart,
  MessageSquare,
  Calendar,
  Clock,
  BookmarkCheck,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Music2,
  MapPin,
  ArrowLeft,
} from 'lucide-vue-next';
import ContactCardWrapper from '@/components/ContactCardWrapper.vue';
import { Link } from '@inertiajs/vue3';

interface Comment {
  id: number;
  author_name: string;
  author_email: string | null;
  body: string;
  created_at: string | null;
}

interface Post {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  body: string | null;
  reading_time: string | null;
  published_at: string | null;
  cover_image_url: string | null;
  feature_video_url: string | null;
  likes_count: number;
  gallery?: { id: number | string; url: string; kind: 'image' | 'video' }[];
}

const props = defineProps<{
  post: Post;
  comments: Comment[];
}>();

const formattedComments = computed(() =>
  props.comments.map((comment) => ({
    ...comment,
    displayDate: comment.created_at
      ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date(comment.created_at))
      : 'Recently',
  })),
);


const likeArticle = () => {
  router.post(`/blog/${props.post.slug}/like`, {}, {
    preserveScroll: true,
    preserveState: true,
  });
};

const mediaSlides = computed(() => {
  const slides: { id: string | number; url: string; kind: 'image' | 'video' }[] = [];

  if (Array.isArray(props.post.gallery) && props.post.gallery.length) {
    slides.push(
      ...props.post.gallery.map((asset) => ({
        id: `gallery-${asset.id}`,
        url: asset.url,
        kind: asset.kind,
      })),
    );
  }

  if (props.post.cover_image_url && !slides.some((asset) => asset.kind === 'image' && asset.url === props.post.cover_image_url)) {
    slides.push({
      id: 'cover',
      url: props.post.cover_image_url,
      kind: 'image',
    });
  }

  if (props.post.feature_video_url && !slides.some((asset) => asset.kind === 'video' && asset.url === props.post.feature_video_url)) {
    slides.push({
      id: 'feature-video',
      url: props.post.feature_video_url,
      kind: 'video',
    });
  }

  return slides;
});

const shareUrl = ref('');

onMounted(() => {
  if (typeof window !== 'undefined') {
    shareUrl.value = window.location.href;
  }
});

const shareButtons = computed(() => {
  const url = shareUrl.value || (typeof window !== 'undefined' ? window.location.href : '');
  const encoded = encodeURIComponent(url);

  return [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encoded}`,
    },
    {
      name: 'TikTok',
      icon: Music2,
      href: `https://www.tiktok.com/share?url=${encoded}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encoded}`,
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: `https://www.instagram.com/?url=${encoded}`,
    },
  ];
});

const showCommentForm = ref(false);

const toggleCommentForm = () => {
  showCommentForm.value = !showCommentForm.value;
};
</script>

<template>
  <WebsiteLayout>
    <!-- Split Screen Layout -->
    <section class="min-h-screen py-6">
      <div class="grid lg:grid-cols-2 min-h-[calc(100vh-3rem)]">
        <!-- Left Column: Fixed Image with Overlays -->
        <div class="relative hidden lg:block sticky top-6 h-[calc(100vh-3rem)]">
          <!-- Image Container with Padding -->
          <div class="h-full w-full p-6">
            <div class="relative h-full w-full rounded-2xl overflow-hidden bg-black">
              <!-- Background Image -->
              <MediaCarousel v-if="mediaSlides.length" :media="mediaSlides" class="h-full w-full"
                height-class="h-full" />
              <div v-else-if="props.post.cover_image_url" class="h-full w-full">
                <img :src="props.post.cover_image_url" :alt="`Cover image for ${props.post.title}`"
                  class="h-full w-full object-cover" />
              </div>
              <div v-else
                class="h-full w-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <div class="text-white/50 text-center">
                  <BookmarkCheck class="h-16 w-16 mx-auto mb-4" />
                  <p class="text-lg">Article Image</p>
                </div>
              </div>

              <!-- Dark Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <!-- Bottom Left: Location Badge -->
              <div class="absolute bottom-6 left-6 flex items-center gap-3 text-white">
                <div class="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <MapPin class="h-5 w-5" />
                </div>
                <div>
                  <p class="text-sm font-semibold">Nairobi</p>
                  <p class="text-xs opacity-90">Kenya</p>
                </div>
              </div>

              <!-- Bottom Right: Share Icons & Like Button -->
              <div class="absolute bottom-6 right-6 flex flex-col gap-3">
                <!-- Like Button -->
                <button @click="likeArticle"
                  class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white border border-white/20">
                  <Heart class="h-4 w-4" />
                  <span class="text-sm font-medium">{{ props.post.likes_count }}</span>
                </button>

                <!-- Share Icons -->
                <div class="flex flex-col gap-2">
                  <a v-for="button in shareButtons" :key="button.name" :href="button.href" target="_blank"
                    rel="noreferrer" :title="button.name"
                    class="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center text-white border border-white/20">
                    <component :is="button.icon" class="h-4 w-4" />
                  </a>

                  <!-- Comment Toggle Button -->
                  <button @click="toggleCommentForm" :title="showCommentForm ? 'Hide comments' : 'Show comments'"
                    :class="[
                      'h-10 w-10 rounded-full backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center text-white border border-white/20',
                      showCommentForm ? 'bg-white/20' : 'bg-white/10'
                    ]">
                    <MessageSquare class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Scrollable Content -->
        <div class="bg-background overflow-y-auto">
          <div class="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
            <!-- Back Button -->
            <Button variant="ghost" class="pl-0 gap-2 hover:bg-transparent hover:text-primary mb-6" as-child>
              <Link href="/blog">
                <ArrowLeft class="h-4 w-4" />
                Back to Articles
              </Link>
            </Button>

            <!-- Mobile Image (shown only on small screens) -->
            <div class="lg:hidden mb-8">
              <MediaCarousel v-if="mediaSlides.length" :media="mediaSlides" class="bg-muted rounded-2xl"
                height-class="aspect-[4/3]" />
              <div v-else-if="props.post.cover_image_url"
                class="relative overflow-hidden rounded-2xl border bg-muted aspect-[4/3]">
                <img :src="props.post.cover_image_url" :alt="`Cover image for ${props.post.title}`"
                  class="h-full w-full object-cover" />
              </div>

              <!-- Mobile Share & Like -->
              <div class="flex items-center justify-between mt-4">
                <div class="flex gap-2">
                  <a v-for="button in shareButtons" :key="button.name" :href="button.href" target="_blank"
                    rel="noreferrer" :title="button.name">
                    <Button variant="outline" size="icon">
                      <component :is="button.icon" class="h-4 w-4" />
                    </Button>
                  </a>
                </div>
                <Button variant="outline" class="gap-2" @click="likeArticle">
                  <Heart class="h-4 w-4" />
                  <span>{{ props.post.likes_count }}</span>
                </Button>
              </div>
            </div>

            <!-- Article Header -->
            <div class="space-y-4 mb-8">
              <div class="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                <Badge variant="secondary" class="uppercase tracking-wide">In-depth read</Badge>
                <span class="flex items-center gap-2">
                  <Calendar class="h-4 w-4" />
                  {{ props.post.published_at ?? 'Unscheduled' }}
                </span>
                <span class="flex items-center gap-2">
                  <Clock class="h-4 w-4" />
                  {{ props.post.reading_time ?? '—' }} read
                </span>
              </div>

              <h1 class="text-4xl font-bold leading-tight md:text-5xl">
                {{ props.post.title }}
              </h1>

              <p class="text-lg text-muted-foreground leading-relaxed">
                {{ props.post.summary ?? 'Article coming soon.' }}
              </p>
            </div>

            <!-- Article Content -->
            <article class="prose prose-neutral max-w-none dark:prose-invert mb-12">
              <div v-html="props.post.body || '<p>Full article will be published shortly.</p>'"></div>
            </article>


            <!-- Comments Section -->
            <div class="space-y-8" id="comments">
              <div class="space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Join the discussion</h2>
                <p class="text-muted-foreground">Share your thoughts and engage with the community</p>
              </div>

              <!-- Existing Comments (hidden when comment form is shown) -->
              <Card v-if="formattedComments.length && !showCommentForm">
                <CardHeader>
                  <CardTitle class="text-base">Community discussion</CardTitle>
                  <CardDescription>Continue the conversation with respectful, actionable feedback.</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                  <div class="space-y-4">
                    <div v-for="comment in formattedComments" :key="comment.id" class="rounded-md border p-4">
                      <div class="flex items-center justify-between text-xs text-muted-foreground">
                        <span class="font-medium text-foreground">{{ comment.author_name }}</span>
                        <span>{{ comment.displayDate }}</span>
                      </div>
                      <p class="mt-3 text-sm leading-relaxed text-foreground">{{ comment.body }}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <!-- Comment Form (shown when toggle is clicked) -->
              <ContactCardWrapper v-if="showCommentForm" type="blog" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
