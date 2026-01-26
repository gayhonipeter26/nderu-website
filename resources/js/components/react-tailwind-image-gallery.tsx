import React, { useState } from 'react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  span: string;
}

interface GalleryProps {
  data: GalleryImage[];
  onImageClick: (src: string) => void;
}

interface ImageModalProps {
  src: string | null;
  onClose: () => void;
}

export function Gallery({ data, onImageClick }: GalleryProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-foreground mb-12">
          Photography Portfolio
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((img, index) => (
            <div
              key={img.id}
              className={`group cursor-pointer relative overflow-hidden rounded-lg ${img.span} transform transition-all duration-700 ease-out hover:scale-105 ${
                loadedImages.has(img.id) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
              onClick={() => onImageClick(img.src)}
            >
              <div className="relative w-full h-full min-h-[200px] bg-muted">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="gallery-img w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                  onLoad={() => handleImageLoad(img.id)}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out flex items-end p-4">
                  <p className="text-white text-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    {img.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ImageModal({ src, onClose }: ImageModalProps) {
  if (!src) return null;

  return (
    <div
      id="imageModal"
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300 ease-out opacity-100"
      onClick={onClose}
    >
      <div className="relative max-w-[90vw] max-h-[90vh] transform transition-all duration-300 ease-out scale-100">
        <img
          src={src}
          alt="Enlarged view"
          className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          className="absolute top-4 right-4 text-white text-4xl font-bold bg-black/50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition-all duration-200 ease-out"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
