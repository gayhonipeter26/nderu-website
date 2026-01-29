// 1. Install dependencies:
// npm install framer-motion lucide-react

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Github, Globe, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Your shadcn/ui utility for merging classes

// Define the types for the component props for type-safety and clarity
export interface ArticleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tag: string;
  date: {
    month: string;
    day: number;
  };
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  location: {
    city: string;
    country: string;
  };
  githubUrl?: string;
  liveUrl?: string;
  url?: string;
}

const ArticleCard = React.forwardRef<HTMLDivElement, ArticleCardProps>(
  (
    {
      className,
      tag,
      date,
      title,
      description,
      imageUrl,
      imageAlt,
      location,
      githubUrl,
      liveUrl,
      url,
      ...props
    },
    ref
  ) => {
    // Animation variants for Framer Motion
    const cardVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      hover: { y: -5, scale: 1.02, boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.15)" },
    };

    const imageVariants = {
      hover: { scale: 1.1 },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "w-full overflow-hidden border bg-card/40 backdrop-blur-sm text-card-foreground shadow-sm group font-mono",
          className
        )}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        {...(props as any)}
      >
        <div className="p-5 flex flex-col h-full">
          {/* Header section with tag and date */}
          <header className="mb-4 flex items-center justify-between">
            <span className="text-[9px] font-bold tracking-widest uppercase text-white/40">
                // {tag}
            </span>
            <div className="flex items-center text-[9px] font-bold tracking-tighter border border-white/10">
              <span className="px-2 py-1 bg-white/5 text-white/50">
                {date.month}
              </span>
              <span className="px-2 py-1 bg-white text-black">
                {date.day}
              </span>
            </div>
          </header>

          {/* Main content section */}
          <main className="mb-4">
            <h3 className="text-lg font-bold tracking-tight uppercase text-white group-hover:text-blue-400 transition-colors line-clamp-1">
              {title}
            </h3>
            <p className="mt-2 text-[11px] text-gray-400 leading-relaxed line-clamp-2 italic">
              {description}
            </p>
          </main>

          {/* Image section */}
          <div className="relative aspect-video overflow-hidden border border-white/5">
            <motion.img
              src={imageUrl}
              alt={imageAlt}
              className="h-full w-full object-cover"
              variants={imageVariants}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-white/70">
              <MapPin className="h-3 w-3" />
              <span className="text-[9px] font-bold tracking-wider uppercase">{location.city}</span>
            </div>
          </div>

          {/* Actions */}
          <footer className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                  <Github size={14} />
                </a>
              )}
              {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                  <Globe size={14} />
                </a>
              )}
            </div>
            {url && (
              <a href={url} className="text-[9px] font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors flex items-center gap-1">
                DETAILS <ArrowUpRight size={12} />
              </a>
            )}
          </footer>
        </div>
      </motion.div>
    );
  }
);
ArticleCard.displayName = "ArticleCard";

export { ArticleCard };
