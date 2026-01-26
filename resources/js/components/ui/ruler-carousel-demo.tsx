"use client";

import { RulerCarousel, type CarouselItem } from "@/components/ui/ruler-carousel";
import { Target, Shield, Code, Zap } from "lucide-react";

export function Demo() {
  const originalItems: CarouselItem[] = [
    { 
      id: 1, 
      title: "DISCOVERY", 
      description: "Clarify goals, stakeholders, and success criteria",
      icon: Target 
    },
    { 
      id: 2, 
      title: "SOLUTION DESIGN", 
      description: "Outline architecture, delivery plan, and resourcing",
      icon: Shield 
    },
    { 
      id: 3, 
      title: "EXECUTION", 
      description: "Iterative delivery with checkpoints and reviews",
      icon: Code 
    },
    { 
      id: 4, 
      title: "SUPPORT", 
      description: "Handover, documentation, and ongoing assistance",
      icon: Zap 
    },
    { 
      id: 5, 
      title: "DISCOVERY", 
      description: "Clarify goals, stakeholders, and success criteria",
      icon: Target 
    },
    { 
      id: 6, 
      title: "SOLUTION DESIGN", 
      description: "Outline architecture, delivery plan, and resourcing",
      icon: Shield 
    },
    { 
      id: 7, 
      title: "EXECUTION", 
      description: "Iterative delivery with checkpoints and reviews",
      icon: Code 
    },
    { 
      id: 8, 
      title: "SUPPORT", 
      description: "Handover, documentation, and ongoing assistance",
      icon: Zap 
    },
    { 
      id: 9, 
      title: "DISCOVERY", 
      description: "Clarify goals, stakeholders, and success criteria",
      icon: Target 
    },
  ];
  return (
    <div className="w-full h-[300px] overflow-hidden flex items-center justify-center">
      <RulerCarousel originalItems={originalItems} />
    </div>
  );
}
