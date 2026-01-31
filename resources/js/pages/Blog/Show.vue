<script setup lang="tsx">
import { router } from '@inertiajs/vue3';
import { Link } from '@inertiajs/vue3';
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
  MoreVertical,
  X,
  Share2,
  Copy,
  Check,
  Link as LinkIcon
} from 'lucide-vue-next';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { YoutubeComments } from '@/components/ui/youtube-comments';
import ContactCardWrapper from '@/components/ContactCardWrapper.vue';
import MediaCarousel from '@/components/MediaCarousel.vue';
import { Badge } from '@/components/ui/badge/index';
import { Button } from '@/components/ui/button/index';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/index';
import { VideoCard, SectionRow } from '@/components/ui/youtube-content-sections';
import { Input } from '@/components/ui/input/index';
import { Label } from '@/components/ui/label/index';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

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
const showShareDialog = ref(false);
const isCopied = ref(false);

const suggestedPosts = computed(() => [
    {
        id: 201,
        slug: 'cinematic-editing-breakdown',
        title: 'Cinematic Editing Breakdown: The Art of Cuts',
        summary: 'Learn how to pace your edits for maximum emotional impact.',
        cover_image_url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44c?q=80&w=600',
        feature_video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        published_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        likes_count: 1240,
        reading_time: '12:04',
        author: 'Nderu Gathoni',
        category: 'Tutorial'
    },
    {
        id: 202,
        slug: 'color-grading-masterclass',
        title: 'Color Grading Masterclass',
        summary: 'From log to cinematic look in 5 easy steps.',
        cover_image_url: 'https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?q=80&w=600',
        feature_video_url: null,
        published_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        likes_count: 890,
        reading_time: '8 min read',
        author: 'Nderu Gathoni',
        category: 'Article'
    },
    {
        id: 203,
        slug: 'camera-gear-2026',
        title: 'My 2026 Camera Gear Setup',
        summary: 'A detailed look at the equipment I use for every shoot.',
        cover_image_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600',
        feature_video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        published_at: new Date(Date.now() - 86400000 * 10).toISOString(),
        likes_count: 3400,
        reading_time: '15:20',
        author: 'Nderu Gathoni',
        category: 'Gear'
    },
    {
        id: 204,
        slug: 'lighting-techniques',
        title: '3 Lighting Techniques You Need to Know',
        summary: 'Mastering natural and artificial light.',
        cover_image_url: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600',
        feature_video_url: null,
        published_at: new Date(Date.now() - 86400000 * 15).toISOString(),
        likes_count: 560,
        reading_time: '5 min read',
        author: 'Nderu Gathoni',
        category: 'Tutorial'
    }
]);

const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
        navigator.clipboard.writeText(window.location.href);
        isCopied.value = true;
        setTimeout(() => isCopied.value = false, 2000);
    }
};

const commentsContainer = ref<HTMLDivElement | null>(null);
const suggestedContainer = ref<HTMLDivElement | null>(null);
let commentsRoot: Root | null = null;
let suggestedRoot: Root | null = null;
const commentsLoaded = ref(false);
const suggestedLoaded = ref(false);
let renderTimeout: number | null = null;

// Debounced render function to prevent multiple rapid renders
const debouncedRender = (renderFn: () => void, delay = 100) => {
    if (renderTimeout) clearTimeout(renderTimeout);
    renderTimeout = setTimeout(renderFn, delay);
};

const renderComments = () => {
    if (commentsContainer.value && !commentsRoot) {
        commentsRoot = createRoot(commentsContainer.value);
    }
    
    if (commentsRoot) {
        // Use fake comments if no real comments exist
        let commentsToRender = props.comments;
        
        if (commentsToRender.length === 0) {
            commentsToRender = [
                {
                    id: 101,
                    author_name: "Alex Rivera",
                    author_email: "alex@example.com",
                    body: "This article is exactly what I needed! The breakdown of the concepts is incredible. Great work, Nderu! 🔥",
                    created_at: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
                },
                {
                    id: 102,
                    author_name: "Sarah Chen",
                    author_email: "sarah.c@tech.io",
                    body: "Love the attention to detail here. Can you share more about the tech stack used for the demo?",
                    created_at: new Date(Date.now() - 18000000).toISOString() // 5 hours ago
                },
                {
                    id: 103,
                    author_name: "Marcus Wright",
                    author_email: "marcus@lens.com",
                    body: "Stunning visuals and clear explanation. The lighting in that opening sequence is just perfect.",
                    created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
                }
            ];
        }

        // Add simulated engagement data to comments
        const commentsWithEngagement = commentsToRender.map(comment => ({
            ...comment,
            // Generate deterministic random likes based on string entries or ID
            likes: typeof comment.id === 'number' 
                ? (comment.id * 17) % 150 + 3 // Deterministic pseudo-random
                : Math.floor(Math.random() * 50) + 2,
            timestamp: comment.created_at ?? undefined
        }));

        commentsRoot.render(
            <React.StrictMode>
                <YoutubeComments comments={commentsWithEngagement} showInput={showCommentForm.value} />
            </React.StrictMode>
        );
    }
};

const renderSuggestedContent = () => {
    if (!suggestedLoaded.value) return;
    
    if (suggestedContainer.value && !suggestedRoot) {
        suggestedRoot = createRoot(suggestedContainer.value);
    }
    
    if (suggestedRoot) {
        debouncedRender(() => {
            suggestedRoot!.render(
                <React.StrictMode>
                    <SectionRow 
                        title="Watch Next"
                        items={suggestedPosts.value}
                        renderItem={(post, index) => (
                            <VideoCard key={post.id} post={post} index={index} />
                        )}
                    />
                </React.StrictMode>
            );
        });
    }
};

// Intersection Observer for lazy loading
const setupLazyLoading = () => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        // Fallback for browsers without IntersectionObserver
        commentsLoaded.value = true;
        suggestedLoaded.value = true;
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '200px', // Load 200px before element comes into view
        threshold: 0
    };

    const commentsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !commentsLoaded.value) {
                commentsLoaded.value = true;
                renderComments();
                commentsObserver.disconnect();
            }
        });
    }, observerOptions);

    const suggestedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !suggestedLoaded.value) {
                suggestedLoaded.value = true;
                renderSuggestedContent();
                suggestedObserver.disconnect();
            }
        });
    }, observerOptions);

    if (commentsContainer.value) {
        commentsObserver.observe(commentsContainer.value);
    }

    if (suggestedContainer.value) {
        suggestedObserver.observe(suggestedContainer.value);
    }
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    shareUrl.value = window.location.href;
  }
  
  // Setup lazy loading with IntersectionObserver
  setupLazyLoading();
});

watch([() => props.comments, showCommentForm], () => {
  if (commentsLoaded.value) {
    debouncedRender(renderComments);
  }
}, { deep: true });

onBeforeUnmount(() => {
  if (renderTimeout) clearTimeout(renderTimeout);
  
  if (commentsRoot) {
    commentsRoot.unmount();
    commentsRoot = null;
  }
  if (suggestedRoot) {
    suggestedRoot.unmount();
    suggestedRoot = null;
  }
});

const toggleCommentForm = () => {
  showCommentForm.value = !showCommentForm.value;
};
</script>

<template>
  <WebsiteLayout>
    <!-- Split Screen Layout -->
    <section class="min-h-screen py-3 md:py-6">
      <div class="grid lg:grid-cols-2 min-h-[calc(100vh-3rem)]">
        <!-- Left Column: Fixed Image with Overlays -->
        <div class="relative hidden lg:block h-[calc(100vh-3rem)]">
          <!-- Image Container with Padding -->
          <div class="h-full w-full p-3 md:p-6">
            <div class="relative h-full w-full rounded-xl md:rounded-2xl overflow-hidden bg-black">
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

              <!-- Top Left: Back Button -->
              <div class="absolute top-6 left-6 z-10">
                <Link href="/blog" class="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white border border-white/20">
                  <ArrowLeft class="h-5 w-5" />
                </Link>
              </div>

              <!-- Bottom Left: Like & Location -->
              <div class="absolute bottom-6 left-6 flex items-center gap-4 text-white">
                <!-- Like Button (Moved) -->
                <button @click="likeArticle"
                  class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white border border-white/20">
                  <Heart class="h-4 w-4" />
                  <span class="text-sm font-medium">{{ props.post.likes_count }}</span>
                </button>

                <!-- Location Badge -->
                <div class="flex items-center gap-3">
                    <div class="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <MapPin class="h-5 w-5" />
                    </div>
                    <div>
                    <p class="text-sm font-semibold">Nairobi</p>
                    <p class="text-xs opacity-90">Kenya</p>
                    </div>
                </div>
              </div>

              <!-- Bottom Right: Share Icons & Like Button -->
              <div class="absolute bottom-6 right-6 flex flex-col gap-3">


                <!-- Share Dialog -->
                <div class="flex flex-col gap-2 items-end relative">
                  <Dialog v-model:open="showShareDialog">
                    <DialogTrigger as-child>
                        <button title="Share"
                            class="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center text-white border border-white/20">
                            <MoreVertical class="h-4 w-4" />
                        </button>
                    </DialogTrigger>
                    <DialogContent class="sm:max-w-md bg-[#1f1f1f] border-white/10 text-white p-0 overflow-hidden gap-0">
                        <DialogHeader class="px-6 py-4 border-b border-white/10">
                            <DialogTitle class="text-lg font-bold flex items-center gap-2">
                                <Share2 class="h-5 w-5" /> Share this article
                            </DialogTitle>
                        </DialogHeader>
                        
                        <div class="p-6 space-y-6">
                            <!-- Social Grid -->
                            <div class="grid grid-cols-4 gap-4">
                                <a v-for="button in shareButtons" :key="button.name" :href="button.href" target="_blank"
                                    rel="noreferrer" 
                                    class="flex flex-col items-center gap-2 group">
                                    <div class="h-14 w-14 rounded-full bg-white/5 group-hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all group-hover:scale-110">
                                        <component :is="button.icon" class="h-6 w-6" />
                                    </div>
                                    <span class="text-xs text-white/60 group-hover:text-white transition-colors">{{ button.name }}</span>
                                </a>
                            </div>

                            <!-- Copy Link Section -->
                            <div class="bg-[#0f0f0f] rounded-xl p-3 flex items-center gap-3 border border-white/10">
                                <div class="bg-white/5 h-10 w-10 rounded-lg flex items-center justify-center shrink-0">
                                    <LinkIcon class="h-5 w-5 text-white/60" />
                                </div>
                                <div class="flex-1 min-w-0 pr-2">
                                    <p class="text-xs text-white/40 mb-0.5">Page Link</p>
                                    <p class="text-sm font-medium text-white/90 truncate font-mono">{{ shareUrl }}</p>
                                </div>
                                <button @click="handleCopyLink" 
                                    class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-colors flex items-center gap-2">
                                    <component :is="isCopied ? Check : Copy" class="h-4 w-4" />
                                    {{ isCopied ? 'Copied' : 'Copy' }}
                                </button>
                            </div>
                        </div>
                    </DialogContent>
                  </Dialog>

                  <!-- Comment Toggle Button (Always visible below) -->
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
               <!-- React Comments Mount Point -->
               <div ref="commentsContainer">
                 <!-- Loading Skeleton -->
                 <div v-if="!commentsLoaded" class="space-y-6 animate-pulse">
                   <div class="h-8 bg-white/5 rounded w-48"></div>
                   <div v-for="i in 3" :key="i" class="flex gap-4">
                     <div class="h-10 w-10 rounded-full bg-white/5"></div>
                     <div class="flex-1 space-y-2">
                       <div class="h-4 bg-white/5 rounded w-32"></div>
                       <div class="h-16 bg-white/5 rounded"></div>
                     </div>
                   </div>
                 </div>
               </div>
            </div>


          </div>
        </div>
      </div>

      <!-- Full Width Suggested Content -->
      <div class="max-w-[1440px] mx-auto px-4 md:px-6 py-4 md:py-6 border-t border-white/10 mt-8 md:mt-12">
        <div class="suggested-content-wrapper min-h-[300px] md:min-h-[400px]">
            <div ref="suggestedContainer">
              <!-- Loading Skeleton -->
              <div v-if="!suggestedLoaded" class="space-y-4 animate-pulse">
                <div class="h-6 bg-white/5 rounded w-40"></div>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div v-for="i in 4" :key="i" class="space-y-2">
                    <div class="aspect-video bg-white/5 rounded-xl"></div>
                    <div class="h-4 bg-white/5 rounded w-3/4"></div>
                    <div class="h-3 bg-white/5 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>

      <!-- Advertisement Banner -->
      <div class="max-w-[1440px] mx-auto px-6 pb-20 mt-8">
        <div class="w-full h-[180px] md:h-[200px] rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10">
            <!-- Background Video -->
            <video 
                autoplay 
                loop 
                muted 
                playsinline
                loading="lazy"
                preload="metadata"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
                <source src="https://cdn.coverr.co/videos/coverr-cinematic-video-production-8273/720p.mp4" type="video/mp4" />
                <!-- Fallback image if video doesn't load -->
                <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000" alt="Creative Services" class="w-full h-full object-cover" loading="lazy" />
            </video>
            
            <!-- Dark Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent flex flex-col justify-center px-6 md:px-12">
                <span class="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span class="w-6 h-[1px] bg-blue-400"></span>
                    Featured Services
                </span>
                <h3 class="text-2xl md:text-4xl font-bold text-white mb-3 max-w-xl leading-tight">
                    Bring Your Vision <br/>to Life
                </h3>
                <p class="text-gray-300 mb-4 max-w-lg text-xs md:text-sm leading-relaxed">
                    Professional photography, videography, and creative direction. Let's create stunning visual stories together.
                </p>
                <button class="bg-white text-black px-6 py-2 rounded-full font-bold text-xs hover:bg-gray-200 transition-all transform hover:translate-x-1 w-fit">
                    Book a Session
                </button>
            </div>
            
            <!-- Service Label -->
            <div class="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-2 py-1 rounded text-[10px] uppercase font-bold text-white/50 border border-white/5">
                Featured
            </div>
            
            <!-- Contact Info -->
            <div class="absolute bottom-3 right-4 text-[9px] text-white/40 hover:text-white/70 transition-colors">
                Interested in my services? Contact: <a href="mailto:hello@nderugathoni.com" class="underline">hello@nderugathoni.com</a>
            </div>
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
```
