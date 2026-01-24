<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/vue3';

interface Props {
  title: string;
  subtitle?: string;
  description: string;
  primaryAction?: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
  size?: 'small' | 'medium' | 'large';
  background?: 'default' | 'muted' | 'primary';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  background: 'default'
});

const sizeClasses = {
  small: 'py-12',
  medium: 'py-20',
  large: 'py-32'
};

const titleSizeClasses = {
  small: 'text-3xl md:text-4xl',
  medium: 'text-4xl md:text-5xl',
  large: 'text-5xl md:text-6xl lg:text-7xl'
};

const backgroundClasses = {
  default: '',
  muted: 'bg-muted/30',
  primary: 'bg-primary text-primary-foreground'
};
</script>

<template>
  <section :class="[sizeClasses[size], backgroundClasses[background]]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center">
        <h1 :class="['font-bold mb-6', titleSizeClasses[size]]">
          <span v-if="background === 'primary'" class="text-primary-foreground">
            {{ title }}
          </span>
          <span v-else class="text-foreground">
            {{ title }}
          </span>
        </h1>
        
        <h2 v-if="subtitle" :class="[
          'mb-6',
          background === 'primary' ? 'text-primary-foreground/90' : 'text-muted-foreground'
        ]">
          {{ subtitle }}
        </h2>
        
        <p :class="[
          'text-xl mb-8',
          background === 'primary' ? 'text-primary-foreground/80' : 'text-muted-foreground'
        ]">
          {{ description }}
        </p>
        
        <div v-if="primaryAction || secondaryAction" class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            v-if="primaryAction" 
            :size="size === 'large' ? 'lg' : 'default'"
            :variant="background === 'primary' ? 'secondary' : 'default'"
            as-child
          >
            <Link :href="primaryAction.href">
              {{ primaryAction.text }}
            </Link>
          </Button>
          
          <Button 
            v-if="secondaryAction" 
            :size="size === 'large' ? 'lg' : 'default'"
            :variant="background === 'primary' ? 'outline' : 'outline'"
            :class="background === 'primary' ? 'border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary' : ''"
            as-child
          >
            <Link :href="secondaryAction.href">
              {{ secondaryAction.text }}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
