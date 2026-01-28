import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  span: string;
  category: string;
}

interface GalleryProps {
  data: GalleryImage[];
  onImageClick: (src: string, index: number) => void;
  categories?: { id: string; name: string; icon: React.ReactNode }[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  isTransitioning?: boolean;
}

export interface ImageModalProps {
  src: string | null;
  onClose: () => void;
  allPhotos?: GalleryImage[];
  currentPhotoIndex?: number;
}

export function Gallery({
  data,
  onImageClick,
  categories = [],
  selectedCategory = 'all',
  onCategoryChange,
  searchQuery = '',
  onSearchChange,
  isTransitioning = false
}: GalleryProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const imageRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  const handleImageError = (id: number) => {
    console.warn(`Failed to load image ${id}`);
    setLoadedImages(prev => new Set(prev).add(id));
  };

  const observeImage = useCallback((element: HTMLDivElement, id: number) => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const imageId = parseInt(entry.target.getAttribute('data-image-id') || '0');
              setVisibleImages(prev => new Set(prev).add(imageId));
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '50px', threshold: 0.1 }
      );
    }
    imageRefs.current.set(id, element);
    observerRef.current.observe(element);
  }, []);

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return (
    <section id="portfolio" className="min-h-screen bg-background pb-16 pt-8">
      <div className="container mx-auto px-4 xl:px-6 2xl:px-8 h-full max-w-[1920px]">
        {/* Title removed per user request */}

        {/* Search and Categories Container */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-12 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full lg:w-96">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-opacity">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search your memories..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted/30 border-transparent rounded-full text-sm focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>

          {/* Category Tabs - Icons Only */}
          <Tabs value={selectedCategory} onValueChange={onCategoryChange}>
            <TabsList className="flex flex-wrap justify-center lg:justify-end gap-3 bg-transparent p-0 h-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  title={category.name}
                  className={cn(
                    "w-10 h-10 p-0 rounded-full flex items-center justify-center transition-all duration-500 transform hover:scale-110",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.3)] scale-110"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {isTransitioning && selectedCategory === category.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    category.icon
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className={`transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 auto-rows-[200px] gap-3 md:gap-4">
            {data.map((img, index) => {
              const isVisible = visibleImages.has(img.id);
              const isLoaded = loadedImages.has(img.id);
              return (
                <div
                  key={img.id}
                  ref={(el) => { if (el) observeImage(el, img.id); }}
                  data-image-id={img.id}
                  className={`group cursor-pointer relative overflow-hidden rounded-xl transform transition-all duration-700 ease-out hover:scale-[1.03] hover:shadow-xl ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${img.span}`}
                  style={{ transitionDelay: isVisible ? `${index * 30}ms` : '0ms' }}
                  onClick={() => onImageClick(img.src, index)}
                >
                  <div className="relative w-full h-full bg-muted/20">
                    {isVisible ? (
                      <>
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          onLoad={() => handleImageLoad(img.id)}
                          onError={() => handleImageError(img.id)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-5">
                          <p className="text-white text-sm font-medium tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                            {img.title}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-muted/10 animate-pulse flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-primary/10 border-t-primary rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ImageModal({ src, onClose, allPhotos = [], currentPhotoIndex = 0 }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(currentPhotoIndex);

  const goToPrevious = useCallback(() => {
    if (allPhotos.length === 0) return;
    setCurrentIndex(prev => (prev === 0 ? allPhotos.length - 1 : prev - 1));
  }, [allPhotos.length]);

  const goToNext = useCallback(() => {
    if (allPhotos.length === 0) return;
    setCurrentIndex(prev => (prev === allPhotos.length - 1 ? 0 : prev + 1));
  }, [allPhotos.length]);

  // Handle keyboard events
  useEffect(() => {
    if (!src) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [src, onClose, goToPrevious, goToNext]);

  // Sync index when prop changes
  useEffect(() => {
    setCurrentIndex(currentPhotoIndex);
  }, [currentPhotoIndex]);

  if (!src) return null;

  const currentPhoto = allPhotos[currentIndex] || null;
  const currentSrc = currentPhoto ? currentPhoto.src : src;

  return (
    <div
      className="fixed inset-0 bg-black/95 backdrop-blur-xl flex justify-center items-center z-[100] transition-opacity duration-500"
      onClick={onClose}
    >
      <div
        className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center group/modal"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentSrc}
          alt={currentPhoto?.alt || "Enlarged view"}
          className="max-w-full max-h-[95vh] rounded-md shadow-[0_0_50px_rgba(0,0,0,0.5)] object-contain transition-all duration-500"
        />

        {/* Navigation Arrows */}
        {allPhotos.length > 1 && (
          <>
            <button
              className="absolute left-4 md:left-[-80px] top-1/2 -translate-y-1/2 p-4 text-white/40 hover:text-white transition-all bg-black/20 md:bg-transparent rounded-full backdrop-blur-sm md:backdrop-blur-none"
              onClick={goToPrevious}
              aria-label="Previous"
            >
              <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute right-4 md:right-[-80px] top-1/2 -translate-y-1/2 p-4 text-white/40 hover:text-white transition-all bg-black/20 md:bg-transparent rounded-full backdrop-blur-sm md:backdrop-blur-none"
              onClick={goToNext}
              aria-label="Next"
            >
              <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 md:top-[-60px] md:right-[-40px] text-white/40 hover:text-white transition-all p-2 rounded-full hover:bg-white/10"
          onClick={onClose}
          aria-label="Close"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Caption */}
        {currentPhoto?.title && (
          <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover/modal:opacity-100 transition-opacity duration-300">
            <div className="inline-block px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
              <p className="text-white text-xs font-medium tracking-widest uppercase">{currentPhoto.title}</p>
            </div>
          </div>
        )}

        {/* Counter */}
        {allPhotos.length > 1 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full text-white/60 text-[10px] tracking-tighter">
            {currentIndex + 1} / {allPhotos.length}
          </div>
        )}
      </div>
    </div>
  );
}
