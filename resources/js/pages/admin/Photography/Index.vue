<script setup lang="ts">
import { computed, ref } from 'vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Badge } from '@/components/ui/badge/index';
import { Button } from '@/components/ui/button/index';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog/index';
import { Input } from '@/components/ui/input/index';
import { Label } from '@/components/ui/label/index';
import { Image as ImageIcon, Pencil, Plus, Trash2, Video } from 'lucide-vue-next';
import { useForm, router } from '@inertiajs/vue3';

type SessionStatus = 'Published' | 'Draft';

interface MediaAsset {
  id: number;
  url: string;
  kind: 'image' | 'video';
  position: number;
}

interface Session {
  id: number;
  title: string;
  location: string | null;
  summary: string | null;
  status: SessionStatus;
  deliverables: number;
  scheduled_at: string | null;
  hero_image_url: string | null;
  highlight_video_url: string | null;
  gallery?: MediaAsset[];
  updated_at: string | null;
}

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

const breadcrumbs = computed(() => [
  { title: 'Admin', href: '/admin' },
  { title: 'Photography' },
]);

const dialogOpen = ref(false);
const editingSession = ref<Session | null>(null);

const form = useForm({
  title: '',
  location: '',
  summary: '',
  hero_image: null as File | null,
  highlight_video: null as File | null,
  status: 'Published' as SessionStatus,
  deliverables: '3',
  scheduled_at: '',
  gallery: [] as File[],
  gallery_remove: [] as number[],
});

const statusOptions: SessionStatus[] = ['Published', 'Draft'];

const existingGallery = ref<MediaAsset[]>([]);
const newGalleryPreviews = ref<{ name: string; url: string }[]>([]);

function startCreate() {
  editingSession.value = null;
  form.reset();
  form.clearErrors();
  form.status = 'Published';
  form.deliverables = '3';
  form.gallery = [];
  form.gallery_remove = [];
  existingGallery.value = [];
  newGalleryPreviews.value.forEach((preview) => URL.revokeObjectURL(preview.url));
  newGalleryPreviews.value = [];
  dialogOpen.value = true;
}

function startEdit(item: Session) {
  editingSession.value = item;
  form.reset();
  form.clearErrors();
  form.title = item.title;
  form.location = item.location ?? '';
  form.summary = item.summary ?? '';
  form.status = item.status;
  form.deliverables = String(item.deliverables ?? 0);
  form.scheduled_at = item.scheduled_at ?? '';
  form.hero_image = null;
  form.highlight_video = null;
  form.gallery = [];
  form.gallery_remove = [];
  existingGallery.value = Array.isArray(item.gallery) ? [...item.gallery] : [];
  newGalleryPreviews.value.forEach((preview) => URL.revokeObjectURL(preview.url));
  newGalleryPreviews.value = [];
  dialogOpen.value = true;
}

function submitForm() {
  const payload = {
    ...form.data(),
    deliverables: form.deliverables ? Number(form.deliverables) : 0,
  };

  const options = {
    preserveScroll: true,
    onSuccess: () => closeDialog(),
    forceFormData: true,
  } as const;

  const transformer = () => {
    const output: Record<string, unknown> = {
      ...payload,
    };

    if (!form.hero_image) {
      delete output.hero_image;
    }

    if (!form.highlight_video) {
      delete output.highlight_video;
    }

    if (!form.gallery.length) {
      delete output.gallery;
    }

    if (!form.gallery_remove.length) {
      delete output.gallery_remove;
    }

    return output;
  };

  if (editingSession.value) {
    form.transform(transformer).put(`/admin/photography/${editingSession.value.id}`, options);
  } else {
    form.transform(transformer).post('/admin/photography', options);
  }
}

function removeSession(session: Session) {
  if (!confirm(`Remove “${session.title}”?`)) {
    return;
  }

  router.delete(`/admin/photography/${session.id}`, {
    preserveScroll: true,
  });
}

function closeDialog() {
  dialogOpen.value = false;
  form.reset();
  form.clearErrors();
  editingSession.value = null;
  existingGallery.value = [];
  newGalleryPreviews.value.forEach((preview) => URL.revokeObjectURL(preview.url));
  newGalleryPreviews.value = [];
}

function handleHeroImageChange(event: Event) {
  const target = event.target as HTMLInputElement;
  form.hero_image = target.files?.[0] ?? null;
}

function handleHighlightVideoChange(event: Event) {
  const target = event.target as HTMLInputElement;
  form.highlight_video = target.files?.[0] ?? null;
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
          <Badge variant="secondary" class="mb-2 w-fit">Photography</Badge>
          <h1 class="text-3xl font-semibold tracking-tight">Session catalogue</h1>
          <p class="text-sm text-muted-foreground">
            Keep photography engagements up to date, including location notes and deliverables.
          </p>
        </div>
        <Button @click="startCreate">
          <Plus class="h-4 w-4" />
          Add session
        </Button>
      </div>

      <Card>
        <CardHeader class="pb-4">
          <CardTitle class="text-base">Session catalogue</CardTitle>
          <CardDescription>Published sessions appear on the public photography page in chronological order.
          </CardDescription>
        </CardHeader>
        <CardContent class="p-0">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th class="px-4 py-3 font-medium">Title</th>
                  <th class="px-4 py-3 font-medium">Location</th>
                  <th class="px-4 py-3 font-medium">Scheduled</th>
                  <th class="px-4 py-3 font-medium">Deliverables</th>
                  <th class="px-4 py-3 font-medium">Media</th>
                  <th class="px-4 py-3 font-medium">Gallery</th>
                  <th class="px-4 py-3 font-medium">Status</th>
                  <th class="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="sessions.length === 0">
                  <td colspan="8" class="px-4 py-6 text-center text-sm text-muted-foreground">
                    No photography sessions yet. Add your first session to populate the public page.
                  </td>
                </tr>
                <tr v-for="session in sessions" :key="session.id" class="border-b last:border-0">
                  <td class="px-4 py-3">
                    <div class="font-medium text-foreground">{{ session.title }}</div>
                    <p v-if="session.summary" class="mt-1 text-xs text-muted-foreground">{{ session.summary }}</p>
                  </td>
                  <td class="px-4 py-3 text-muted-foreground">{{ session.location ?? '—' }}</td>
                  <td class="px-4 py-3 text-muted-foreground">{{ session.scheduled_at ?? 'Unscheduled' }}</td>
                  <td class="px-4 py-3 text-muted-foreground">{{ session.deliverables ?? 0 }}</td>
                  <td class="px-4 py-3">
                    <div class="flex flex-col gap-1 text-xs">
                      <a v-if="session.hero_image_url" :href="session.hero_image_url" target="_blank" rel="noreferrer"
                        class="text-primary hover:underline">
                        View photo
                      </a>
                      <a v-if="session.highlight_video_url" :href="session.highlight_video_url" target="_blank"
                        rel="noreferrer" class="text-primary hover:underline">
                        View video
                      </a>
                      <span v-if="!session.hero_image_url && !session.highlight_video_url"
                        class="text-muted-foreground">—</span>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-2 text-xs text-muted-foreground">
                      <div class="flex items-center gap-1"
                        v-if="Array.isArray(session.gallery) && session.gallery.length">
                        <ImageIcon class="h-3.5 w-3.5" />
                        {{session.gallery.filter((item) => item.kind === 'image').length}}
                      </div>
                      <div class="flex items-center gap-1"
                        v-if="Array.isArray(session.gallery) && session.gallery.some((item) => item.kind === 'video')">
                        <Video class="h-3.5 w-3.5" />
                        {{session.gallery.filter((item) => item.kind === 'video').length}}
                      </div>
                      <span v-if="!Array.isArray(session.gallery) || !session.gallery.length">—</span>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <Badge :variant="session.status === 'Published' ? 'default' : 'outline'">{{ session.status }}
                    </Badge>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" @click="startEdit(session)">
                        <Pencil class="h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" @click="removeSession(session)">
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
          <CardTitle class="text-base">Production notes</CardTitle>
          <CardDescription>
            Capture briefing details per session, then publish once client approvals are in place.
          </CardDescription>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground">
          <p>
            These controls update local state only. Connect to your Laravel models to persist session changes and
            assets.
          </p>
        </CardContent>
      </Card>
    </div>
  </AdminLayout>

  <Dialog v-model:open="dialogOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ editingSession ? 'Edit session' : 'Add session' }}</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-4">
        <div class="space-y-2">
          <Label for="session-title">Title</Label>
          <Input id="session-title" v-model="form.title" placeholder="e.g. Corporate conference 2024" />
          <p v-if="form.errors.title" class="text-sm text-destructive">{{ form.errors.title }}</p>
        </div>
        <div class="space-y-2">
          <Label for="session-location">Location</Label>
          <Input id="session-location" v-model="form.location" placeholder="e.g. Nairobi, Kenya" />
          <p v-if="form.errors.location" class="text-sm text-destructive">{{ form.errors.location }}</p>
        </div>
        <div class="space-y-2">
          <Label for="session-hero-image">Hero image</Label>
          <Input id="session-hero-image" type="file" accept="image/*" @change="handleHeroImageChange" />
          <p class="text-xs text-muted-foreground">Upload up to 200 MB.</p>
          <p v-if="form.errors.hero_image" class="text-sm text-destructive">{{ form.errors.hero_image }}</p>
          <div v-if="editingSession?.hero_image_url" class="text-xs text-muted-foreground">
            Current image:
            <a :href="editingSession.hero_image_url" target="_blank" rel="noreferrer"
              class="text-primary hover:underline">
              Preview
            </a>
          </div>
        </div>
        <div class="space-y-2">
          <Label for="session-video">Highlight video</Label>
          <Input id="session-video" type="file" accept="video/mp4,video/quicktime"
            @change="handleHighlightVideoChange" />
          <p class="text-xs text-muted-foreground">Upload mp4 or mov files up to 200 MB.</p>
          <p v-if="form.errors.highlight_video" class="text-sm text-destructive">{{ form.errors.highlight_video }}</p>
          <div v-if="editingSession?.highlight_video_url" class="text-xs text-muted-foreground">
            Current video:
            <a :href="editingSession.highlight_video_url" target="_blank" rel="noreferrer"
              class="text-primary hover:underline">
              Preview
            </a>
          </div>
        </div>
        <div class="space-y-2">
          <Label for="session-gallery">Gallery images</Label>
          <Input id="session-gallery" type="file" accept="image/*" multiple @change="handleGalleryChange" />
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
          <Label for="session-summary">Summary</Label>
          <textarea id="session-summary" v-model="form.summary" rows="3"
            placeholder="Overview of the session for internal reference"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <p v-if="form.errors.summary" class="text-sm text-destructive">{{ form.errors.summary }}</p>
        </div>
        <div class="space-y-2">
          <Label for="session-deliverables">Deliverables</Label>
          <Input id="session-deliverables" type="number" min="0" v-model="form.deliverables" />
          <p v-if="form.errors.deliverables" class="text-sm text-destructive">{{ form.errors.deliverables }}</p>
        </div>
        <div class="space-y-2">
          <Label for="session-scheduled">Scheduled date</Label>
          <Input id="session-scheduled" type="date" v-model="form.scheduled_at" />
          <p v-if="form.errors.scheduled_at" class="text-sm text-destructive">{{ form.errors.scheduled_at }}</p>
        </div>
        <div class="space-y-2">
          <Label for="session-status">Status</Label>
          <select id="session-status" v-model="form.status"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option v-for="option in statusOptions" :key="option" :value="option">{{ option }}</option>
          </select>
          <p v-if="form.errors.status" class="text-sm text-destructive">{{ form.errors.status }}</p>
        </div>
      </div>
      <DialogFooter class="mt-4 flex items-center justify-end gap-2">
        <Button variant="ghost" @click="closeDialog">Cancel</Button>
        <Button :disabled="form.processing" @click="submitForm">Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
