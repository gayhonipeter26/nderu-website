<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { Badge } from '@/components/ui/badge/index';
import { Button } from '@/components/ui/button/index';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog/index';
import { Input } from '@/components/ui/input/index';
import { Label } from '@/components/ui/label/index';
import { Pencil, Plus, Trash2 } from 'lucide-vue-next';

type FaqStatus = 'Published' | 'Draft';

type Faq = {
  id: number;
  question: string;
  answer: string;
  status: FaqStatus;
};

type ResourceCollection<T> = { data: T[] };

const props = defineProps<{ faqs: Faq[] | ResourceCollection<Faq> }>();

const breadcrumbs = computed(() => [
  { title: 'Admin', href: '/admin' },
  { title: 'FAQs' },
]);

const normaliseFaqs = (value: Faq[] | ResourceCollection<Faq> | undefined | null): Faq[] => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (value && Array.isArray(value.data)) {
    return value.data;
  }

  return [];
};

const faqs = ref<Faq[]>(normaliseFaqs(props.faqs));
watch(
  () => props.faqs,
  (value) => {
    faqs.value = normaliseFaqs(value);
  },
);

const dialogOpen = ref(false);
const editingFaq = ref<Faq | null>(null);
const form = reactive<{ question: string; answer: string; status: FaqStatus }>({
  question: '',
  answer: '',
  status: 'Published',
});

const statusOptions: FaqStatus[] = ['Published', 'Draft'];

function resetForm() {
  form.question = '';
  form.answer = '';
  form.status = 'Published';
}

function startCreate() {
  editingFaq.value = null;
  resetForm();
  dialogOpen.value = true;
}

function startEdit(item: Faq) {
  editingFaq.value = item;
  form.question = item.question;
  form.answer = item.answer;
  form.status = item.status;
  dialogOpen.value = true;
}

function submitForm() {
  if (!form.question.trim()) {
    return;
  }

  const payload: Faq = {
    id: editingFaq.value?.id ?? Date.now(),
    question: form.question,
    answer: form.answer,
    status: form.status,
  };

  if (editingFaq.value) {
    faqs.value = faqs.value.map((faq) => (faq.id === editingFaq.value?.id ? payload : faq));
  } else {
    faqs.value = [payload, ...faqs.value];
  }

  dialogOpen.value = false;
}

function removeFaq(id: number) {
  faqs.value = faqs.value.filter((faq) => faq.id !== id);
}
</script>

<template>
  <AdminLayout :breadcrumbs="breadcrumbs">
    <div class="flex flex-col gap-6 p-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Badge variant="secondary" class="mb-2 w-fit">FAQs</Badge>
          <h1 class="text-3xl font-semibold tracking-tight">Knowledge base</h1>
          <p class="text-sm text-muted-foreground">
            Keep the frequently asked questions current and aligned with client conversations.
          </p>
        </div>
        <Button @click="startCreate">
          <Plus class="h-4 w-4" />
          Add FAQ
        </Button>
      </div>

      <div class="grid gap-4 lg:grid-cols-2">
        <Card v-for="faq in faqs" :key="faq.id" class="flex flex-col">
          <CardHeader>
            <div class="flex items-start justify-between gap-4">
              <div>
                <CardTitle class="text-lg">{{ faq.question }}</CardTitle>
                <CardDescription>{{ faq.answer }}</CardDescription>
              </div>
              <Badge :variant="faq.status === 'Published' ? 'default' : 'outline'">
                {{ faq.status }}
              </Badge>
            </div>
          </CardHeader>
          <CardContent class="mt-auto flex items-center justify-end gap-2 text-sm text-muted-foreground">
            <Button variant="ghost" size="sm" @click="startEdit(faq)">
              <Pencil class="h-4 w-4" />
              Edit
            </Button>
            <Button variant="ghost" size="sm" @click="removeFaq(faq.id)">
              <Trash2 class="h-4 w-4" />
              Remove
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle class="text-base">Publishing guidance</CardTitle>
          <CardDescription>
            Draft items remain hidden from the public FAQ accordion until marked as published.
          </CardDescription>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground">
          <p>
            Hook these forms into your Laravel controllers to persist changes. Consider adding versioning if legal copy
            requires approval.
          </p>
        </CardContent>
      </Card>
    </div>
  </AdminLayout>

  <Dialog v-model:open="dialogOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ editingFaq ? 'Edit FAQ' : 'Add FAQ' }}</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-4">
        <div class="space-y-2">
          <Label for="faq-question">Question</Label>
          <Input id="faq-question" v-model="form.question" placeholder="e.g. What is the usual response time?" />
        </div>
        <div class="space-y-2">
          <Label for="faq-answer">Answer</Label>
          <textarea id="faq-answer" v-model="form.answer" rows="4" placeholder="Provide a concise, helpful response"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </div>
        <div class="space-y-2">
          <Label for="faq-status">Status</Label>
          <select id="faq-status" v-model="form.status"
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
