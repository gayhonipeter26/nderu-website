<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Award, CheckCircle, Users, Star, Code, Camera, Briefcase, PenTool } from 'lucide-vue-next';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

const stats = [
  { label: 'Projects delivered', value: '50+', icon: CheckCircle },
  { label: 'Years experience', value: '5+', icon: Award },
  { label: 'Clients partnered', value: '30+', icon: Users },
  { label: 'Photos captured', value: '10K+', icon: Star },
];

const services = [
  {
    icon: Code,
    title: 'Web Application Development',
    description: 'Modern web applications built with Vue.js, Laravel, and TypeScript.',
    points: ['Scalable architectures', 'Responsive design', 'API development'],
  },
  {
    icon: Briefcase,
    title: 'System Architecture',
    description: 'Designing resilient systems including HMS, POS, and SaaS platforms.',
    points: ['Cloud adoption', 'Process automation', 'System integrations'],
  },
  {
    icon: Camera,
    title: 'Professional Photography',
    description: 'Commercial and documentary photography for brands and events.',
    points: ['Commercial shoots', 'Events and portraits', 'Editing and delivery'],
  },
  {
    icon: PenTool,
    title: 'Technology Consulting',
    description: 'Guidance on digital transformation and product strategy.',
    points: ['Discovery workshops', 'Roadmap planning', 'Team enablement'],
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart',
    quote: 'The platform launch was seamless and our team adopted it immediately. Excellent partnership.',
  },
  {
    name: 'Michael Chen',
    role: 'CTO, InnovateCo',
    quote: 'Reliable delivery across multiple projects with clear communication and measurable results.',
  },
];
</script>

<template>
  <WebsiteLayout>
    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid gap-12 lg:grid-cols-2">
          <div class="space-y-6">
            <Badge variant="secondary" class="w-fit">Software Engineer & Photographer</Badge>
            <div class="space-y-4">
              <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">
                Building usable products and delivering dependable creative services.
              </h1>
              <p class="text-muted-foreground text-base md:text-lg">
                I partner with teams to design, build, and launch software experiences and to capture brand moments with clarity.
              </p>
            </div>
            <div class="flex flex-col gap-3 sm:flex-row">
              <Button as-child>
                <Link href="/projects">
                  View projects
                  <ArrowRight class="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" as-child>
                <Link href="/contact">Book a consultation</Link>
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader class="space-y-1">
              <CardTitle>Capabilities at a glance</CardTitle>
              <CardDescription>Delivering end-to-end execution for digital initiatives.</CardDescription>
            </CardHeader>
            <CardContent>
              <dl class="grid gap-4 text-sm text-muted-foreground">
                <div v-for="stat in stats" :key="stat.label" class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <component :is="stat.icon" class="h-4 w-4 text-foreground" />
                    <span class="font-medium text-foreground">{{ stat.label }}</span>
                  </div>
                  <span>{{ stat.value }}</span>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="space-y-2 text-center">
          <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Services</h2>
          <p class="text-muted-foreground">Structured offerings that align with product, engineering, and media needs.</p>
        </div>
        <div class="mt-12 grid gap-6 md:grid-cols-2">
          <Card v-for="service in services" :key="service.title">
            <CardHeader>
              <div class="flex items-center gap-2 text-sm text-muted-foreground">
                <component :is="service.icon" class="h-4 w-4" />
                <span>Service area</span>
              </div>
              <CardTitle class="text-xl">{{ service.title }}</CardTitle>
              <CardDescription>{{ service.description }}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul class="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li v-for="point in service.points" :key="point">{{ point }}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="space-y-2 text-center">
          <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Selected feedback</h2>
          <p class="text-muted-foreground">Teams rely on structured delivery and steady communication.</p>
        </div>
        <div class="mt-12 grid gap-6 md:grid-cols-2">
          <Card v-for="testimonial in testimonials" :key="testimonial.name">
            <CardHeader>
              <CardTitle class="text-base font-medium text-foreground">{{ testimonial.name }}</CardTitle>
              <CardDescription>{{ testimonial.role }}</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">“{{ testimonial.quote }}”</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <section class="bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card class="max-w-3xl mx-auto">
          <CardHeader class="space-y-2 text-center">
            <CardTitle class="text-2xl md:text-3xl">Ready to begin?</CardTitle>
            <CardDescription>
              Share your project requirements or schedule a discovery session. A structured proposal follows every briefing.
            </CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button as-child>
              <Link href="/contact">Start a project</Link>
            </Button>
            <Button variant="outline" as-child>
              <Link href="/services">Review services</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  </WebsiteLayout>
</template>
