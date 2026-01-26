"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export function TypewriterEffectCustom() {
  const words = [
    {
      text: "Transform",
    },
    {
      text: "your",
    },
    {
      text: "ideas",
    },
    {
      text: "into",
    },
    {
      text: "reality.",
      className: "text-primary dark:text-primary",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-muted-foreground text-sm sm:text-base mb-6">
        Building digital experiences that matter
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-8">
        <a 
          href="/contact" 
          className="w-40 h-10 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
        >
          Start a Project
        </a>
        <a 
          href="/services" 
          className="w-40 h-10 rounded-xl bg-secondary text-secondary-foreground border border-secondary text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center"
        >
          View Services
        </a>
      </div>
    </div>
  );
}
