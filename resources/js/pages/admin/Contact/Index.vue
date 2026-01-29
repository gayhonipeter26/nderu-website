<script setup lang="ts">
import { Pencil, Plus, Trash2 } from 'lucide-vue-next';
import { computed, reactive, ref, watch } from 'vue';
import { Badge } from '@/components/ui/badge/index';
import { Button } from '@/components/ui/button/index';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog/index';
import { Input } from '@/components/ui/input/index';
import { Label } from '@/components/ui/label/index';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/layouts/AdminLayout.vue';

type ChannelStatus = 'Published' | 'Draft';

type ChannelType = 'mailto' | 'tel' | 'note' | 'link';

type Channel = {
  id: number;
  label: string;
  value: string;
  status: ChannelStatus;
  type: ChannelType;
};

const props = defineProps<{ channels: Channel[] }>();

const breadcrumbs = computed(() => [
  { title: 'Admin', href: '/admin' },
  { title: 'Contact' },
]);

const channels = ref<Channel[]>([...props.channels]);
watch(
  () => props.channels,
  (value) => {
    channels.value = [...value];
  },
);

const dialogOpen = ref(false);
const editingChannel = ref<Channel | null>(null);
const form = reactive<{ label: string; value: string; status: ChannelStatus; type: ChannelType }>({
  label: '',
  value: '',
  status: 'Published',
  type: 'mailto',
});

const statusOptions: ChannelStatus[] = ['Published', 'Draft'];
const typeOptions: ChannelType[] = ['mailto', 'tel', 'note', 'link'];

function resetForm() {
  form.label = '';
  form.value = '';
  form.status = 'Published';
  form.type = 'mailto';
}

function startCreate() {
  editingChannel.value = null;
  resetForm();
  dialogOpen.value = true;
}

function startEdit(channel: Channel) {
  editingChannel.value = channel;
  form.label = channel.label;
  form.value = channel.value;
  form.status = channel.status;
  form.type = channel.type;
  dialogOpen.value = true;
}

function submitForm() {
  if (!form.label.trim()) {
    return;
  }

  const payload: Channel = {
    id: editingChannel.value?.id ?? Date.now(),
    label: form.label,
    value: form.value,
    status: form.status,
    type: form.type,
  };

  if (editingChannel.value) {
    channels.value = channels.value.map((channel) =>
      channel.id === editingChannel.value?.id ? payload : channel,
    );
  } else {
    channels.value = [payload, ...channels.value];
  }

  dialogOpen.value = false;
}

function removeChannel(id: number) {
  channels.value = channels.value.filter((channel) => channel.id !== id);
}
</script>

<template>
  <AdminLayout :breadcrumbs="breadcrumbs">
    <div class="flex flex-col gap-6 p-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Badge variant="secondary" class="mb-2 w-fit">Contact</Badge>
          <h1 class="text-3xl font-semibold tracking-tight">Communication channels</h1>
          <p class="text-sm text-muted-foreground">
            Configure the touchpoints surfaced on the public contact page and hero sections.
          </p>
        </div>
        <Button @click="startCreate">
          <Plus class="h-4 w-4" />
          Add channel
        </Button>
      </div>

      <div class="grid gap-4 lg:grid-cols-2">
        <Card v-for="channel in channels" :key="channel.id" class="flex flex-col">
          <CardHeader>
            <div class="flex items-start justify-between gap-4">
              <div>
                <CardTitle class="text-lg">{{ channel.label }}</CardTitle>
                <CardDescription>
                  <span class="uppercase text-xs tracking-wide text-muted-foreground">{{ channel.type }}</span>
                  ·
                  {{ channel.value }}
                </CardDescription>
              </div>
              <Badge :variant="channel.status === 'Published' ? 'default' : 'outline'">
                {{ channel.status }}
              </Badge>
            </div>
          </CardHeader>
          <CardContent class="mt-auto flex items-center justify-end gap-2 text-sm text-muted-foreground">
            <Button variant="ghost" size="sm" @click="startEdit(channel)">
              <Pencil class="h-4 w-4" />
              Edit
            </Button>
            <Button variant="ghost" size="sm" @click="removeChannel(channel.id)">
              <Trash2 class="h-4 w-4" />
              Remove
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle class="text-base">Operational notes</CardTitle>
          <CardDescription>
            Use status to hide channels temporarily while keeping their configuration ready.
          </CardDescription>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground">
          <p>
            Persistence is not wired yet. Connect this UI to your Laravel controllers and models to sync the contact
            channels shown on the public site and in notification workflows.
          </p>
        </CardContent>
      </Card>
    </div>
  </AdminLayout>

  <Dialog v-model:open="dialogOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ editingChannel ? 'Edit channel' : 'Add channel' }}</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-4">
        <div class="space-y-2">
          <Label for="channel-label">Label</Label>
          <Input id="channel-label" v-model="form.label" placeholder="e.g. Email" />
        </div>
        <div class="space-y-2">
          <Label for="channel-value">Value</Label>
          <Input id="channel-value" v-model="form.value" placeholder="e.g. hello@nderu.com" />
        </div>
        <div class="space-y-2">
          <Label for="channel-type">Type</Label>
          <Select v-model="form.type">
            <SelectTrigger id="channel-type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="option in typeOptions" :key="option" :value="option">{{ option }}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="space-y-2">
          <Label for="channel-status">Status</Label>
          <select id="channel-status" v-model="form.status"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option v-for="option in statusOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
      </div>
      <DialogFooter class="mt-4 flex items-center justify-end gap-2">
        <Button variant="ghost" @click="dialogOpen = false">Cancel</Button>
        <Button @click="submitForm">Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
