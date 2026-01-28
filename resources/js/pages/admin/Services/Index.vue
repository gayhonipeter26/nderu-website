<script setup lang="ts">
import { computed, ref } from 'vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Badge } from '@/components/ui/badge/index';
import { Button } from '@/components/ui/button/index';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card/index';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog/index';
import { Input } from '@/components/ui/input/index';
import { Label } from '@/components/ui/label/index';
import { Pencil, Plus, Trash2 } from 'lucide-vue-next';
import { useForm, router } from '@inertiajs/vue3';

type ServiceStatus = 'Published' | 'Draft';

interface Service {
  id: number;
  title: string;
  summary: string | null;
  status: ServiceStatus;
  updated_at: string | null;
}

const props = defineProps<{ services: Service[] }>();

const breadcrumbs = computed(() => [
  { title: 'Admin', href: '/admin' },
  { title: 'Services' },
]);

const dialogOpen = ref(false);
const editingService = ref<Service | null>(null);

const form = useForm({
  title: '',
  summary: '',
  status: 'Published' as ServiceStatus,
});

const statuses: ServiceStatus[] = ['Published', 'Draft'];

function startCreate() {
  editingService.value = null;
  form.reset();
  form.clearErrors();
  form.status = 'Published';
  dialogOpen.value = true;
}

function startEdit(service: Service) {
  editingService.value = service;
  form.reset();
  form.clearErrors();
  form.title = service.title;
  form.summary = service.summary ?? '';
  form.status = service.status;
  dialogOpen.value = true;
}

function submitForm() {
  const options = {
    preserveScroll: true,
    onSuccess: () => {
      dialogOpen.value = false;
      form.reset();
      form.clearErrors();
    },
  } as const;

  if (editingService.value) {
    form.put(`/admin/services/${editingService.value.id}`, options);
  } else {
    form.post('/admin/services', options);
  }
}

function deleteService(service: Service) {
  if (!confirm(`Remove “${service.title}”?`)) {
    return;
  }

  router.delete(`/admin/services/${service.id}`, {
    preserveScroll: true,
  });
}

function closeDialog() {
  dialogOpen.value = false;
  form.reset();
  form.clearErrors();
  editingService.value = null;
}
</script>

<template>
  <AdminLayout :breadcrumbs="breadcrumbs">
    <div class="flex flex-col gap-6 p-6">
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <div>
            <Badge variant="secondary" class="w-fit mb-2">Services</Badge>
            <h1 class="text-3xl font-semibold tracking-tight">Manage service catalogue</h1>
            <p class="text-muted-foreground text-sm">
              Update the offerings that appear on the public services page.
            </p>
          </div>
          <Button @click="startCreate">
            <Plus class="h-4 w-4" />
            Add service
          </Button>
        </div>
      </div>

      <div class="grid gap-4 lg:grid-cols-2">
        <Card v-for="service in props.services" :key="service.id" class="flex flex-col">
          <CardHeader>
            <div class="flex items-start justify-between gap-4">
              <div>
                <CardTitle class="text-lg">{{ service.title }}</CardTitle>
                <CardDescription>{{ service.summary }}</CardDescription>
              </div>
              <Badge :variant="service.status === 'Published' ? 'default' : 'outline'">
                {{ service.status }}
              </Badge>
            </div>
          </CardHeader>
          <CardContent class="mt-auto flex items-center justify-between text-sm text-muted-foreground">
            <div>Updated {{ service.updated_at ?? '—' }}</div>
            <div class="flex items-center gap-2">
              <Button variant="ghost" size="sm" @click="startEdit(service)">
                <Pencil class="h-4 w-4" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" @click="deleteService(service)">
                <Trash2 class="h-4 w-4" />
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle class="text-base">Publishing guidance</CardTitle>
          <CardDescription>
            Services appear on the public site in alphabetical order. Draft entries remain hidden until they are marked
            as published.
          </CardDescription>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground">
          <p>
            Use the editor to keep summaries concise and action oriented. Changes take effect immediately once saved.
          </p>
        </CardContent>
      </Card>
    </div>
  </AdminLayout>

  <Dialog v-model:open="dialogOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {{ editingService ? 'Edit service' : 'Add service' }}
        </DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-4">
        <div class="space-y-2">
          <Label for="service-title">Title</Label>
          <Input id="service-title" v-model="form.title" placeholder="e.g. Web applications" />
          <p v-if="form.errors.title" class="text-sm text-destructive">{{ form.errors.title }}</p>
        </div>
        <div class="space-y-2">
          <Label for="service-summary">Summary</Label>
          <textarea id="service-summary" v-model="form.summary"
            placeholder="Describe the service in one or two sentences" rows="3"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <p v-if="form.errors.summary" class="text-sm text-destructive">{{ form.errors.summary }}</p>
        </div>
        <div class="space-y-2">
          <Label for="service-status">Status</Label>
          <select id="service-status" v-model="form.status"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option v-for="option in statuses" :key="option" :value="option">{{ option }}</option>
          </select>
          <p v-if="form.errors.status" class="text-sm text-destructive">{{ form.errors.status }}</p>
        </div>
        <DialogFooter class="mt-4 flex items-center justify-end gap-2">
          <Button variant="ghost" @click="closeDialog">Cancel</Button>
          <Button :disabled="form.processing" @click="submitForm">
            <span v-if="form.processing">Saving…</span>
            <span v-else>Save</span>
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
  </Dialog>
</template>
