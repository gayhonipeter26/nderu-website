<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code, Database, Camera, Users, Target, Shield, Zap } from 'lucide-vue-next';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

const offerings = [
  {
    title: 'Web application delivery',
    icon: Code,
    description: 'Full-stack builds covering frontend, backend, and infrastructure.',
    details: ['Vue.js and Laravel implementations', 'API design and integrations', 'Deployment and monitoring setup'],
    cta: 'Discuss project scope',
  },
  {
    title: 'Systems architecture',
    icon: Database,
    description: 'Designing resilient platforms for healthcare, finance, and commerce.',
    details: ['Discovery and requirements analysis', 'Architecture documentation', 'Scaling and performance planning'],
    cta: 'Book architecture review',
  },
  {
    title: 'Professional photography',
    icon: Camera,
    description: 'Commercial, event, and portrait photography with editing workflows.',
    details: ['On-location shoots', 'Post-production editing', 'Delivery tailored to marketing teams'],
    cta: 'Enquire about availability',
  },
  {
    title: 'Technology consulting',
    icon: Users,
    description: 'Advisory services for delivery roadmaps and team enablement.',
    details: ['Workshops and assessment', 'Implementation oversight', 'Process and tooling setup'],
    cta: 'Arrange a consultation',
  },
];

const process = [
  {
    title: 'Discovery',
    description: 'Clarify goals, stakeholders, and success criteria.',
    icon: Target,
  },
  {
    title: 'Solution design',
    description: 'Outline architecture, delivery plan, and resourcing.',
    icon: Shield,
  },
  {
    title: 'Execution',
    description: 'Iterative delivery with checkpoints and reviews.',
    icon: Code,
  },
  {
    title: 'Support',
    description: 'Handover, documentation, and ongoing assistance.',
    icon: Zap,
  },
];
</script>

<template>
  <WebsiteLayout>
    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="space-y-4 text-center">
          <Badge variant="secondary" class="w-fit mx-auto">Services</Badge>
          <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">Practical delivery across software and media</h1>
          <p class="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Support for teams requiring dependable execution, architectural direction, and professional brand visuals.
          </p>
        </div>
      </div>
    </section>

    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid gap-6 md:grid-cols-2">
          <Card v-for="offering in offerings" :key="offering.title">
            <CardHeader>
              <div class="flex items-center gap-2 text-sm text-muted-foreground">
                <component :is="offering.icon" class="h-4 w-4" />
                <span>Service</span>
              </div>
              <CardTitle class="text-xl">{{ offering.title }}</CardTitle>
              <CardDescription>{{ offering.description }}</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4 text-sm text-muted-foreground">
              <ul class="list-disc space-y-1 pl-5">
                <li v-for="item in offering.details" :key="item">{{ item }}</li>
              </ul>
              <Button variant="outline" as-child>
                <Link href="/contact">{{ offering.cta }}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <section class="bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="space-y-4 text-center">
          <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Engagement approach</h2>
          <p class="text-muted-foreground max-w-2xl mx-auto">
            A repeatable sequence ensures projects remain predictable and transparent from onboarding to handover.
          </p>
        </div>
        <div class="mt-12 grid gap-6 md:grid-cols-4">
          <Card v-for="stage in process" :key="stage.title">
            <CardHeader>
              <div class="flex items-center gap-2 text-sm text-muted-foreground">
                <component :is="stage.icon" class="h-4 w-4" />
                <span>Stage</span>
              </div>
              <CardTitle class="text-base font-medium">{{ stage.title }}</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">{{ stage.description }}</p>
            </CardContent>
          </Card>
        </div>
        <div class="mt-12 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button as-child>
            <Link href="/contact">Start a conversation</Link>
          </Button>
          <Button variant="outline" as-child>
            <Link href="/projects">View delivery examples</Link>
          </Button>
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
