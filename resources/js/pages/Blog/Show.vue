<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { router, useForm } from '@inertiajs/vue3';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MediaCarousel from '@/components/MediaCarousel.vue';
import {
  Heart,
  MessageSquare,
  Send,
  Calendar,
  Clock,
  BookmarkCheck,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Music2,
} from 'lucide-vue-next';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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

const form = useForm({
  author_name: '',
  author_email: '',
  body: '',
});

const isSubmitting = ref(false);

const submitComment = () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;
  form.post(`/blog/${props.post.slug}/comments`, {
    preserveScroll: true,
    onFinish: () => {
      isSubmitting.value = false;
      form.reset('author_name', 'author_email', 'body');
    },
  });
};

const likeArticle = () => {
  router.post(`/blog/${props.post.slug}/like`, {}, {
    preserveScroll: true,
    preserveState: true,
  });
};

const mediaSlides = computed(() => {
  const slides: { id: string | number; url: string; kind: 'image' | 'video' }[] = [];

  if (props.post.gallery?.length) {
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
</script>

<template>
  <WebsiteLayout>
    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="space-y-4">
          <div class="flex items-center gap-3 text-sm text-muted-foreground">
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
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="space-y-3">
              <h1 class="text-4xl font-semibold leading-tight md:text-5xl">
                {{ props.post.title }}
              </h1>
              <p class="max-w-2xl text-base text-muted-foreground md:text-lg">
                {{ props.post.summary ?? 'Article coming soon.' }}
              </p>
            </div>
            <div class="flex items-center gap-3">
              <Button variant="outline" class="gap-2" @click="likeArticle">
                <Heart class="h-4 w-4" />
                Appreciate
                <span class="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-600">
                  {{ props.post.likes_count }}
                </span>
              </Button>
              <Button variant="outline" class="gap-2" as-child>
                <a href="#comments"><MessageSquare class="h-4 w-4" /> Join discussion</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid gap-10 lg:grid-cols-[1.6fr,1fr]">
          <div class="space-y-8">
            <MediaCarousel
              v-if="mediaSlides.length"
              :media="mediaSlides"
              class="bg-muted"
              height-class="aspect-[4/3]"
            />
            <div v-else-if="props.post.cover_image_url" class="overflow-hidden rounded-lg border bg-muted">
              <img
                :src="props.post.cover_image_url"
                :alt="`Cover image for ${props.post.title}`"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <article class="prose prose-neutral max-w-none dark:prose-invert">
              <div v-html="props.post.body || '<p>Full article will be published shortly.</p>'"></div>
            </article>
            <Card>
              <CardHeader>
                <CardTitle class="text-base">Reading checklist</CardTitle>
                <CardDescription>Key takeaways and suggested prompts to explore further.</CardDescription>
              </CardHeader>
              <CardContent class="space-y-3 text-sm">
                <div class="flex items-center gap-2">
                  <BookmarkCheck class="h-4 w-4 text-primary" />
                  <span>Skim the summary before committing to the full read.</span>
                </div>
                <div class="flex items-center gap-2">
                  <BookmarkCheck class="h-4 w-4 text-primary" />
                  <span>Note open questions to bring to an upcoming workshop.</span>
                </div>
                <div class="flex items-center gap-2">
                  <BookmarkCheck class="h-4 w-4 text-primary" />
                  <span>Share the article with collaborators using the comment thread.</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside class="space-y-6" id="comments">
            <Card>
              <CardHeader>
                <CardTitle class="text-base">Share this article</CardTitle>
                <CardDescription>Pass along insights across your networks.</CardDescription>
              </CardHeader>
              <CardContent class="flex flex-wrap gap-3">
                <Button
                  v-for="button in shareButtons"
                  :key="button.name"
                  as-child
                  variant="outline"
                  size="sm"
                  class="inline-flex items-center gap-2"
                >
                  <a :href="button.href" target="_blank" rel="noreferrer">
                    <component :is="button.icon" class="h-4 w-4" />
                    {{ button.name }}
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle class="text-base">Community discussion</CardTitle>
                <CardDescription>Continue the conversation with respectful, actionable feedback.</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div v-if="formattedComments.length" class="space-y-4">
                  <div v-for="comment in formattedComments" :key="comment.id" class="rounded-md border p-4">
                    <div class="flex items-center justify-between text-xs text-muted-foreground">
                      <span class="font-medium text-foreground">{{ comment.author_name }}</span>
                      <span>{{ comment.displayDate }}</span>
                    </div>
                    <p class="mt-3 text-sm leading-relaxed text-foreground">{{ comment.body }}</p>
                  </div>
                </div>
                <p v-else class="text-sm text-muted-foreground">No comments yet. Be the first to share your thoughts.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle class="text-base">Join the conversation</CardTitle>
                <CardDescription>Constructive, respectful feedback is encouraged. Email remains private.</CardDescription>
              </CardHeader>
              <CardContent>
                <form class="space-y-4" @submit.prevent="submitComment">
                  <div class="grid gap-2">
                    <label class="text-sm font-medium text-foreground" for="author_name">Name</label>
                    <Input id="author_name" v-model="form.author_name" placeholder="Alex Doe" required />
                  </div>
                  <div class="grid gap-2">
                    <label class="text-sm font-medium text-foreground" for="author_email">Email</label>
                    <Input id="author_email" v-model="form.author_email" placeholder="you@email.com" type="email" />
                  </div>
                  <div class="grid gap-2">
                    <label class="text-sm font-medium text-foreground" for="body">Comment</label>
                    <Textarea id="body" v-model="form.body" rows="4" placeholder="Share your insights..." required />
                  </div>
                  <Button type="submit" class="w-full gap-2" :disabled="isSubmitting">
                    <Send class="h-4 w-4" />
                    {{ isSubmitting ? 'Submitting...' : 'Post comment' }}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
