<script setup lang="ts">
import { useForm, router } from '@inertiajs/vue3';
import { Image as ImageIcon, Pencil, Plus, Trash2, Video } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { Badge } from '@/components/ui/badge/index';
import { Button } from '@/components/ui/button/index';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog/index';
import { Input } from '@/components/ui/input/index';
import { Label } from '@/components/ui/label/index';
import AdminLayout from '@/layouts/AdminLayout.vue';

type ProjectStatus = 'Published' | 'Draft';

interface MediaAsset {
  id: number;
  url: string;
  kind: 'image' | 'video';
  position: number;
}

interface Project {
  id: number;
  title: string;
  category: string | null;
  summary: string | null;
  year: number | null;
  status: ProjectStatus;
  featured: boolean;
  hero_image_url: string | null;
  case_study_video_url: string | null;
  gallery?: MediaAsset[];
  updated_at: string | null;
}

type ResourceCollection<T> = { data: T[] };

const props = defineProps<{ projects: Project[] | ResourceCollection<Project> }>();

const projects = computed<Project[]>(() => {
  const source = props.projects;
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
  { title: 'Projects' },
]);

const dialogOpen = ref(false);
const editingProject = ref<Project | null>(null);

const form = useForm({
  title: '',
  category: '',
  summary: '',
  status: 'Published' as ProjectStatus,
  year: String(new Date().getFullYear()),
  featured: false,
  hero_image: null as File | null,
  case_study_video: null as File | null,
  gallery: [] as File[],
  gallery_remove: [] as number[],
});

const statusOptions: ProjectStatus[] = ['Published', 'Draft'];

const existingGallery = ref<MediaAsset[]>([]);
const newGalleryPreviews = ref<{ name: string; url: string }[]>([]);

function startCreate() {
  editingProject.value = null;
  form.reset();
  form.clearErrors();
  form.status = 'Published';
  form.year = String(new Date().getFullYear());
  form.featured = false;
  form.hero_image = null;
  form.case_study_video = null;
  form.gallery = [];
  form.gallery_remove = [];
  existingGallery.value = [];
  newGalleryPreviews.value.forEach((preview) => URL.revokeObjectURL(preview.url));
  newGalleryPreviews.value = [];
  dialogOpen.value = true;
}

function startEdit(project: Project) {
  editingProject.value = project;
  form.reset();
  form.clearErrors();
  form.title = project.title;
  form.category = project.category ?? '';
  form.summary = project.summary ?? '';
  form.status = project.status;
  form.year = project.year ? String(project.year) : String(new Date().getFullYear());
  form.featured = project.featured;
  form.hero_image = null;
  form.case_study_video = null;
  form.gallery = [];
  form.gallery_remove = [];
  existingGallery.value = Array.isArray(project.gallery) ? [...project.gallery] : [];
  newGalleryPreviews.value.forEach((preview) => URL.revokeObjectURL(preview.url));
  newGalleryPreviews.value = [];
  dialogOpen.value = true;
}

function submitForm() {
  const options = {
    preserveScroll: true,
    onSuccess: () => closeDialog(),
    forceFormData: true,
  } as const;

  const year = form.year ? Number(form.year) : null;

  const transformer = () => {
    const output: Record<string, unknown> = {
      ...form.data(),
      year,
      featured: form.featured,
    };

    if (!form.hero_image) {
      delete output.hero_image;
    }

    if (!form.case_study_video) {
      delete output.case_study_video;
    }

    if (!form.gallery.length) {
      delete output.gallery;
    }

    if (!form.gallery_remove.length) {
      delete output.gallery_remove;
    }

    return output;
  };

  if (editingProject.value) {
    form.transform(transformer).put(`/admin/projects/${editingProject.value.id}`, options);
  } else {
    form.transform(transformer).post('/admin/projects', options);
  }
}

function deleteProject(project: Project) {
  if (!confirm(`Remove “${project.title}”?`)) {
    return;
  }

  router.delete(`/admin/projects/${project.id}`, {
    preserveScroll: true,
  });
}

function closeDialog() {
  dialogOpen.value = false;
  form.reset();
  form.clearErrors();
  editingProject.value = null;
  existingGallery.value = [];
  newGalleryPreviews.value.forEach((preview) => URL.revokeObjectURL(preview.url));
  newGalleryPreviews.value = [];
}

function handleHeroImageChange(event: Event) {
  const target = event.target as HTMLInputElement;
  form.hero_image = target.files?.[0] ?? null;
}

function handleCaseStudyVideoChange(event: Event) {
  const target = event.target as HTMLInputElement;
  form.case_study_video = target.files?.[0] ?? null;
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
          <Badge variant="secondary" class="mb-2 w-fit">Projects</Badge>
          <h1 class="text-3xl font-semibold tracking-tight">Portfolio overview</h1>
          <p class="text-sm text-muted-foreground">
            Curate the case studies that highlight expertise on the public site.
          </p>
        </div>
        <Button @click="startCreate">
          <Plus class="h-4 w-4" />
          Add project
        </Button>
      </div>

      <Card>
        <CardHeader class="pb-4">
          <CardTitle class="text-base">Project catalogue</CardTitle>
          <CardDescription>Featured and published projects appear on the public portfolio immediately.</CardDescription>
        </CardHeader>
        <CardContent class="p-0">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th class="px-4 py-3 font-medium">Title</th>
                  <th class="px-4 py-3 font-medium">Category</th>
                  <th class="px-4 py-3 font-medium">Year</th>
                  <th class="px-4 py-3 font-medium">Status</th>
                  <th class="px-4 py-3 font-medium">Featured</th>
                  <th class="px-4 py-3 font-medium">Media</th>
                  <th class="px-4 py-3 font-medium">Gallery</th>
                  <th class="px-4 py-3 font-medium">Updated</th>
                  <th class="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="projects.length === 0">
                  <td colspan="8" class="px-4 py-6 text-center text-sm text-muted-foreground">
                    No projects yet. Add your first project to populate the public portfolio.
                  </td>
                </tr>
                <tr v-for="project in projects" :key="project.id" class="border-b last:border-0">
                  <td class="px-4 py-3">
                    <div class="font-medium text-foreground">{{ project.title }}</div>
                    <p class="mt-1 text-xs text-muted-foreground" v-if="project.summary">{{ project.summary }}</p>
                  </td>
                  <td class="px-4 py-3 text-muted-foreground">{{ project.category ?? '—' }}</td>
                  <td class="px-4 py-3 text-muted-foreground">{{ project.year ?? '—' }}</td>
                  <td class="px-4 py-3">
                    <Badge :variant="project.status === 'Published' ? 'default' : 'outline'">{{ project.status }}
                    </Badge>
                  </td>
                  <td class="px-4 py-3">
                    <Badge v-if="project.featured" variant="secondary">Yes</Badge>
                    <span v-else class="text-muted-foreground">No</span>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex flex-col gap-1 text-xs">
                      <a v-if="project.hero_image_url" :href="project.hero_image_url" target="_blank" rel="noreferrer"
                        class="text-primary hover:underline">
                        View image
                      </a>
                      <a v-if="project.case_study_video_url" :href="project.case_study_video_url" target="_blank"
                        rel="noreferrer" class="text-primary hover:underline">
                        View video
                      </a>
                      <span v-if="!project.hero_image_url && !project.case_study_video_url"
                        class="text-muted-foreground">—</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-muted-foreground">{{ project.updated_at ?? '—' }}</td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-2 text-xs text-muted-foreground">
                      <div class="flex items-center gap-1"
                        v-if="Array.isArray(project.gallery) && project.gallery.length">
                        <ImageIcon class="h-3.5 w-3.5" />
                        {{project.gallery.filter((item) => item.kind === 'image').length}}
                      </div>
                      <div class="flex items-center gap-1"
                        v-if="Array.isArray(project.gallery) && project.gallery.some((item) => item.kind === 'video')">
                        <Video class="h-3.5 w-3.5" />
                        {{project.gallery.filter((item) => item.kind === 'video').length}}
                      </div>
                      <span v-if="!Array.isArray(project.gallery) || !project.gallery.length">—</span>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" @click="startEdit(project)">
                        <Pencil class="h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" @click="deleteProject(project)">
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
          <CardTitle class="text-base">Guidance</CardTitle>
          <CardDescription>
            Align the selection of projects with current priorities and offerings. Draft entries stay hidden until
            published.
          </CardDescription>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground">
          <p>
            Use the featured flag to spotlight priority work on the public site. Consider adding tags when the catalogue
            grows.
          </p>
        </CardContent>
      </Card>
    </div>
  </AdminLayout>

  <Dialog v-model:open="dialogOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ editingProject ? 'Edit project' : 'Add project' }}</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-4">
        <div class="space-y-2">
          <Label for="project-title">Title</Label>
          <Input id="project-title" v-model="form.title" placeholder="e.g. E-commerce platform rollout" />
        </div>
        <div class="space-y-2">
          <Label for="project-category">Category</Label>
          <Input id="project-category" v-model="form.category" placeholder="e.g. Web applications" />
        </div>
        <div class="space-y-2">
          <Label for="project-year">Year</Label>
          <Input id="project-year" type="number" min="2000" max="2100" v-model="form.year" />
          <p v-if="form.errors.year" class="text-sm text-destructive">{{ form.errors.year }}</p>
        </div>
        <div class="space-y-2">
          <Label for="project-status">Status</Label>
          <select id="project-status" v-model="form.status"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option v-for="option in statusOptions" :key="option" :value="option">{{ option }}</option>
          </select>
          <p v-if="form.errors.status" class="text-sm text-destructive">{{ form.errors.status }}</p>
        </div>
        <div class="space-y-2">
          <Label for="project-summary">Summary (optional)</Label>
          <textarea id="project-summary" v-model="form.summary" placeholder="Short description for internal reference"
            rows="3" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <p v-if="form.errors.summary" class="text-sm text-destructive">{{ form.errors.summary }}</p>
        </div>
        <div class="space-y-2">
          <Label for="project-hero-image">Hero image</Label>
          <Input id="project-hero-image" type="file" accept="image/*" @change="handleHeroImageChange" />
          <p class="text-xs text-muted-foreground">Upload up to 200 MB.</p>
          <p v-if="form.errors.hero_image" class="text-sm text-destructive">{{ form.errors.hero_image }}</p>
          <div v-if="editingProject?.hero_image_url" class="text-xs text-muted-foreground">
            Current image:
            <a :href="editingProject.hero_image_url" target="_blank" rel="noreferrer"
              class="text-primary hover:underline">
              Preview
            </a>
          </div>
        </div>
        <div class="space-y-2">
          <Label for="project-case-study-video">Case study video</Label>
          <Input id="project-case-study-video" type="file" accept="video/mp4,video/quicktime"
            @change="handleCaseStudyVideoChange" />
          <p class="text-xs text-muted-foreground">Upload mp4 or mov files up to 200 MB.</p>
          <p v-if="form.errors.case_study_video" class="text-sm text-destructive">{{ form.errors.case_study_video }}</p>
          <div v-if="editingProject?.case_study_video_url" class="text-xs text-muted-foreground">
            Current video:
            <a :href="editingProject.case_study_video_url" target="_blank" rel="noreferrer"
              class="text-primary hover:underline">
              Preview
            </a>
          </div>
        </div>
        <div class="space-y-2">
          <Label for="project-gallery">Gallery images</Label>
          <Input id="project-gallery" type="file" accept="image/*" multiple @change="handleGalleryChange" />
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
          <Label for="project-summary">Summary (optional)</Label>
          <textarea id="project-summary" v-model="form.summary" placeholder="Short description for internal reference"
            rows="3" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <p v-if="form.errors.summary" class="text-sm text-destructive">{{ form.errors.summary }}</p>
        </div>
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <Label for="project-featured">Featured</Label>
            <p class="text-xs text-muted-foreground">Mark as featured to highlight on the public portfolio.</p>
          </div>
          <input id="project-featured" type="checkbox"
            class="h-4 w-4 rounded border-input text-primary focus-visible:ring-ring" :checked="form.featured"
            @change="form.featured = !form.featured" />
        </div>
        <div v-if="form.hasErrors" class="space-y-1 text-sm text-destructive">
          <p v-for="(error, key) in form.errors" :key="key">{{ error }}</p>
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
