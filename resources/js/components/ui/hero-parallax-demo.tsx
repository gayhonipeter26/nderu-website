"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

export function HeroParallaxDemo() {
  return (
    <div className="min-h-[60vh] w-full">
      <div className="absolute top-0 left-0 w-full">
        <HeroParallax products={services} />
      </div>
    </div>
  );
}

export const services = [
  // Coding Services
  {
    title: "Web Development",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "Full-Stack Applications",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "API Development",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "Database Design",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "Cloud Solutions",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=600&fit=crop&crop=center",
  },
  
  // Photography Services
  {
    title: "Street Photography",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "Studio Photography",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "Photo Mounting",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "Event Photography",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "Portrait Sessions",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop&crop=center",
  },
  
  // Additional Services
  {
    title: "UI/UX Design",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1559028006-44a35f89332c?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "Mobile Development",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1512941937667-106a646d3d8b?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "E-commerce Solutions",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "Brand Photography",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1599422819177-194a3d66fdeb?w=600&h=600&fit=crop&crop=center",
  },
  {
    title: "Technical Consulting",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=600&fit=crop&crop=center",
  },
];
