<script setup lang="tsx">
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { ProjectTimeline } from '@/components/ui/project-timeline';

const projects = [
  {
    title: "Hospital Management System (HMS)",
    tag: "Latest",
    description: "Multi-tenant system for clinics/hospitals to manage patients, appointments, consultations, and billing.",
    technologies: ["Laravel", "PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    problemSolved: "Provides small clinics with a reliable, centralized system for patient management and billing, reducing errors and manual record-keeping.",
    githubUrl: "https://github.com/nderu-ke/hms-core",
    liveUrl: "https://hms.nderu.dev"
  },
  {
    title: "Freelance Marketplace",
    tag: "Niche-focused",
    description: "Platform connecting African software engineers and tech professionals with freelance opportunities.",
    technologies: ["React", "Laravel", "MySQL", "HTML", "CSS", "JavaScript"],
    problemSolved: "Makes it easier for African tech professionals to find relevant freelance contracts and monetize their skills.",
    githubUrl: "https://github.com/nderu-ke/african-freelancers",
    liveUrl: "https://freelance.nderu.dev"
  },
  {
    title: "Personal Portfolio / Super Website",
    description: "Professional website showcasing your skills, projects, services, and photography work.",
    technologies: ["React", "Vite", "HTML", "CSS", "JavaScript", "Shadcn UI"],
    problemSolved: "Centralizes your digital presence for clients, recruiters, and collaborators to explore your work.",
    githubUrl: "https://github.com/nderu-ke/nderu-website",
    liveUrl: "https://nderu.dev"
  },
  {
    title: "Client Payment Dashboard & Receipt Generation",
    description: "Dashboard allowing clients to pay project fees, track payment status, and download/print receipts.",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    problemSolved: "Automates billing, ensures accurate payment tracking, and simplifies receipt generation.",
    githubUrl: "https://github.com/nderu-ke/client-payments"
  },
  {
    title: "Retail / Wholesale POS System",
    description: "Point-of-Sale system for retail/wholesale stores, managing products, stock, sales, and receipts.",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "Bootstrap", "JavaScript", "AJAX"],
    problemSolved: "Automates sales and inventory management, reduces human error, and improves business efficiency.",
    githubUrl: "https://github.com/nderu-ke/pos-system"
  },
  {
    title: "Inventory Count System",
    description: "System for tracking inventory counts, adjustments, and generating reports.",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "AJAX"],
    problemSolved: "Maintains accurate stock records and provides actionable insights for businesses.",
    githubUrl: "https://github.com/nderu-ke/inventory-tracker"
  },
  {
    title: "Student Enquiry Platform",
    tag: "Earliest",
    description: "Platform for students to post enquiries to professors, categorize them, track responses, and communicate with peers.",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "Bootstrap", "JavaScript"],
    problemSolved: "Streamlines student-professor communication and organizes enquiries for faster response.",
    githubUrl: "https://github.com/nderu-ke/student-enquiry"
  }
];

const containerRef = ref<HTMLDivElement | null>(null);
let root: Root | null = null;

onMounted(() => {
    if (containerRef.value) {
        root = createRoot(containerRef.value);
        root.render(
            <React.StrictMode>
                <div className="bg-black">
                    <ProjectTimeline items={projects} />
                </div>
            </React.StrictMode>,
        );
    }
});

onBeforeUnmount(() => {
    if (root) {
        root.unmount();
        root = null;
    }
});
</script>

<template>
  <div ref="containerRef" class="w-full"></div>
</template>
