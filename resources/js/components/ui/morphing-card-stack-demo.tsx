import { Component } from "@/components/ui/morphing-card-stack";
import { Code, Camera, Briefcase, Calendar, Users, ExternalLink, GitBranch, Globe, Database } from "lucide-react";

const recentProjects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard. Built with Vue.js, Laravel, and Stripe integration.",
    icon: <Code className="h-5 w-5" />,
    color: "#3b82f6",
    timeline: "3 months",
    teamSize: "4 developers",
    tech: ["Vue.js", "Laravel", "Stripe", "PostgreSQL"],
    projectUrl: "/projects/ecommerce-platform",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center&auto=format"
  },
  {
    id: "2",
    title: "Corporate Photography",
    description: "Complete event coverage for tech conference including keynote sessions, workshops, and networking events. 500+ photos delivered in 48 hours.",
    icon: <Camera className="h-5 w-5" />,
    color: "#10b981",
    timeline: "2 days",
    teamSize: "2 photographers",
    tech: ["Canon R5", "Lightroom", "Capture One", "Studio Lighting"],
    projectUrl: "/photography/corporate-conference",
    image: "https://images.unsplash.com/photo-1511791244076-535cc6f0b071?w=400&h=300&fit=crop&crop=center&auto=format"
  },
  {
    id: "3",
    title: "SaaS Architecture",
    description: "Microservices architecture design for scalable SaaS platform with 99.9% uptime. Includes API gateway, load balancing, and auto-scaling.",
    icon: <Briefcase className="h-5 w-5" />,
    color: "#f59e0b",
    timeline: "6 months",
    teamSize: "6 engineers",
    tech: ["Docker", "Kubernetes", "AWS", "Node.js", "MongoDB"],
    projectUrl: "/projects/saas-architecture",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center&auto=format"
  },
  {
    id: "4",
    title: "Brand Photography",
    description: "Professional brand photography campaign including product shots, lifestyle images, and social media content for fashion startup.",
    icon: <Camera className="h-5 w-5" />,
    color: "#8b5cf6",
    timeline: "1 week",
    teamSize: "3 creatives",
    tech: ["Studio Lighting", "Retouching", "Color Grading", "Delivery"],
    projectUrl: "/photography/brand-campaign",
    image: "https://images.unsplash.com/photo-1490444425577-2d6b9d1872fc?w=400&h=300&fit=crop&crop=center&auto=format"
  },
]

export default function MorphingCardStackDemo() {
  return <Component cards={recentProjects} />;
}
