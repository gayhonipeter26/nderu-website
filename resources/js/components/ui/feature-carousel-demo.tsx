import React from 'react';
import { HeroSection } from '@/components/ui/feature-carousel';

const FeatureCarouselDemo = () => {
  const images = [
    {
      src: '/assets/photos/your-photo-1.jpg',
      alt: 'Professional photography session',
      title: 'Digital Craftsmanship'
    },
    {
      src: '/assets/photos/your-photo-2.jpg',
      alt: 'Creative portrait photography',
      title: 'Creative Vision'
    },
    {
      src: '/assets/photos/your-photo-3.jpg',
      alt: 'Event coverage photography',
      title: 'Technical Excellence'
    },
    {
      src: '/assets/photos/your-photo-4.jpg',
      alt: 'Commercial photography work',
      title: 'Dual Expertise'
    },
    {
      src: '/assets/photos/your-photo-5.jpg',
      alt: 'Lifestyle photography session',
      title: 'Visual Storytelling'
    },
  ];

  const title = (
    <>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
        Visual Storytelling
      </span> Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Digital Excellence</span>
    </>
  );

  return (
    <div className="w-full h-full flex items-center justify-center">
      <HeroSection
        title={title}
        subtitle="Full-stack engineer and photographer crafting elegant code and compelling visual narratives that bridge technology and creativity."
        images={images}
        className="min-h-[700px]"
      />
    </div>
  );
};

export default FeatureCarouselDemo;
