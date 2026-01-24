<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/vue3';
import { Component } from 'vue';

interface Props {
  icon: Component;
  title: string;
  description: string;
  category?: string;
  categoryColor?: string;
  featured?: boolean;
  tags?: string[];
  image?: string;
  actions?: Array<{
    text: string;
    href: string;
    variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  }>;
  horizontal?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  featured: false,
  tags: () => [],
  actions: () => [],
  horizontal: false
});
</script>

<template>
  <Card :class="['overflow-hidden hover:shadow-lg transition-shadow', horizontal ? 'flex' : '']">
    <!-- Image Section -->
    <div v-if="image" :class="['relative bg-muted', horizontal ? 'w-1/3' : 'h-48']">
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      
      <!-- Category Badge -->
      <div v-if="category" class="absolute top-4 left-4">
        <Badge :class="categoryColor || 'bg-gray-500'" class="text-white">
          {{ category }}
        </Badge>
      </div>
      
      <!-- Featured Badge -->
      <div v-if="featured" class="absolute top-4 right-4">
        <Badge variant="secondary" class="bg-yellow-500 text-white">
          Featured
        </Badge>
      </div>
      
      <!-- Placeholder for image -->
      <div class="w-full h-full flex items-center justify-center">
        <component :is="icon" class="h-16 w-16 text-muted-foreground/50" />
      </div>
    </div>
    
    <!-- Content Section -->
    <div :class="[horizontal ? 'flex-1' : '']">
      <CardHeader>
        <div v-if="!image" class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <component :is="icon" class="h-5 w-5 text-primary" />
          </div>
          <CardTitle class="text-xl">{{ title }}</CardTitle>
        </div>
        
        <CardTitle v-if="image" class="text-xl">{{ title }}</CardTitle>
        <CardDescription class="text-base">
          {{ description }}
        </CardDescription>
      </CardHeader>
      
      <CardContent class="space-y-4">
        <!-- Tags -->
        <div v-if="tags.length > 0" class="flex flex-wrap gap-2">
          <Badge 
            v-for="tag in tags" 
            :key="tag"
            variant="outline"
            class="text-xs"
          >
            {{ tag }}
          </Badge>
        </div>
        
        <!-- Actions -->
        <div v-if="actions.length > 0" class="flex gap-2">
          <Button
            v-for="action in actions"
            :key="action.text"
            :variant="action.variant || 'outline'"
            size="sm"
            class="flex-1"
            as-child
          >
            <Link :href="action.href">
              {{ action.text }}
            </Link>
          </Button>
        </div>
      </CardContent>
    </div>
  </Card>
</template>
