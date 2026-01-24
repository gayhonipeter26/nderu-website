<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Award, Users, Camera, Code, Target, Calendar } from 'lucide-vue-next';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

const overview = {
  title: 'Nderu.Ke',
  summary:
    'Full-stack engineer and photographer delivering dependable software, systems, and visual storytelling for teams across industries.',
  availability: 'Currently accepting new projects',
};

const metrics = [
  { label: 'Projects delivered', value: '50+', icon: Award },
  { label: 'Clients partnered', value: '30+', icon: Users },
  { label: 'Years of experience', value: '5+', icon: Target },
  { label: 'Photography sessions', value: '200+', icon: Camera },
];

const skillGroups = [
  {
    title: 'Engineering',
    skills: ['Vue.js & React', 'Laravel & Node.js', 'TypeScript', 'PostgreSQL & MySQL', 'AWS & Docker'],
  },
  {
    title: 'Consulting',
    skills: ['Technical discovery', 'Architecture planning', 'Process optimisation', 'Team leadership', 'Stakeholder alignment'],
  },
  {
    title: 'Creative',
    skills: ['Commercial photography', 'Event coverage', 'Portrait and lifestyle', 'Editing workflows', 'Brand storytelling'],
  },
];

const documents = [
  {
    title: 'Professional CV',
    description: 'Experience, engagements, and education.',
    href: '/documents/cv.pdf',
    updated: '2024',
  },
  {
    title: 'Certifications overview',
    description: 'AWS, Meta, photography, and project management credentials.',
    href: '/documents/certifications.pdf',
    updated: '2024',
  },
];

const certifications = [
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    year: '2023',
  },
  {
    name: 'Full Stack Web Development',
    issuer: 'Meta',
    year: '2023',
  },
  {
    name: 'Professional Photography Certificate',
    issuer: 'International Photography Association',
    year: '2022',
  },
  {
    name: 'Project Management Professional',
    issuer: 'PMI',
    year: '2022',
  },
];

const timeline = [
  {
    year: '2024',
    title: 'Independent consultancy',
    description: 'Leading software and photography engagements for regional and global clients.',
  },
  {
    year: '2022',
    title: 'Technical leadership',
    description: 'Guided teams delivering SaaS and enterprise platforms in healthcare and retail.',
  },
  {
    year: '2020',
    title: 'Photography practice',
    description: 'Established commercial photography services covering events and branding.',
  },
  {
    year: '2018',
    title: 'Software engineering',
    description: 'Joined product teams building web applications and platform tooling.',
  },
];
</script>

<template>
  <WebsiteLayout>
    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid gap-10 lg:grid-cols-2">
          <div class="space-y-4">
            <Badge variant="secondary" class="w-fit">About</Badge>
            <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{{ overview.title }}</h1>
            <p class="text-muted-foreground text-base md:text-lg">{{ overview.summary }}</p>
            <p class="text-sm text-muted-foreground">{{ overview.availability }}</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle class="text-lg">Snapshot</CardTitle>
              <CardDescription>Key indicators from recent engagements.</CardDescription>
            </CardHeader>
            <CardContent class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div v-for="metric in metrics" :key="metric.label" class="rounded-md border p-3 text-sm">
                <div class="flex items-center gap-2 text-muted-foreground">
                  <component :is="metric.icon" class="h-4 w-4" />
                  <span>{{ metric.label }}</span>
                </div>
                <p class="mt-2 text-xl font-semibold text-foreground">{{ metric.value }}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="space-y-2 text-center">
          <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Capabilities</h2>
          <p class="text-muted-foreground">Grounded disciplines applied across software, consulting, and photography.</p>
        </div>
        <div class="mt-10 grid gap-6 md:grid-cols-3">
          <Card v-for="group in skillGroups" :key="group.title">
            <CardHeader>
              <CardTitle class="text-base font-medium">{{ group.title }}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul class="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li v-for="skill in group.skills" :key="skill">{{ skill }}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <section class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle class="text-lg">Documents</CardTitle>
              <CardDescription>Download the latest working materials.</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div v-for="doc in documents" :key="doc.title" class="flex items-start justify-between gap-4 text-sm">
                <div>
                  <p class="font-medium text-foreground">{{ doc.title }}</p>
                  <p class="text-muted-foreground">{{ doc.description }}</p>
                  <p class="text-xs text-muted-foreground mt-1">Updated {{ doc.updated }}</p>
                </div>
                <Button as-child variant="outline" size="sm">
                  <a :href="doc.href" download>
                    <Download class="mr-2 h-4 w-4" />
                    Download
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle class="text-lg">Certifications</CardTitle>
              <CardDescription>Active credentials supporting delivery.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul class="space-y-3 text-sm text-muted-foreground">
                <li v-for="cert in certifications" :key="cert.name" class="flex items-center justify-between gap-4">
                  <div>
                    <p class="font-medium text-foreground">{{ cert.name }}</p>
                    <p class="text-xs text-muted-foreground">{{ cert.issuer }}</p>
                  </div>
                  <div class="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar class="h-3.5 w-3.5" />
                    <span>{{ cert.year }}</span>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <section class="bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="space-y-2 text-center">
          <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Timeline</h2>
          <p class="text-muted-foreground">A progression of roles and responsibilities.</p>
        </div>
        <div class="mt-10 space-y-4">
          <Card v-for="item in timeline" :key="item.year">
            <CardContent class="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex items-center gap-3">
                <Badge variant="outline">{{ item.year }}</Badge>
                <div>
                  <p class="font-medium text-foreground">{{ item.title }}</p>
                  <p class="text-sm text-muted-foreground">{{ item.description }}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
