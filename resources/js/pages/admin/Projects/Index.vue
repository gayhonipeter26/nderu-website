<script setup lang="ts">
import { computed, ref } from 'vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Plus, Trash2 } from 'lucide-vue-next';
import { useForm, router } from '@inertiajs/vue3';

type ProjectStatus = 'Published' | 'Draft';

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
});

const statusOptions: ProjectStatus[] = ['Published', 'Draft'];

function startCreate() {
  editingProject.value = null;
  form.reset();
  form.clearErrors();
  form.status = 'Published';
  form.year = String(new Date().getFullYear());
  form.featured = false;
  form.hero_image = null;
  form.case_study_video = null;
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
}

function handleHeroImageChange(event: Event) {
  const target = event.target as HTMLInputElement;
  form.hero_image = target.files?.[0] ?? null;
}

function handleCaseStudyVideoChange(event: Event) {
  const target = event.target as HTMLInputElement;
  form.case_study_video = target.files?.[0] ?? null;
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
                    <Badge :variant="project.status === 'Published' ? 'default' : 'outline'">{{ project.status }}</Badge>
                  </td>
                  <td class="px-4 py-3">
                    <Badge v-if="project.featured" variant="secondary">Yes</Badge>
                    <span v-else class="text-muted-foreground">No</span>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex flex-col gap-1 text-xs">
                      <a
                        v-if="project.hero_image_url"
                        :href="project.hero_image_url"
                        target="_blank"
                        rel="noreferrer"
                        class="text-primary hover:underline"
                      >
                        View image
                      </a>
                      <a
                        v-if="project.case_study_video_url"
                        :href="project.case_study_video_url"
                        target="_blank"
                        rel="noreferrer"
                        class="text-primary hover:underline"
                      >
                        View video
                      </a>
                      <span v-if="!project.hero_image_url && !project.case_study_video_url" class="text-muted-foreground">—</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-muted-foreground">{{ project.updated_at ?? '—' }}</td>
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
            Use the featured flag to spotlight priority work on the public site. Consider adding tags when the catalogue grows.
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
          <select
            id="project-status"
            v-model="form.status"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option v-for="option in statusOptions" :key="option" :value="option">{{ option }}</option>
          </select>
          <p v-if="form.errors.status" class="text-sm text-destructive">{{ form.errors.status }}</p>
        </div>
        <div class="space-y-2">
          <Label for="project-summary">Summary (optional)</Label>
          <textarea
            id="project-summary"
            v-model="form.summary"
            placeholder="Short description for internal reference"
            rows="3"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <p v-if="form.errors.summary" class="text-sm text-destructive">{{ form.errors.summary }}</p>
        </div>
        <div class="space-y-2">
          <Label for="project-hero-image">Hero image</Label>
          <Input id="project-hero-image" type="file" accept="image/*" @change="handleHeroImageChange" />
          <p v-if="form.errors.hero_image" class="text-sm text-destructive">{{ form.errors.hero_image }}</p>
          <div v-if="editingProject?.hero_image_url" class="text-xs text-muted-foreground">
            Current image:
            <a :href="editingProject.hero_image_url" target="_blank" rel="noreferrer" class="text-primary hover:underline">
              Preview
            </a>
          </div>
        </div>
        <div class="space-y-2">
          <Label for="project-case-study-video">Case study video</Label>
          <Input
            id="project-case-study-video"
            type="file"
            accept="video/mp4,video/quicktime"
            @change="handleCaseStudyVideoChange"
          />
          <p v-if="form.errors.case_study_video" class="text-sm text-destructive">{{ form.errors.case_study_video }}</p>
          <div v-if="editingProject?.case_study_video_url" class="text-xs text-muted-foreground">
            Current video:
            <a :href="editingProject.case_study_video_url" target="_blank" rel="noreferrer" class="text-primary hover:underline">
              Preview
            </a>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <Label for="project-featured">Featured</Label>
            <p class="text-xs text-muted-foreground">Mark as featured to highlight on the public portfolio.</p>
          </div>
          <input
            id="project-featured"
            type="checkbox"
            class="h-4 w-4 rounded border-input text-primary focus-visible:ring-ring"
            :checked="form.featured"
            @change="form.featured = !form.featured"
          />
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
