<script setup lang="tsx">
import { Head } from '@inertiajs/vue3';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import BlogHeroYoutubeWrapper from '@/components/BlogHeroYoutubeWrapper.vue';
import ContactCardWrapper from '@/components/ContactCardWrapper.vue';
import { YoutubeContentSections } from '@/components/ui/youtube-content-sections';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';
import { getVideoFile } from '@/lib/video-storage';

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

const searchQuery = ref("");
const activeTab = ref("home");
const uploadedVideos = ref<{ title: string; url: string; duration: string; coverImage: string; description: string; links: string[] }[]>([]);
const currentlyPlayingVideo = ref<any>(null);
const shouldShowHeroPlayer = ref(false);
const contentSectionsContainer = ref<HTMLDivElement | null>(null);
let contentSectionsRoot: Root | null = null;

const loadPersistentVideos = async () => {
  const stored = localStorage.getItem("persistent_videos_array");
  if (stored) {
    try {
      const { videos, expires } = JSON.parse(stored);
      
      if (new Date().getTime() < expires) {
        // Restore videos from IndexedDB if needed
        const restoredVideos = await Promise.all(videos.map(async (v: any) => {
          // If it has an ID, try to get the file from DB
          if (v.id) {
            try {
              const file = await getVideoFile(v.id);
              if (file) {
                 // Create a new fresh blob URL for this session
                 return { ...v, url: URL.createObjectURL(file) };
              }
            } catch (e) {
              console.error("Failed to restore video file", e);
            }
          }
          // If no ID or file not found, check if existing URL is valid (not blob)
          // If it IS a blob without a file backing it, it's dead.
          if (v.url && !v.url.startsWith('blob:')) {
            return v;
          }
           // Dead link
          return null;
        }));
        
        uploadedVideos.value = restoredVideos.filter(v => v !== null);
      } else {
        localStorage.removeItem("persistent_videos_array");
      }
    } catch (e) {
      localStorage.removeItem("persistent_videos_array");
    }
  }
};

const savePersistentVideos = (videos: any[]) => {
  const expiryTime = new Date().getTime() + (72 * 60 * 60 * 1000);
  localStorage.setItem("persistent_videos_array", JSON.stringify({
    videos,
    expires: expiryTime
  }));
};

const saveActiveVideo = (video: any) => {
  if (video) {
    localStorage.setItem("persistent_active_video", JSON.stringify(video));
  } else {
    localStorage.removeItem("persistent_active_video");
  }
};

const loadActiveVideo = () => {
  const stored = localStorage.getItem("persistent_active_video");
  if (stored) {
    try {
      currentlyPlayingVideo.value = JSON.parse(stored);
      // Don't auto-open player on reload
      // shouldShowHeroPlayer.value = true;
    } catch (e) {
      localStorage.removeItem("persistent_active_video");
    }
  }
};

const renderContent = () => {
  if (contentSectionsRoot) {
    contentSectionsRoot.render(
      <React.StrictMode>
        <YoutubeContentSections 
          posts={props.posts} 
          searchQuery={searchQuery.value} 
          activeTab={activeTab.value}
          uploadedVideos={uploadedVideos.value}
          onVideoClick={(video) => {
            currentlyPlayingVideo.value = video;
            shouldShowHeroPlayer.value = true;
          }}
        />
      </React.StrictMode>,
    );
  }
};

const handleSearch = (query: string) => {
  searchQuery.value = query;
  renderContent();
};

const handleTabChange = (tab: string) => {
  activeTab.value = tab;
  renderContent();
};

const handleVideoUploaded = (video: any) => {
  // Add to the beginning of the array
  uploadedVideos.value = [video, ...uploadedVideos.value];
  currentlyPlayingVideo.value = video;
  
  savePersistentVideos(uploadedVideos.value);
  renderContent();
};

const handlePlayerClose = () => {
  shouldShowHeroPlayer.value = false;
};

onMounted(async () => {
  await loadPersistentVideos();
  loadActiveVideo();
  if (contentSectionsContainer.value) {
    contentSectionsRoot = createRoot(contentSectionsContainer.value);
    renderContent();
  }
});

onBeforeUnmount(() => {
  if (contentSectionsRoot) {
    contentSectionsRoot.unmount();
    contentSectionsRoot = null;
  }
});

watch(() => props.posts, () => {
  renderContent();
}, { deep: true });

const videoRecommendations = computed(() => {
  return props.posts.filter(post => !!post.feature_video_url);
});

watch(currentlyPlayingVideo, (newVideo) => {
  saveActiveVideo(newVideo);
}, { deep: true });

</script>

<template>
  <WebsiteLayout>
    <Head title="Blogs" />
    <div class="min-h-screen bg-[#0f0f0f]">
      <section id="blog-hero" class="border-b border-white/5 bg-[#0f0f0f]">
        <BlogHeroYoutubeWrapper 
          @search="handleSearch" 
          @tab-change="handleTabChange" 
          @video-uploaded="handleVideoUploaded"
          :show-player-externally="shouldShowHeroPlayer"
          :video="currentlyPlayingVideo"
          :recommendations="videoRecommendations"
          :uploaded-videos="uploadedVideos"
          @player-close="handlePlayerClose"
        />
      </section>

      <!-- YouTube-Style Content Sections -->
      <div class="relative">
        <div ref="contentSectionsContainer" class="w-full"></div>
      </div>

      <section class="bg-[#0f0f0f] border-t border-white/5">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="max-w-4xl mx-auto text-center space-y-4">
            <h2 class="text-3xl font-bold tracking-tight text-white">Stay Updated</h2>
            <p class="text-muted-foreground text-lg">
              Subscribe to the channel to get notified about new articles, coding projects, and photography updates.
            </p>
            <div class="flex justify-center pt-4">
              <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </WebsiteLayout>
</template>
