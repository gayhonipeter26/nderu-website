import React, { useState, useEffect } from 'react';
import { Gallery, ImageModal } from "@/components/react-tailwind-image-gallery";

const allPhotos = [
  {
    id: 1,
    src: "/assets/photos/your-photo-1.jpg",
    alt: "Photography work 1",
    title: "Creative Portrait",
    span: "col-span-1 row-span-1",
    category: "portraits"
  },
  {
    id: 2,
    src: "/assets/photos/your-photo-2.jpg",
    alt: "Photography work 2",
    title: "Landscape Photography",
    span: "col-span-2 row-span-2",
    category: "portraits"
  },
  {
    id: 3,
    src: "/assets/photos/your-photo-3.jpg",
    alt: "Photography work 3",
    title: "Street Photography",
    span: "col-span-1 row-span-1",
    category: "street"
  },
  {
    id: 4,
    src: "/assets/photos/your-photo-4.jpg",
    alt: "Photography work 4",
    title: "Event Coverage",
    span: "col-span-1 row-span-2",
    category: "birthday"
  },
  {
    id: 5,
    src: "/assets/photos/your-photo-5.jpg",
    alt: "Photography work 5",
    title: "Architecture",
    span: "col-span-2 row-span-1",
    category: "street"
  },
  {
    id: 6,
    src: "/assets/photos/your-photo-6.jpg",
    alt: "Photography work 6",
    title: "Wildlife",
    span: "col-span-1 row-span-1",
    category: "portraits"
  },
  {
    id: 7,
    src: "/assets/photos/your-photo-7.jpg",
    alt: "Photography work 7",
    title: "Night Photography",
    span: "col-span-2 row-span-1",
    category: "street"
  },
  {
    id: 8,
    src: "/assets/photos/your-photo-8.jpg",
    alt: "Photography work 8",
    title: "Documentary",
    span: "col-span-1 row-span-2",
    category: "street"
  },
  {
    id: 9,
    src: "/assets/photos/your-photo-9.jpg",
    alt: "Photography work 9",
    title: "Commercial Work",
    span: "col-span-1 row-span-1",
    category: "portraits"
  },
  {
    id: 10,
    src: "/assets/photos/your-photo-10.jpg",
    alt: "Photography work 10",
    title: "Fashion Photography",
    span: "col-span-2 row-span-2",
    category: "portraits"
  },
  {
    id: 11,
    src: "/assets/photos/your-photo-11.jpg",
    alt: "Photography work 11",
    title: "Product Photography",
    span: "col-span-1 row-span-1",
    category: "portraits"
  },
  {
    id: 12,
    src: "/assets/photos/your-photo-12.jpg",
    alt: "Photography work 12",
    title: "Wedding Photography",
    span: "col-span-1 row-span-1",
    category: "wedding"
  },
  {
    id: 13,
    src: "/assets/photos/your-image-name.jpg",
    alt: "Photography work 13",
    title: "Urban Exploration",
    span: "col-span-2 row-span-1",
    category: "street"
  },
  {
    id: 14,
    src: "/assets/photos/about-before.jpg",
    alt: "Photography work 14",
    title: "Before Transformation",
    span: "col-span-1 row-span-2",
    category: "portraits"
  },
  {
    id: 15,
    src: "/assets/photos/about-after.JPG",
    alt: "Photography work 15",
    title: "After Transformation",
    span: "col-span-1 row-span-2",
    category: "portraits"
  },
  {
    id: 16,
    src: "/assets/photos/your-photo-1.jpg",
    alt: "Photography work 16",
    title: "Portrait Series",
    span: "col-span-1 row-span-1",
    category: "portraits"
  },
  {
    id: 17,
    src: "/assets/photos/your-photo-3.jpg",
    alt: "Photography work 17",
    title: "Street Art",
    span: "col-span-2 row-span-1",
    category: "street"
  },
  {
    id: 18,
    src: "/assets/photos/your-photo-5.jpg",
    alt: "Photography work 18",
    title: "Modern Architecture",
    span: "col-span-1 row-span-1",
    category: "street"
  },
  {
    id: 19,
    src: "/assets/photos/your-photo-7.jpg",
    alt: "Photography work 19",
    title: "City Lights",
    span: "col-span-1 row-span-2",
    category: "street"
  },
  {
    id: 20,
    src: "/assets/photos/your-photo-9.jpg",
    alt: "Photography work 20",
    title: "Abstract Composition",
    span: "col-span-2 row-span-2",
    category: "portraits"
  },
  {
    id: 21,
    src: "/assets/photos/your-photo-2.jpg",
    alt: "Photography work 21",
    title: "Nature Study",
    span: "col-span-1 row-span-1",
    category: "portraits"
  },
  {
    id: 22,
    src: "/assets/photos/your-photo-4.jpg",
    alt: "Photography work 22",
    title: "Event Highlights",
    span: "col-span-1 row-span-1",
    category: "birthday"
  },
  {
    id: 23,
    src: "/assets/photos/your-photo-6.jpg",
    alt: "Photography work 23",
    title: "Wildlife Portrait",
    span: "col-span-2 row-span-1",
    category: "portraits"
  },
  {
    id: 24,
    src: "/assets/photos/your-photo-8.jpg",
    alt: "Photography work 24",
    title: "Documentary Series",
    span: "col-span-1 row-span-1",
    category: "street"
  },
  {
    id: 25,
    src: "/assets/photos/your-photo-10.jpg",
    alt: "Photography work 25",
    title: "Fashion Editorial",
    span: "col-span-1 row-span-2",
    category: "portraits"
  },
  {
    id: 26,
    src: "/assets/photos/your-photo-11.jpg",
    alt: "Photography work 26",
    title: "Product Details",
    span: "col-span-2 row-span-1",
    category: "portraits"
  },
  {
    id: 27,
    src: "/assets/photos/your-photo-12.jpg",
    alt: "Photography work 27",
    title: "Wedding Moments",
    span: "col-span-1 row-span-1",
    category: "wedding"
  },
  {
    id: 28,
    src: "/assets/photos/your-image-name.jpg",
    alt: "Photography work 28",
    title: "Urban Landscape",
    span: "col-span-2 row-span-2",
    category: "street"
  },
  {
    id: 29,
    src: "/assets/photos/about-before.jpg",
    alt: "Photography work 29",
    title: "Transformation Start",
    span: "col-span-1 row-span-1",
    category: "portraits"
  },
  {
    id: 30,
    src: "/assets/photos/about-after.JPG",
    alt: "Photography work 30",
    title: "Transformation Complete",
    span: "col-span-1 row-span-1",
    category: "portraits"
  },
  {
    id: 31,
    src: "/assets/photos/your-photo-1.jpg",
    alt: "Photography work 31",
    title: "Headshot Session",
    span: "col-span-2 row-span-1",
    category: "portraits"
  },
  {
    id: 32,
    src: "/assets/photos/your-photo-3.jpg",
    alt: "Photography work 32",
    title: "Street Life",
    span: "col-span-1 row-span-2",
    category: "street"
  },
  {
    id: 33,
    src: "/assets/photos/your-photo-5.jpg",
    alt: "Photography work 33",
    title: "Architectural Details",
    span: "col-span-1 row-span-1",
    category: "street"
  },
  {
    id: 34,
    src: "/assets/photos/your-photo-7.jpg",
    alt: "Photography work 34",
    title: "Nightscapes",
    span: "col-span-2 row-span-2",
    category: "street"
  },
  {
    id: 35,
    src: "/assets/photos/your-photo-9.jpg",
    alt: "Photography work 35",
    title: "Abstract Forms",
    span: "col-span-1 row-span-1",
    category: "portraits"
  },
  {
    id: 36,
    src: "/assets/photos/your-photo-2.jpg",
    alt: "Photography work 36",
    title: "Natural Beauty",
    span: "col-span-1 row-span-2",
    category: "portraits"
  },
  {
    id: 37,
    src: "/assets/photos/your-photo-4.jpg",
    alt: "Photography work 37",
    title: "Celebration Moments",
    span: "col-span-2 row-span-1",
    category: "birthday"
  },
  {
    id: 38,
    src: "/assets/photos/your-photo-6.jpg",
    alt: "Photography work 38",
    title: "Animal Kingdom",
    span: "col-span-1 row-span-1",
    category: "portraits"
  },
  {
    id: 39,
    src: "/assets/photos/your-photo-8.jpg",
    alt: "Photography work 39",
    title: "Storytelling",
    span: "col-span-1 row-span-1",
    category: "street"
  },
  {
    id: 40,
    src: "/assets/photos/your-photo-10.jpg",
    alt: "Photography work 40",
    title: "Fashion Portfolio",
    span: "col-span-2 row-span-2",
    category: "portraits"
  },
  {
    id: 41,
    src: "/assets/photos/your-photo-11.jpg",
    alt: "Photography work 41",
    title: "Commercial Shoot",
    span: "col-span-1 row-span-1",
    category: "portraits"
  },
  {
    id: 42,
    src: "/assets/photos/your-photo-12.jpg",
    alt: "Photography work 42",
    title: "Love Story",
    span: "col-span-1 row-span-2",
    category: "wedding"
  },
  {
    id: 43,
    src: "/assets/photos/your-image-name.jpg",
    alt: "Photography work 43",
    title: "Cityscape Views",
    span: "col-span-2 row-span-1",
    category: "street"
  },
  {
    id: 44,
    src: "/assets/photos/about-before.jpg",
    alt: "Photography work 44",
    title: "Before Edit",
    span: "col-span-1 row-span-1",
    category: "portraits"
  },
  {
    id: 45,
    src: "/assets/photos/about-after.JPG",
    alt: "Photography work 45",
    title: "After Edit",
    span: "col-span-1 row-span-1",
    category: "portraits"
  },
  {
    id: 46,
    src: "/assets/photos/your-photo-1.jpg",
    alt: "Photography work 46",
    title: "Professional Headshots",
    span: "col-span-1 row-span-2",
    category: "portraits"
  },
  {
    id: 47,
    src: "/assets/photos/your-photo-3.jpg",
    alt: "Photography work 47",
    title: "Urban Culture",
    span: "col-span-2 row-span-2",
    category: "street"
  },
  {
    id: 48,
    src: "/assets/photos/your-photo-5.jpg",
    alt: "Photography work 48",
    title: "Building Design",
    span: "col-span-1 row-span-1",
    category: "street"
  },
  {
    id: 49,
    src: "/assets/photos/your-photo-7.jpg",
    alt: "Photography work 49",
    title: "Night Vision",
    span: "col-span-1 row-span-1",
    category: "street"
  },
  {
    id: 50,
    src: "/assets/photos/your-photo-9.jpg",
    alt: "Photography work 50",
    title: "Modern Art",
    span: "col-span-2 row-span-1",
    category: "portraits"
  },
  {
    id: 51,
    src: "/assets/photos/your-photo-2.jpg",
    alt: "Photography work 51",
    title: "Scenic Views",
    span: "col-span-1 row-span-2",
    category: "portraits"
  },
  {
    id: 52,
    src: "/assets/photos/your-photo-4.jpg",
    alt: "Photography work 52",
    title: "Party Photography",
    span: "col-span-2 row-span-1",
    category: "birthday"
  },
  {
    id: 53,
    src: "/assets/photos/your-photo-6.jpg",
    alt: "Photography work 53",
    title: "Nature Wildlife",
    span: "col-span-1 row-span-1",
    category: "portraits"
  },
  {
    id: 54,
    src: "/assets/photos/your-photo-8.jpg",
    alt: "Photography work 54",
    title: "Photo Essay",
    span: "col-span-1 row-span-1",
    category: "street"
  },
  {
    id: 55,
    src: "/assets/photos/your-photo-10.jpg",
    alt: "Photography work 55",
    title: "Runway Fashion",
    span: "col-span-2 row-span-2",
    category: "portraits"
  },
  {
    id: 56,
    src: "/assets/photos/your-photo-11.jpg",
    alt: "Photography work 56",
    title: "Brand Photography",
    span: "col-span-1 row-span-1",
    category: "portraits"
  },
  {
    id: 57,
    src: "/assets/photos/your-photo-12.jpg",
    alt: "Photography work 57",
    title: "Romantic Moments",
    span: "col-span-1 row-span-2",
    category: "wedding"
  },
  {
    id: 58,
    src: "/assets/photos/your-image-name.jpg",
    alt: "Photography work 58",
    title: "Metropolitan Life",
    span: "col-span-2 row-span-1",
    category: "street"
  },
  {
    id: 59,
    src: "/assets/photos/about-before.jpg",
    alt: "Photography work 59",
    title: "Original State",
    span: "col-span-1 row-span-1",
    category: "portraits"
  },
  {
    id: 60,
    src: "/assets/photos/about-after.JPG",
    alt: "Photography work 60",
    title: "Final Result",
    span: "col-span-1 row-span-1",
    category: "portraits"
  },
  {
    id: 61,
    src: "/assets/photos/your-photo-1.jpg",
    alt: "Photography work 61",
    title: "Corporate Portraits",
    span: "col-span-2 row-span-1",
    category: "portraits"
  },
  {
    id: 62,
    src: "/assets/photos/your-photo-3.jpg",
    alt: "Photography work 62",
    title: "Street Photography",
    span: "col-span-1 row-span-2",
    category: "street"
  },
  {
    id: 63,
    src: "/assets/photos/your-photo-5.jpg",
    alt: "Photography work 63",
    title: "Interior Design",
    span: "col-span-1 row-span-1",
    category: "street"
  },
  {
    id: 64,
    src: "/assets/photos/your-photo-7.jpg",
    alt: "Photography work 64",
    title: "Evening Shots",
    span: "col-span-2 row-span-2",
    category: "street"
  }
];

const categories = [
  { id: 'all', name: 'All Photos', icon: '📸' },
  { id: 'wedding', name: 'Wedding', icon: '💒' },
  { id: 'portraits', name: 'Portraits', icon: '👤' },
  { id: 'street', name: 'Street', icon: '🏙️' },
  { id: 'birthday', name: 'Birthday', icon: '🎂' }
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
    console.log('Close modal called'); // Debug log
    setModalImage(null);
    setCurrentImageIndex(0);
  };

  const getFilteredPhotos = () => {
    let filtered = selectedCategory === 'all' 
      ? allPhotos 
      : allPhotos.filter(photo => photo.category === selectedCategory);
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(photo => 
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.alt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const switchCategory = (categoryId: string) => {
    if (categoryId === selectedCategory) return;
    
    setIsTransitioning(true);
    
    // Fade out current photos
    setTimeout(() => {
      setSelectedCategory(categoryId);
      
      // Fade in new photos
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Optional: Add transition for search as well
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 150);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredPhotos = getFilteredPhotos();

  return (
    <div className={`transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <Gallery 
        data={filteredPhotos} 
        onImageClick={openModal}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={switchCategory}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        isTransitioning={isTransitioning}
      />
      <ImageModal 
        src={modalImage} 
        onClose={closeModal}
        allPhotos={filteredPhotos}
        currentPhotoIndex={currentImageIndex}
      />
    </div>
  );
}
