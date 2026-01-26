'use client';

import React from 'react';
import { RadialScrollGallery } from '@/components/ui/portfolio-and-image-gallery';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const projects = [
{ id: 1, title: "Web Development", cat: "Development", img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=400&fit=crop&crop=center&auto=format" },
{ id: 2, title: "Photography", cat: "Creative", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center&auto=format" },
{ id: 3, title: "Mobile Apps", cat: "Development", img: "https://images.unsplash.com/photo-1512941937667-106a646d3d8b?w=400&h=400&fit=crop&crop=center&auto=format" },
{ id: 4, title: "UI/UX Design", cat: "Design", img: "https://images.unsplash.com/photo-1559028006-44a35f89332c?w=400&h=400&fit=crop&crop=center&auto=format" },
{ id: 5, title: "Database Design", cat: "Development", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop&crop=center&auto=format" },
{ id: 6, title: "Street Photography", cat: "Photography", img: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=400&h=400&fit=crop&crop=center&auto=format" },
{ id: 7, title: "Studio Photography", cat: "Photography", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=400&fit=crop&crop=center&auto=format" },
{ id: 8, title: "Event Photography", cat: "Photography", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop&crop=center&auto=format" },
{ id: 9, title: "Brand Photography", cat: "Photography", img: "https://images.unsplash.com/photo-1599422819177-194a3d66fdeb?w=400&h=400&fit=crop&crop=center&auto=format" },
{ id: 10, title: "Cloud Solutions", cat: "Development", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop&crop=center&auto=format" },
];

export default function DemoRadialScrollGalleryBento() {
return (
  <div className="bg-background min-h-[600px] text-foreground overflow-hidden rounded-lg border w-full">
    <div className="h-[300px] flex flex-col items-center justify-center space-y-4 pt-8">
      <div className="space-y-1 text-center">
        <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
          Services
        </span>
        <h1 className="text-4xl font-bold tracking-tighter">
          Services
        </h1>
      </div>
      <div className="animate-bounce text-muted-foreground text-xs">↓ Scroll</div>
    </div>

    <RadialScrollGallery
      className="!min-h-[600px]"
      baseRadius={400}
      mobileRadius={250}
      visiblePercentage={50}
      scrollDuration={2000}
    >
      {(hoveredIndex) =>
        projects.map((project, index) => {
           const isActive = hoveredIndex === index;
           return (
            <div 
              key={project.id} 
              className="group relative w-[200px] h-[280px] sm:w-[240px] sm:h-[320px] overflow-hidden rounded-xl bg-card border border-border shadow-lg"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
                    isActive ? 'scale-110 blur-0' : 'scale-100 blur-[1px] grayscale-[30%]'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-60" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-between p-4">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="text-[10px] px-2 py-0 bg-background/80 backdrop-blur">
                    {project.cat}
                  </Badge>
                  <div className={`w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center transition-all duration-500 ${isActive ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`}>
                    <ArrowUpRight size={12} />
                  </div>
                </div>

                <div className={`transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-2'}`}>
                  <h3 className="text-xl font-bold leading-tight text-foreground">{project.title}</h3>
                  <div className={`h-0.5 bg-primary mt-2 transition-all duration-500 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                </div>
              </div>
            </div>
           );
        })
      }
    </RadialScrollGallery>
  </div>
);
}
