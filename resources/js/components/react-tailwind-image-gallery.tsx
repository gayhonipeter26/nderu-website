import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  span: string;
}

interface GalleryProps {
  data: GalleryImage[];
  onImageClick: (src: string, index: number) => void;
  categories?: { id: string; name: string; icon: string }[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  isTransitioning?: boolean;
}

// Shadcn Tabs Components
const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

interface ImageModalProps {
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
    setLoadedImages(prev => new Set(prev).add(id)); // Mark as loaded to prevent retry
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
        {
          rootMargin: '50px', // Start loading 50px before image comes into view
          threshold: 0.1
        }
      );
    }

    imageRefs.current.set(id, element);
    observerRef.current.observe(element);
  }, []);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <section id="portfolio" className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 xl:px-6 2xl:px-8 h-full max-w-[1920px]">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-8">
          Photography Portfolio
        </h2>

        {/* Search and Categories Container */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full lg:w-96">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search photos..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-lg text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={onCategoryChange}>
            <TabsList className="flex flex-wrap justify-center lg:justify-end gap-2 bg-transparent p-0 h-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out transform hover:scale-105",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-lg scale-105 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  )}
                >
                  <span className={cn(
                    "inline-block transition-transform duration-300",
                    selectedCategory === category.id ? "scale-110" : "scale-100"
                  )}>
                    {category.icon}
                  </span>
                  <span className="ml-2">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Gallery Grid with Transition */}
        <div className={`transition-all duration-300 ease-in-out ${
          isTransitioning 
            ? 'opacity-0 scale-95 blur-sm' 
            : 'opacity-100 scale-100 blur-0'
        }`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 auto-rows-[200px] gap-3 md:gap-4">
            {data.map((img, index) => {
              const isVisible = visibleImages.has(img.id);
              const isLoaded = loadedImages.has(img.id);
              
              return (
                <div
                  key={img.id}
                  ref={(el) => {
                    if (el) observeImage(el, img.id);
                  }}
                  data-image-id={img.id}
                  className={`group cursor-pointer relative overflow-hidden rounded-lg transform transition-all duration-700 ease-out hover:scale-105 ${
                    isLoaded 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  } ${img.span}`}
                  style={{
                    transitionDelay: isVisible ? `${index * 50}ms` : '0ms'
                  }}
                  onClick={() => onImageClick(img.src, index)}
                >
                  <div className="relative w-full h-full bg-muted">
                    {isVisible ? (
                      <>
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="gallery-img w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                          onLoad={() => handleImageLoad(img.id)}
                          onError={() => handleImageError(img.id)}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out flex items-end p-4">
                          <p className="text-white text-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out">
                            {img.title}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-muted-foreground/20 border-t-muted-foreground rounded-full animate-spin"></div>
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

  const goToPrevious = () => {
    if (allPhotos.length === 0) return;
    const newIndex = currentIndex === 0 ? allPhotos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    if (allPhotos.length === 0) return;
    const newIndex = currentIndex === allPhotos.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const currentPhoto = allPhotos[currentIndex] || null;
  const currentSrc = currentPhoto ? currentPhoto.src : src;

  useEffect(() => {
    setCurrentIndex(currentPhotoIndex);
  }, [currentPhotoIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, currentIndex, allPhotos.length]);

  if (!currentSrc) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300 ease-out opacity-100"
      onClick={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      {/* Main Image Container */}
      <div 
        className="relative max-w-[90vw] max-h-[90vh] transform transition-all duration-300 ease-out scale-100"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <img
          src={currentSrc}
          alt={currentPhoto?.alt || "Enlarged view"}
          className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />
        
        {/* Previous Arrow - Inside Image */}
        {allPhotos.length > 1 && (
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold bg-black/50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition-all duration-200 ease-out"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Previous photo"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next Arrow - Inside Image */}
        {allPhotos.length > 1 && (
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold bg-black/50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition-all duration-200 ease-out"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next photo"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Close Button - Inside Image */}
        <button
          className="absolute top-4 right-4 text-white text-4xl font-bold bg-black/50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition-all duration-200 ease-out"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked'); // Debug log
            onClose();
          }}
          aria-label="Close modal"
        >
          ×
        </button>
        
        {/* Photo Title */}
        {currentPhoto?.title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
            <p className="text-white text-lg font-medium">{currentPhoto.title}</p>
          </div>
        )}

        {/* Photo Counter */}
        {allPhotos.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 rounded-full px-3 py-1">
            {currentIndex + 1} / {allPhotos.length}
          </div>
        )}
      </div>
    </div>
  );
}
