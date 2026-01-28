import React, { useState, useEffect } from 'react';
import { Gallery, ImageModal, GalleryImage } from "@/components/react-tailwind-image-gallery";
import {
  Camera,
  Heart,
  User,
  MapPin,
  Cake
} from 'lucide-react';

// Helper to generate more images
const generatePhotos = (count: number): GalleryImage[] => {
  const basePhotos = [
    { src: "/assets/photos/your-photo-1.jpg", alt: "Work", title: "Creative Portrait", category: "portraits" },
    { src: "/assets/photos/your-photo-2.jpg", alt: "Work", title: "Landscape View", category: "portraits" },
    { src: "/assets/photos/your-photo-3.jpg", alt: "Work", title: "Street Life", category: "street" },
    { src: "/assets/photos/your-photo-4.jpg", alt: "Work", title: "Birthday Event", category: "birthday" },
    { src: "/assets/photos/your-photo-5.jpg", alt: "Work", title: "Architecture", category: "street" },
    { src: "/assets/photos/your-photo-6.jpg", alt: "Work", title: "Wildlife Study", category: "portraits" },
    { src: "/assets/photos/your-photo-7.jpg", alt: "Work", title: "Night Glow", category: "street" },
    { src: "/assets/photos/your-photo-8.jpg", alt: "Work", title: "Documentary", category: "street" },
    { src: "/assets/photos/your-photo-9.jpg", alt: "Work", title: "Studio Art", category: "portraits" },
    { src: "/assets/photos/your-photo-10.jpg", alt: "Work", title: "Fashion Look", category: "portraits" },
    { src: "/assets/photos/your-photo-11.jpg", alt: "Work", title: "Minimalist", category: "portraits" },
    { src: "/assets/photos/your-photo-12.jpg", alt: "Work", title: "Eternal Vows", category: "wedding" },
    { src: "/assets/photos/your-image-name.jpg", alt: "Work", title: "Urban Exploration", category: "street" },
    { src: "/assets/photos/about-before.jpg", alt: "Work", title: "Initial Vision", category: "portraits" },
    { src: "/assets/photos/about-after.JPG", alt: "Work", title: "Final Polish", category: "portraits" }
  ];

  const spans = [
    "col-span-1 row-span-1",
    "col-span-2 row-span-2",
    "col-span-1 row-span-2",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1"
  ];

  const categories = ["portraits", "street", "wedding", "birthday"];

  return Array.from({ length: count }, (_, i) => {
    const base = basePhotos[i % basePhotos.length];
    return {
      id: i + 1,
      src: base.src,
      alt: `${base.alt} ${i + 1}`,
      title: `${base.title} #${i + 1}`,
      span: spans[i % spans.length],
      category: base.category
    };
  });
};

const allPhotos = generatePhotos(120); // Doubling the scroll length to ~120 images

const categories = [
  { id: 'all', name: 'All Photos', icon: <Camera className="h-4 w-4" /> },
  { id: 'wedding', name: 'Wedding', icon: <Heart className="h-4 w-4" /> },
  { id: 'portraits', name: 'Portraits', icon: <User className="h-4 w-4" /> },
  { id: 'street', name: 'Street', icon: <MapPin className="h-4 w-4" /> },
  { id: 'birthday', name: 'Birthday', icon: <Cake className="h-4 w-4" /> }
];

export default function ReactTailwindImageGalleryDemo() {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = (src: string, index: number) => {
    setModalImage(src);
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const filteredPhotos = allPhotos.filter(photo => {
    const matchesCategory = selectedCategory === 'all' || photo.category === selectedCategory;
    const matchesSearch = photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.alt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const switchCategory = (categoryId: string) => {
    if (categoryId === selectedCategory) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedCategory(categoryId);
      setTimeout(() => setIsTransitioning(false), 200);
    }, 500);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <Gallery
        data={filteredPhotos}
        onImageClick={openModal}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={switchCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isTransitioning={isTransitioning}
      />

      {modalImage && (
        <ImageModal
          src={modalImage}
          onClose={closeModal}
          allPhotos={filteredPhotos}
          currentPhotoIndex={currentImageIndex}
        />
      )}
    </div>
  );
}
