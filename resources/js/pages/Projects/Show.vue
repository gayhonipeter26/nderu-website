<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';
import { Badge } from '@/components/ui/badge/index';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index';
import { Button } from '@/components/ui/button/index';
import MediaCarousel from '@/components/MediaCarousel.vue';
import ContactCardWrapper from '@/components/ContactCardWrapper.vue';
import {
  Heart,
  MessageSquare,
  Layers,
  Play,
  Calendar,
  Package,
  Users,
  Camera,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Music2,
} from 'lucide-vue-next';

interface Comment {
  id: number;
  author_name: string;
  author_email: string | null;
  body: string;
  created_at: string | null;
}

interface MediaAsset {
  id: number | string;
  url: string;
  kind: 'image' | 'video';
  mime_type?: string | null;
}

interface ProjectMeta {
  [key: string]: string | number | boolean | null | undefined;
}

interface Project {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  category: string | null;
  year: number | null;
  status: string;
  featured: boolean;
  hero_image_url: string | null;
  case_study_video_url: string | null;
  likes_count: number;
  meta?: ProjectMeta | null;
  gallery?: MediaAsset[];
}

const props = defineProps<{
  project: Project;
  comments: Comment[];
}>();


const likeProject = () => {
  router.post(`/projects/${props.project.slug}/like`, {}, {
    preserveScroll: true,
    preserveState: true,
  });
};

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

const metaEntries = computed(() =>
  Object.entries(props.project.meta ?? {}).filter(([, value]) => value !== null && value !== ''),
);

const categoryIcon = computed(() => {
  const value = (props.project.category ?? '').toLowerCase();
  if (value.includes('photo')) return Camera;
  if (value.includes('system') || value.includes('platform')) return Package;
  if (value.includes('consult')) return Users;
  return Layers;
});

const mediaSlides = computed<MediaAsset[]>(() => {
  const slides: MediaAsset[] = [];

  if (Array.isArray(props.project.gallery) && props.project.gallery.length) {
    slides.push(
      ...props.project.gallery.map((asset) => ({
        ...asset,
        id: `gallery-${asset.id}`,
      })),
    );
  }

  if (props.project.hero_image_url && !slides.some((asset) => asset.kind === 'image' && asset.url === props.project.hero_image_url)) {
    slides.push({
      id: 'hero',
      url: props.project.hero_image_url,
      kind: 'image',
    });
  }

  if (props.project.case_study_video_url && !slides.some((asset) => asset.kind === 'video' && asset.url === props.project.case_study_video_url)) {
    slides.push({
      id: 'case-study-video',
      url: props.project.case_study_video_url,
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
          <div class="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <Badge variant="secondary" class="uppercase tracking-wide">Case study</Badge>
            <Badge variant="outline" class="flex items-center gap-2 capitalize">
              <component :is="categoryIcon" class="h-3.5 w-3.5" />
              {{ props.project.category ?? 'Uncategorized' }}
            </Badge>
            <span class="flex items-center gap-2">
              <Calendar class="h-3.5 w-3.5" />
              {{ props.project.year ?? 'Year TBC' }}
            </span>
            <Badge :variant="props.project.featured ? 'default' : 'outline'" class="uppercase tracking-wide">
              {{ props.project.featured ? 'Featured' : props.project.status }}
            </Badge>
          </div>
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="space-y-3">
              <h1 class="text-4xl font-semibold leading-tight md:text-5xl">
                {{ props.project.title }}
              </h1>
              <p class="max-w-2xl text-base text-muted-foreground md:text-lg">
                {{ props.project.summary ?? 'Case study details coming soon.' }}
              </p>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <Button variant="outline" class="gap-2" @click="likeProject">
                <Heart class="h-4 w-4" />
                Appreciate
                <span class="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-600">
                  {{ props.project.likes_count }}
                </span>
              </Button>
              <Button variant="outline" class="gap-2" as-child>
                <a href="#comments">
                  <MessageSquare class="h-4 w-4" /> Discuss project
                </a>
              </Button>
              <Button as-child>
                <Link href="/contact">Start an engagement</Link>
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
            <div>
              <MediaCarousel v-if="mediaSlides.length" :media="mediaSlides" class="rounded-lg" />
              <div v-else class="overflow-hidden rounded-lg border bg-muted">
                <img :src="props.project.hero_image_url ?? 'https://via.placeholder.com/1280x720?text=Project+visual'"
                  :alt="`Hero image for ${props.project.title}`" class="h-full w-full object-cover" />
              </div>
            </div>

            <article class="prose prose-neutral max-w-none text-base leading-relaxed dark:prose-invert">
              <slot name="body">
                <p class="text-muted-foreground">Detailed project narrative will be published soon.</p>
              </slot>
            </article>

            <Card>
              <CardHeader>
                <CardTitle class="text-base">Engagement details</CardTitle>
                <CardDescription>Snapshot of delivery scope, collaborators, and supporting assets.</CardDescription>
              </CardHeader>
              <CardContent class="space-y-3 text-sm text-muted-foreground">
                <div class="flex items-center justify-between text-foreground">
                  <span>Status</span>
                  <span class="font-medium">{{ props.project.status }}</span>
                </div>
                <div class="flex items-center justify-between text-foreground">
                  <span>Year</span>
                  <span class="font-medium">{{ props.project.year ?? 'In progress' }}</span>
                </div>
                <div v-if="metaEntries.length" class="space-y-2">
                  <p class="font-medium text-foreground">Additional notes</p>
                  <ul class="space-y-1">
                    <li v-for="([key, value]) in metaEntries" :key="key" class="flex justify-between gap-2">
                      <span class="capitalize">{{ key.replace(/_/g, ' ') }}</span>
                      <span class="font-medium text-foreground">{{ value }}</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside class="space-y-6" id="comments">
            <Card>
              <CardHeader>
                <CardTitle class="text-base">Share this project</CardTitle>
                <CardDescription>Let others explore this engagement.</CardDescription>
              </CardHeader>
              <CardContent class="flex flex-wrap gap-3">
                <Button v-for="button in shareButtons" :key="button.name" as-child variant="outline" size="sm"
                  class="inline-flex items-center gap-2">
                  <a :href="button.href" target="_blank" rel="noreferrer">
                    <component :is="button.icon" class="h-4 w-4" />
                    {{ button.name }}
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle class="text-base">Community feedback</CardTitle>
                <CardDescription>
                  Share implementation feedback or ask clarifying questions—the thread stays curated for relevance.
                </CardDescription>
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
                <p v-else class="text-sm text-muted-foreground">No comments yet. Start the conversation with a note.</p>
              </CardContent>
            </Card>

            <ContactCardWrapper type="blog" />
          </aside>
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
