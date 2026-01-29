<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3';
import { Heart, MessageSquare, Calendar, MapPin, Camera } from 'lucide-vue-next';
import { computed } from 'vue';
import ContactCardWrapper from '@/components/ContactCardWrapper.vue';
import { Badge } from '@/components/ui/badge/index';
import { Button } from '@/components/ui/button/index';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

interface Comment {
  id: number;
  author_name: string;
  author_email: string | null;
  body: string;
  created_at: string | null;
}

interface Session {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  location: string | null;
  deliverables: number | null;
  status: string;
  scheduled_at: string | null;
  hero_image_url: string | null;
  highlight_video_url: string | null;
  likes_count: number;
}

const props = defineProps<{
  session: Session;
  comments: Comment[];
}>();


const likeSession = () => {
  router.post(`/photography/${props.session.slug}/like`, {}, {
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
</script>

<template>
  <WebsiteLayout>
    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="space-y-4">
          <div class="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <Badge variant="secondary" class="uppercase tracking-wide">Photography session</Badge>
            <Badge :variant="props.session.status === 'Published' ? 'default' : 'outline'" class="uppercase">
              {{ props.session.status }}
            </Badge>
            <span class="flex items-center gap-2">
              <Calendar class="h-3.5 w-3.5" />
              {{ props.session.scheduled_at ?? 'Schedule TBC' }}
            </span>
            <span class="flex items-center gap-2">
              <MapPin class="h-3.5 w-3.5" />
              {{ props.session.location ?? 'Location forthcoming' }}
            </span>
          </div>
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="space-y-3">
              <h1 class="text-4xl font-semibold leading-tight md:text-5xl">
                {{ props.session.title }}
              </h1>
              <p class="max-w-2xl text-base text-muted-foreground md:text-lg">
                {{ props.session.summary ?? 'Session narrative coming soon.' }}
              </p>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <Button variant="outline" class="gap-2" @click="likeSession">
                <Heart class="h-4 w-4" />
                Appreciate
                <span class="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-600">
                  {{ props.session.likes_count }}
                </span>
              </Button>
              <Button variant="outline" class="gap-2" as-child>
                <a href="#comments">
                  <MessageSquare class="h-4 w-4" /> Discuss session
                </a>
              </Button>
              <Button as-child>
                <Link href="/contact">Book a similar session</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid gap-10 lg:grid-cols-[2fr,1fr]">
          <div class="space-y-6">
            <div v-if="props.session.hero_image_url" class="overflow-hidden rounded-lg border bg-muted">
              <img :src="props.session.hero_image_url" :alt="`Hero image for ${props.session.title}`"
                class="h-full w-full object-cover" loading="lazy" />
            </div>
            <article class="prose prose-neutral max-w-none text-base leading-relaxed dark:prose-invert">
              <slot name="body">
                <p class="text-muted-foreground">
                  Highlights from this session will be documented shortly. Check back soon for behind-the-scenes notes
                  and
                  final deliverables.
                </p>
              </slot>
            </article>
            <div v-if="props.session.highlight_video_url" class="space-y-3">
              <h2 class="text-sm font-medium text-muted-foreground">Highlight reel</h2>
              <video controls preload="metadata" class="h-64 w-full overflow-hidden rounded-lg border bg-black">
                <source :src="props.session.highlight_video_url" type="video/mp4" />
                <source :src="props.session.highlight_video_url" type="video/quicktime" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <aside class="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle class="text-base">Deliverable snapshot</CardTitle>
                <CardDescription>
                  Overview of the expected outputs and creative direction for the photography set.
                </CardDescription>
              </CardHeader>
              <CardContent class="space-y-3 text-sm text-muted-foreground">
                <div class="flex items-center justify-between text-foreground">
                  <span>Deliverables</span>
                  <span class="font-medium">{{ props.session.deliverables ?? 0 }} items</span>
                </div>
                <div class="rounded-md border bg-muted/40 p-3 text-foreground">
                  <p class="flex items-center gap-2 font-medium">
                    <Camera class="h-4 w-4" /> Coverage focus
                  </p>
                  <p class="mt-1 text-sm text-muted-foreground">
                    Designed for marketing collateral, press releases, and executive communications.
                  </p>
                </div>
                <Button variant="outline" class="w-full" as-child>
                  <Link href="/services">Explore photography services</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </section>

    <section class="bg-background" id="comments">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid gap-12 lg:grid-cols-[2fr,1fr]">
          <div class="space-y-6">
            <div class="space-y-2">
              <h2 class="text-2xl font-semibold">Comments</h2>
              <p class="text-sm text-muted-foreground">
                Share reactions, creative direction notes, or collaboration interest—constructive feedback is welcome.
              </p>
            </div>
            <Card>
              <CardContent class="space-y-4">
                <div v-if="formattedComments.length" class="space-y-6">
                  <div v-for="comment in formattedComments" :key="comment.id" class="rounded-md border p-4">
                    <div class="flex items-center justify-between text-xs text-muted-foreground">
                      <span class="font-medium text-foreground">{{ comment.author_name }}</span>
                      <span>{{ comment.displayDate }}</span>
                    </div>
                    <p class="mt-3 text-sm leading-relaxed text-foreground">{{ comment.body }}</p>
                  </div>
                </div>
                <p v-else class="text-sm text-muted-foreground">No comments yet. Share your first impressions below.</p>
              </CardContent>
            </Card>
          </div>
          <aside class="space-y-4">
            <ContactCardWrapper type="blog" />
          </aside>
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
