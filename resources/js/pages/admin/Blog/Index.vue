<script setup lang="ts">
import { useForm, router } from '@inertiajs/vue3';
import { Pencil, Plus, Trash2 } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { Badge } from '@/components/ui/badge/index';
import { Button } from '@/components/ui/button/index';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog/index';
import { Input } from '@/components/ui/input/index';
import { Label } from '@/components/ui/label/index';
import AdminLayout from '@/layouts/AdminLayout.vue';

type PostStatus = 'Published' | 'Draft';

interface MediaAsset {
  id: number;
  url: string;
  kind: 'image' | 'video';
  position: number;
};

interface Post {
  id: number;
  title: string;
  summary: string | null;
  status: PostStatus;
  reading_time: string | null;
  published: string | null;
  published_at: string | null;
  cover_image_url: string | null;
  feature_video_url: string | null;
  gallery?: MediaAsset[];
}

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

const breadcrumbs = computed(() => [
  { title: 'Admin', href: '/admin' },
  { title: 'Blog' },
]);

const dialogOpen = ref(false);
const editingPost = ref<Post | null>(null);

const form = useForm({
  title: '',
  summary: '',
  reading_time: '5 min',
  status: 'Draft' as PostStatus,
  published_at: new Date().toISOString().slice(0, 10),
  cover_image: null as File | null,
  feature_video: null as File | null,
  gallery: [] as File[],
  gallery_remove: [] as number[],
});

const statusOptions: PostStatus[] = ['Published', 'Draft'];

const existingGallery = ref<MediaAsset[]>([]);
const newGalleryPreviews = ref<{ name: string; url: string }[]>([]);

function startCreate() {
  editingPost.value = null;
  form.reset();
  form.clearErrors();
  form.status = 'Draft';
  form.published_at = new Date().toISOString().slice(0, 10);
  form.cover_image = null;
  form.feature_video = null;
  form.gallery = [];
  form.gallery_remove = [];
  existingGallery.value = [];
  newGalleryPreviews.value.forEach((preview) => URL.revokeObjectURL(preview.url));
  newGalleryPreviews.value = [];
  dialogOpen.value = true;
}

function startEdit(post: Post) {
  editingPost.value = post;
  form.reset();
  form.clearErrors();
  form.title = post.title;
  form.summary = post.summary ?? '';
  form.reading_time = post.reading_time ?? '';
  form.status = post.status;
  form.published_at = post.published_at ?? new Date().toISOString().slice(0, 10);
  form.cover_image = null;
  form.feature_video = null;
  form.gallery = [];
  form.gallery_remove = [];
  existingGallery.value = Array.isArray(post.gallery) ? [...post.gallery] : [];
  newGalleryPreviews.value.forEach((preview) => URL.revokeObjectURL(preview.url));
  newGalleryPreviews.value = [];
  dialogOpen.value = true;
}

function submitForm() {
  const payload = { ...form.data() };

  const options = {
    preserveScroll: true,
    onSuccess: () => closeDialog(),
    forceFormData: true,
  } as const;

  const transformer = () => {
    const output: Record<string, unknown> = { ...payload };

    if (!form.cover_image) {
      delete output.cover_image;
    }

    if (!form.feature_video) {
      delete output.feature_video;
    }

    if (!form.gallery.length) {
      delete output.gallery;
    }

    if (!form.gallery_remove.length) {
      delete output.gallery_remove;
    }

    return output;
  };

  if (editingPost.value) {
    form.transform(transformer).put(`/admin/blog/${editingPost.value.id}`, options);
  } else {
    form.transform(transformer).post('/admin/blog', options);
  }
}

function deletePost(post: Post) {
  if (!confirm(`Remove “${post.title}”?`)) {
    return;
  }

  router.delete(`/admin/blog/${post.id}`, {
    preserveScroll: true,
  });
}

function closeDialog() {
  dialogOpen.value = false;
  form.reset();
  form.clearErrors();
  editingPost.value = null;
  existingGallery.value = [];
  newGalleryPreviews.value.forEach((preview) => URL.revokeObjectURL(preview.url));
  newGalleryPreviews.value = [];
}

function handleCoverImageChange(event: Event) {
  const target = event.target as HTMLInputElement;
  form.cover_image = target.files?.[0] ?? null;
}

function handleFeatureVideoChange(event: Event) {
  const target = event.target as HTMLInputElement;
  form.feature_video = target.files?.[0] ?? null;
}

function handleGalleryChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = Array.from(target.files ?? []);
  form.gallery = files;
  newGalleryPreviews.value.forEach((preview) => URL.revokeObjectURL(preview.url));
  newGalleryPreviews.value = files.map((file) => ({
    name: file.name,
    url: URL.createObjectURL(file),
  }));
}

function queueGalleryRemoval(id: number) {
  if (!form.gallery_remove.includes(id)) {
    form.gallery_remove.push(id);
    existingGallery.value = existingGallery.value.filter((asset) => asset.id !== id);
  }
}
</script>

<template>
  <AdminLayout :breadcrumbs="breadcrumbs">
    <div class="flex flex-col gap-6 p-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Badge variant="secondary" class="mb-2 w-fit">Blog</Badge>
          <h1 class="text-3xl font-semibold tracking-tight">Editorial workflow</h1>
          <p class="text-sm text-muted-foreground">
            Manage published insights and prepare upcoming articles.
          </p>
        </div>
        <Button @click="startCreate">
          <Plus class="h-4 w-4" />
          Add post
        </Button>
      </div>

      <Card>
        <CardHeader class="pb-4">
          <CardTitle class="text-base">Editorial catalogue</CardTitle>
          <CardDescription>Published posts appear on the public blog immediately after saving.</CardDescription>
        </CardHeader>
        <CardContent class="p-0">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th class="px-4 py-3 font-medium">Title</th>
                  <th class="px-4 py-3 font-medium">Status</th>
                  <th class="px-4 py-3 font-medium">Publish date</th>
                  <th class="px-4 py-3 font-medium">Reading time</th>
                  <th class="px-4 py-3 font-medium">Media</th>
                  <th class="px-4 py-3 font-medium">Gallery</th>
                  <th class="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="posts.length === 0">
                  <td colspan="7" class="px-4 py-6 text-center text-sm text-muted-foreground">
                    No posts yet. Add your first article to populate the public blog.
                  </td>
                </tr>
                <tr v-for="post in posts" :key="post.id" class="border-b last:border-0">
                  <td class="px-4 py-3">
                    <div class="font-medium text-foreground">
                      {{ post.title.length > 25 ? post.title.substring(0, 25) + '...' : post.title }}
                    </div>
                    <p class="mt-1 text-xs text-muted-foreground" v-if="post.summary">
                      {{ post.summary.length > 25 ? post.summary.substring(0, 25) + '...' : post.summary }}
                    </p>
                  </td>
                  <td class="px-4 py-3">
                    <Badge :variant="post.status === 'Published' ? 'default' : 'outline'">{{ post.status }}</Badge>
                  </td>
                  <td class="px-4 py-3 text-muted-foreground">{{ post.published ?? 'Unscheduled' }}</td>
                  <td class="px-4 py-3 text-muted-foreground">{{ post.reading_time ?? '—' }}</td>
                  <td class="px-4 py-3">
                    <div class="flex flex-col gap-1 text-xs">
                      <a v-if="post.cover_image_url" :href="post.cover_image_url" target="_blank" rel="noreferrer"
                        class="text-primary hover:underline">
                        View cover
                      </a>
                      <a v-if="post.feature_video_url" :href="post.feature_video_url" target="_blank" rel="noreferrer"
                        class="text-primary hover:underline">
                        View video
                      </a>
                      <span v-if="!post.cover_image_url && !post.feature_video_url"
                        class="text-muted-foreground">—</span>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-2 text-xs text-muted-foreground">
                      <div class="flex items-center gap-1" v-if="Array.isArray(post.gallery) && post.gallery.length">
                        <ImageIcon class="h-3.5 w-3.5" />
                        {{post.gallery.filter((item) => item.kind === 'image').length}}
                      </div>
                      <div class="flex items-center gap-1"
                        v-if="Array.isArray(post.gallery) && post.gallery.some((item) => item.kind === 'video')">
                        <Video class="h-3.5 w-3.5" />
                        {{post.gallery.filter((item) => item.kind === 'video').length}}
                      </div>
                      <span v-if="!Array.isArray(post.gallery) || !post.gallery.length">—</span>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" @click="startEdit(post)">
                        <Pencil class="h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" @click="deletePost(post)">
                        <Trash2 class="h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="text-base">Publishing checklist</CardTitle>
          <CardDescription>
            Ensure each article has a clear summary, accurate publish date, and review notes before going live.
          </CardDescription>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground">
          <p>
            Hook the form into your Laravel controllers to persist draft and publish state. For Markdown content, add a
            dedicated field and file upload workflow when ready.
          </p>
        </CardContent>
      </Card>
    </div>
  </AdminLayout>

  <Dialog v-model:open="dialogOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ editingPost ? 'Edit post' : 'Add post' }}</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-4">
        <div class="space-y-2">
          <Label for="post-title">Title</Label>
          <Input id="post-title" v-model="form.title" placeholder="e.g. Designing dependable SaaS architectures" />
          <p v-if="form.errors.title" class="text-sm text-destructive">{{ form.errors.title }}</p>
        </div>
        <div class="space-y-2">
          <Label for="post-summary">Summary</Label>
          <textarea id="post-summary" v-model="form.summary" placeholder="Short excerpt displayed in listings" rows="3"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <p v-if="form.errors.summary" class="text-sm text-destructive">{{ form.errors.summary }}</p>
        </div>
        <div class="space-y-2">
          <Label for="post-date">Publish date</Label>
          <Input id="post-date" type="date" v-model="form.published_at" />
          <p v-if="form.errors.published_at" class="text-sm text-destructive">{{ form.errors.published_at }}</p>
        </div>
        <div class="space-y-2">
          <Label for="post-time">Reading time</Label>
          <Input id="post-time" v-model="form.reading_time" placeholder="e.g. 7 min" />
          <p v-if="form.errors.reading_time" class="text-sm text-destructive">{{ form.errors.reading_time }}</p>
        </div>
        <div class="space-y-2">
          <Label for="post-cover">Cover image</Label>
          <Input id="post-cover" type="file" accept="image/*" @change="handleCoverImageChange" />
          <p class="text-xs text-muted-foreground">Upload up to 200 MB.</p>
          <p v-if="form.errors.cover_image" class="text-sm text-destructive">{{ form.errors.cover_image }}</p>
          <div v-if="editingPost?.cover_image_url" class="text-xs text-muted-foreground">
            Current cover:
            <a :href="editingPost.cover_image_url" target="_blank" rel="noreferrer"
              class="text-primary hover:underline">
              Preview
            </a>
          </div>
        </div>
        <div class="space-y-2">
          <Label for="post-video">Feature video</Label>
          <Input id="post-video" type="file" accept="video/mp4,video/quicktime" @change="handleFeatureVideoChange" />
          <p class="text-xs text-muted-foreground">Upload mp4 or mov files up to 200 MB.</p>
          <p v-if="form.errors.feature_video" class="text-sm text-destructive">{{ form.errors.feature_video }}</p>
          <div v-if="editingPost?.feature_video_url" class="text-xs text-muted-foreground">
            Current video:
            <a :href="editingPost.feature_video_url" target="_blank" rel="noreferrer"
              class="text-primary hover:underline">
              Preview
            </a>
          </div>
        </div>
        <div class="space-y-2">
          <Label for="post-gallery">Gallery images</Label>
          <Input id="post-gallery" type="file" accept="image/*" multiple @change="handleGalleryChange" />
          <p class="text-xs text-muted-foreground">Select up to 20 images. New uploads replace previous selection before
            saving.</p>
          <p v-if="form.errors.gallery" class="text-sm text-destructive">{{ form.errors.gallery }}</p>
          <div v-if="existingGallery.length" class="space-y-2 rounded-md border p-3">
            <p class="text-xs font-medium text-muted-foreground">Current gallery</p>
            <div class="grid grid-cols-3 gap-2">
              <div v-for="asset in existingGallery" :key="asset.id"
                class="group relative overflow-hidden rounded border">
                <img v-if="asset.kind === 'image'" :src="asset.url" :alt="asset.id.toString()"
                  class="h-20 w-full object-cover" />
                <div v-else class="flex h-20 w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                  <Video class="mr-1 h-4 w-4" /> Video
                </div>
                <button type="button"
                  class="absolute right-1 top-1 rounded bg-background/80 px-1 text-[10px] font-medium text-destructive shadow"
                  @click="queueGalleryRemoval(asset.id)">
                  Remove
                </button>
              </div>
            </div>
          </div>
          <div v-if="newGalleryPreviews.length" class="space-y-2 rounded-md border border-dashed p-3">
            <p class="text-xs font-medium text-muted-foreground">New uploads (pending save)</p>
            <div class="grid grid-cols-3 gap-2">
              <div v-for="preview in newGalleryPreviews" :key="preview.url" class="overflow-hidden rounded border">
                <img :src="preview.url" :alt="preview.name" class="h-20 w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-2">
          <Label for="post-status">Status</Label>
          <select id="post-status" v-model="form.status"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option v-for="option in statusOptions" :key="option" :value="option">{{ option }}</option>
          </select>
          <p v-if="form.errors.status" class="text-sm text-destructive">{{ form.errors.status }}</p>
        </div>
      </div>
      <DialogFooter class="mt-4 flex items-center justify-end gap-2">
        <Button variant="ghost" @click="closeDialog">Cancel</Button>
        <Button :disabled="form.processing" @click="submitForm">
          <span v-if="form.processing">Saving…</span>
          <span v-else>Save</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
