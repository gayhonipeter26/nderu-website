import React, { useState, useEffect } from 'react';
import { Gallery, ImageModal } from "@/components/react-tailwind-image-gallery";

const galleryData = [
  {
    id: 1,
    src: "/assets/photos/your-photo-1.jpg",
    alt: "Photography work 1",
    title: "Creative Portrait",
    span: "col-span-1"
  },
  {
    id: 2,
    src: "/assets/photos/your-photo-2.jpg",
    alt: "Photography work 2",
    title: "Landscape Photography",
    span: "sm:col-span-2"
  },
  {
    id: 3,
    src: "/assets/photos/your-photo-3.jpg",
    alt: "Photography work 3",
    title: "Street Photography",
    span: "col-span-1"
  },
  {
    id: 4,
    src: "/assets/photos/your-photo-4.jpg",
    alt: "Photography work 4",
    title: "Event Coverage",
    span: "col-span-1"
  },
  {
    id: 5,
    src: "/assets/photos/your-photo-5.jpg",
    alt: "Photography work 5",
    title: "Architecture",
    span: "sm:col-span-2"
  },
  {
    id: 6,
    src: "/assets/photos/your-photo-6.jpg",
    alt: "Photography work 6",
    title: "Wildlife",
    span: "col-span-1"
  },
  {
    id: 7,
    src: "/assets/photos/your-photo-7.jpg",
    alt: "Photography work 7",
    title: "Night Photography",
    span: "col-span-1"
  },
  {
    id: 8,
    src: "/assets/photos/your-photo-8.jpg",
    alt: "Photography work 8",
    title: "Documentary",
    span: "col-span-1"
  },
  {
    id: 9,
    src: "/assets/photos/your-photo-9.jpg",
    alt: "Photography work 9",
    title: "Commercial Work",
    span: "sm:col-span-2"
  },
];

export default function ReactTailwindImageGalleryDemo() {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const openModal = (src: string) => setModalImage(src);
  const closeModal = () => setModalImage(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Trigger smooth entrance animation after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <Gallery data={galleryData} onImageClick={openModal} />
      <ImageModal src={modalImage} onClose={closeModal} />
    </div>
  );
}
