<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index';
import { Badge } from '@/components/ui/badge/index';
import { Button } from '@/components/ui/button/index';
import { Input } from '@/components/ui/input/index';
import { Mail, Phone, MapPin, Clock, Calendar, MessageCircle, Camera, Users } from 'lucide-vue-next';
import Accordion from '@/components/ui/accordion/Accordion.vue';
import AccordionItem from '@/components/ui/accordion/AccordionItem.vue';
import AccordionTrigger from '@/components/ui/accordion/AccordionTrigger.vue';
import AccordionContent from '@/components/ui/accordion/AccordionContent.vue';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';

const contactMethods = [
  { icon: Mail, label: 'Email', value: 'hello@nderu.com', href: 'mailto:hello@nderu.com' },
  { icon: Phone, label: 'Phone', value: '+254 700 123 456', href: 'tel:+254700123456' },
  { icon: MapPin, label: 'Location', value: 'Nairobi, Kenya', href: 'https://maps.google.com' },
  { icon: Clock, label: 'Office hours', value: 'Mon – Fri · 09:00 – 18:00 EAT', href: '#' },
];

const offerings = [
  { icon: MessageCircle, label: 'Project discovery', description: 'Clarify scope, success measures, and constraints.' },
  { icon: Users, label: 'Consulting retainers', description: 'Strategic guidance, code reviews, and technical leadership.' },
  { icon: Camera, label: 'Creative commissions', description: 'Photography for brand campaigns, events, and products.' },
];

const faqs = [
  {
    question: 'What is the usual response time?',
    answer: 'All enquiries receive a reply within one working day, including next steps and an outline of availability.',
  },
  {
    question: 'Do you work remotely with international teams?',
    answer: 'Yes. Projects run across multiple time zones with clear weekly cadences and shared project spaces.',
  },
  {
    question: 'How do you structure engagements?',
    answer: 'New work begins with a short discovery call. From there we agree on a project proposal or retainer model.',
  },
];
</script>

<template>
  <WebsiteLayout>
    <section id="send-message" class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="space-y-4 text-center">
          <Badge variant="secondary" class="mx-auto w-fit">Contact</Badge>
          <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">
            Let's plan your next phase of delivery
          </h1>
          <p class="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Share the problem you are solving, the team you are working with, and the timelines you are considering.
          </p>
        </div>
      </div>
    </section>

    <section id="schedule-call" class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card v-for="item in contactMethods" :key="item.label">
            <CardHeader class="space-y-1">
              <CardTitle class="text-base flex items-center gap-2">
                <component :is="item.icon" class="h-4 w-4" />
                {{ item.label }}
              </CardTitle>
            </CardHeader>
            <CardContent class="text-sm text-muted-foreground">
              <a :href="item.href" class="text-foreground hover:underline">{{ item.value }}</a>
            </CardContent>
          </Card>
          <Card class="lg:col-span-2">
            <CardHeader class="space-y-1">
              <CardTitle class="text-base">Availability</CardTitle>
              <CardDescription>New project starts and consulting slots</CardDescription>
            </CardHeader>
            <CardContent class="text-sm text-muted-foreground space-y-2">
              <p>Currently booking projects beginning mid-April 2024. Short advisory work can begin sooner.</p>
              <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar class="h-3.5 w-3.5" />
                30 minute discovery calls are available each Tuesday and Thursday.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <section id="visit-office" class="border-b bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader class="space-y-2">
              <CardTitle class="text-xl">Project outline</CardTitle>
              <CardDescription>Provide as much detail as you are comfortable sharing.</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4 text-sm text-muted-foreground">
              <form class="space-y-4" action="mailto:hello@nderu.com" method="post" encType="text/plain">
                <Input name="name" placeholder="Your name" required />
                <Input type="email" name="email" placeholder="you@email.com" required />
                <Input name="company" placeholder="Organisation (optional)" />
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Describe the project, timelines, and desired outcomes."
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                ></textarea>
                <Button type="submit" class="w-full">Send brief</Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="space-y-2">
              <CardTitle class="text-xl">Ways we can work together</CardTitle>
              <CardDescription>Flexible formats suited to where you are in delivery.</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4 text-sm text-muted-foreground">
              <div v-for="item in offerings" :key="item.label" class="space-y-1">
                <div class="flex items-center gap-2 text-foreground">
                  <component :is="item.icon" class="h-4 w-4" />
                  <span class="font-medium">{{ item.label }}</span>
                </div>
                <p>{{ item.description }}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <section class="bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="max-w-3xl mx-auto space-y-6 text-sm text-muted-foreground">
          <h2 class="text-center text-2xl font-semibold text-foreground">Frequently asked questions</h2>
          <Accordion type="single" collapsible class="space-y-4">
            <AccordionItem v-for="item in faqs" :key="item.question" :value="item.question">
              <Card>
                <CardHeader class="p-0">
                  <AccordionTrigger class="px-4 py-4 text-base font-medium">
                    {{ item.question }}
                  </AccordionTrigger>
                </CardHeader>
                <AccordionContent>
                  <CardContent class="pt-0 px-4 pb-4 text-sm text-muted-foreground">
                    {{ item.answer }}
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  </WebsiteLayout>
</template>
