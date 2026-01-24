<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/vue3';

interface Props {
  title: string;
  description: string;
  primaryAction?: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
  background?: 'primary' | 'muted' | 'default';
}

const props = withDefaults(defineProps<Props>(), {
  background: 'primary'
});

const backgroundClasses = {
  primary: 'bg-primary text-primary-foreground',
  muted: 'bg-muted/30',
  default: ''
};

const buttonVariants = {
  primary: {
    primary: 'secondary' as const,
    secondary: 'outline' as const
  },
  muted: {
    primary: 'default' as const,
    secondary: 'outline' as const
  },
  default: {
    primary: 'default' as const,
    secondary: 'outline' as const
  }
};
</script>

<template>
  <section :class="['py-20', backgroundClasses[background]]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 :class="[
        'text-3xl md:text-4xl font-bold mb-4',
        background === 'primary' ? 'text-primary-foreground' : 'text-foreground'
      ]">
        {{ title }}
      </h2>
      <p :class="[
        'text-xl mb-8 max-w-2xl mx-auto',
        background === 'primary' ? 'text-primary-foreground opacity-90' : 'text-muted-foreground'
      ]">
        {{ description }}
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          v-if="primaryAction" 
          size="lg"
          class="text-lg px-8 py-6"
          :variant="buttonVariants[background].primary"
          :class="background === 'primary' && buttonVariants[background].primary === 'secondary' ? 'text-primary-foreground' : ''"
          as-child
        >
          <Link :href="primaryAction.href">
            {{ primaryAction.text }}
          </Link>
        </Button>
        
        <Button 
          v-if="secondaryAction" 
          size="lg"
          class="text-lg px-8 py-6"
          :variant="buttonVariants[background].secondary"
          :class="background === 'primary' ? 'border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary' : ''"
          as-child
        >
          <Link :href="secondaryAction.href">
            {{ secondaryAction.text }}
          </Link>
        </Button>
      </div>
    </div>
  </section>
</template>
