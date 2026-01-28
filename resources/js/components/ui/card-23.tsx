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
          "w-full overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm",
          className
        )}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        {...(props as any)}
      >
        <div className="p-6">
          {/* Header section with tag and date */}
          <header className="mb-4 flex items-center justify-between">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              {tag}
            </span>
            <div className="flex items-center text-xs font-semibold">
              <span className="rounded-l-md bg-secondary px-2.5 py-1.5 text-secondary-foreground">
                {date.month.toUpperCase()}
              </span>
              <span className="rounded-r-md bg-primary px-2.5 py-1.5 text-primary-foreground">
                {date.day}
              </span>
            </div>
          </header>

          {/* Main content section */}
          <main className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </main>
        </div>

        {/* Image section with location overlay */}
        <div className="relative mt-2 aspect-square overflow-hidden rounded-b-2xl rounded-t-lg">
          <motion.img
            src={imageUrl}
            alt={imageAlt}
            className="h-full w-full object-cover object-cover"
            variants={imageVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ objectPosition: 'center', objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 flex items-center gap-2 p-4 text-white">
            <MapPin className="h-4 w-4" />
            <div>
              <p className="text-sm font-semibold">{location.city}</p>
              <p className="text-xs">{location.country}</p>
            </div>
          </div>

          {/* Action Badges */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/40 text-white"
                title="View on GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/40 text-white"
                title="Live Preview"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="h-4 w-4" />
              </a>
            )}
            {url && (
              <a
                href={url}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/40 text-white"
                title="Read more"
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);
ArticleCard.displayName = "ArticleCard";

export { ArticleCard };
