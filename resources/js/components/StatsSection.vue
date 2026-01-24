<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';

interface Stat {
  label: string;
  value: string;
  icon?: any;
}

interface Props {
  stats: Stat[];
  columns?: 2 | 3 | 4;
  background?: 'default' | 'muted';
}

const props = withDefaults(defineProps<Props>(), {
  columns: 4,
  background: 'default'
});

const gridClasses = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4'
};
</script>

<template>
  <section :class="['py-20', background === 'muted' ? 'bg-muted/30' : '']">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div :class="['grid gap-8', gridClasses[columns]]">
        <Card v-for="stat in stats" :key="stat.label" class="text-center p-6">
          <CardContent class="p-0">
            <div v-if="stat.icon" class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <component :is="stat.icon" class="h-6 w-6 text-primary" />
            </div>
            <div class="text-2xl md:text-4xl font-bold text-primary mb-2">{{ stat.value }}</div>
            <div class="text-muted-foreground">{{ stat.label }}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
