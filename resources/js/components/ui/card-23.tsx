// 1. Install dependencies:
// npm install framer-motion lucide-react

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Github, Globe, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Your shadcn/ui utility for merging classes
import { CrypticText } from "@/components/ui/cryptic-text";

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
          "w-full overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-md text-white shadow-none group font-mono relative",
          className
        )}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        {...(props as any)}
      >
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-white/60 transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-white/60 transition-colors"></div>

        <div className="flex flex-col md:flex-row h-full min-h-[220px]">
          {/* Image section with location overlay - Left side on desktop */}
          <div className="relative w-full md:w-1/3 overflow-hidden border-b md:border-b-0 md:border-r border-white/10 aspect-video md:aspect-auto">
            <motion.img
              src={imageUrl}
              alt={imageAlt}
              className="h-full w-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              variants={imageVariants}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:hidden" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/70">
              <MapPin className="h-3 w-3" />
              <span className="text-[9px] font-bold tracking-widest uppercase">
                <CrypticText text={location.city} delay={600} />
              </span>
            </div>
          </div>

          <div className="flex-1 flex flex-col p-6 md:p-8">
            {/* Header section with tag and date */}
            <header className="mb-4 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30">
                  // <CrypticText text={tag} delay={700} />
              </span>
              <div className="flex items-center text-[9px] font-bold tracking-widest border border-white/10">
                <span className="px-2 py-1 bg-white/5 text-white/40 uppercase">
                  {date.month}
                </span>
                <span className="px-2 py-1 bg-white text-black">
                  {date.day}
                </span>
              </div>
            </header>

            <main className="flex-1">
              <h3 className="text-base md:text-lg font-bold tracking-[0.05em] uppercase text-white group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                <span className="text-blue-500/40 group-hover:text-blue-500 transition-colors">#</span>
                <CrypticText text={title} delay={800} />
              </h3>
              <p className="mt-3 text-[12px] md:text-sm text-gray-500 leading-relaxed max-w-2xl line-clamp-2">
                {description}
              </p>
            </main>

            {/* Actions */}
            <footer className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {githubUrl && (
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors" title="View Source">
                    <Github size={16} />
                  </a>
                )}
                {liveUrl && (
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors" title="Launch Terminal">
                    <Globe size={16} />
                  </a>
                )}
              </div>
              {url && (
                <a href={url} className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 hover:text-white transition-all flex items-center gap-2 group/link">
                  [READ_CASE_STUDY]
                  <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              )}
            </footer>
          </div>
        </div>
      </motion.div>
    );
  }
);
ArticleCard.displayName = "ArticleCard";

export { ArticleCard };
