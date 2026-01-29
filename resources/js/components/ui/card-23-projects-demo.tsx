import { ArticleCard, ArticleCardProps } from "@/components/ui/card-23";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { CrypticText } from "@/components/ui/cryptic-text";

const ArticleCardProjectsDemo = ({ projects }: { projects?: any[] }) => {
  const [currentProjects, setCurrentProjects] = useState(projects || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update projects when prop changes
  useEffect(() => {
    setCurrentProjects(projects || []);
    setCurrentIndex(0);
  }, [projects]);

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying || currentProjects.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentProjects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentProjects.length]);

  const transformProjectToCard = (project: any): ArticleCardProps => ({
    tag: project.category || 'Project',
    date: {
      month: project.created_at ? new Date(project.created_at).toLocaleDateString('en-US', { month: 'short' }).toUpperCase() : 'JAN',
      day: project.created_at ? new Date(project.created_at).getDate() : 1,
    },
    title: project.title,
    description: project.summary || 'Technical implementation and architectural details.',
    imageUrl: project.hero_image_url || 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800',
    imageAlt: project.title || 'Project cover image',
    location: {
      city: project.client ? `${project.client} Client` : 'Nairobi',
      country: project.year ? `${project.year}` : 'Kenya',
    },
    githubUrl: project.meta?.github_url || project.github_url || "https://github.com",
    liveUrl: project.meta?.live_url || project.live_url,
  });

  const projectCards = currentProjects.map(transformProjectToCard);

  const nextProject = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % projectCards.length);
  };

  const prevProject = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + projectCards.length) % projectCards.length);
  };

  return (
    <div ref={containerRef} className="py-24 bg-black font-mono relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="w-full max-w-7xl mx-auto relative z-10 px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 border-b border-white/5 pb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 mb-4 opacity-50">
              <span className="w-1.5 h-1.5 bg-white"></span>
              <span className="text-[10px] tracking-[0.4em] uppercase">Archive.System</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tighter text-white sm:text-4xl uppercase leading-none">
              <CrypticText text="Project Archive" delay={200} />
            </h1>
            <p className="mt-6 text-sm text-gray-500 tracking-wide leading-relaxed">
              Explore our architectural repository through this technical interface.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-8">
            <button
              onClick={prevProject}
              className="group flex flex-col items-end transition-opacity"
            >
              <span className="text-[9px] text-white/40 group-hover:text-white transition-colors mb-2 uppercase tracking-[0.3em]">
                <CrypticText text="PREV_LOG" delay={400} />
              </span>
              <div className="w-16 h-px bg-white/20 group-hover:bg-white transition-all group-hover:w-24"></div>
            </button>
            <div className="text-white text-xl font-bold tracking-[0.2em] min-w-[100px] text-center">
              {String(currentIndex + 1).padStart(2, '0')} <span className="opacity-20 text-sm">/</span> {String(projectCards.length).padStart(2, '0')}
            </div>
            <button
              onClick={nextProject}
              className="group flex flex-col items-start transition-opacity"
            >
              <span className="text-[9px] text-white/40 group-hover:text-white transition-colors mb-2 uppercase tracking-[0.3em]">
                <CrypticText text="NEXT_LOG" delay={400} />
              </span>
              <div className="w-16 h-px bg-white/20 group-hover:bg-white transition-all group-hover:w-24"></div>
            </button>
          </div>
        </div>

        {projectCards.length > 0 ? (
          <div className="relative">
            {/* Carousel Viewport */}
            <div className="overflow-hidden cursor-grab active:cursor-grabbing">
              <motion.div
                className="flex gap-12"
                animate={{ x: `calc(-${currentIndex * 100}% - ${currentIndex * 48}px)` }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 50) prevProject();
                  else if (info.offset.x < -50) nextProject();
                }}
              >
                {projectCards.map((project, index) => (
                  <div key={index} className="w-full shrink-0">
                    <div className="relative group">
                      {/* Technical Header for each slide */}
                      <div className="flex items-center justify-between mb-6 px-1">
                        <div className="flex items-center gap-4">
                          <div className="w-3 h-3 border border-blue-500/50 flex items-center justify-center">
                            <div className="w-1 h-1 bg-blue-500"></div>
                          </div>
                          <div className="text-[9px] tracking-[0.2em] uppercase">
                            <span className="text-white/20">ENTRY_POINTER //</span>
                            <span className="text-white/60 ml-2">0x{index.toString(16).toUpperCase().padStart(2, '0')}</span>
                          </div>
                        </div>
                        <div className="text-[8px] text-white/20 tracking-[0.3em] uppercase">
                          {currentIndex === index ? 'VIEW_ACTIVE' : 'BUFFERED'}
                        </div>
                      </div>

                      <ArticleCard {...project} className="border-white/10" />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Pagination Indicators (Diamonds) */}
            <div className="mt-12 flex justify-center gap-4">
              {projectCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className="group relative h-4 w-4 flex items-center justify-center"
                >
                  <div className={`w-2 h-2 rotate-45 border transition-all duration-300 ${currentIndex === index ? 'bg-white border-white scale-125' : 'border-white/20 group-hover:border-white/50'
                    }`}></div>
                </button>
              ))}
            </div>

            {/* Dynamic Progress Indicator */}
            <div className="mt-8 relative">
              <div className="h-px w-full bg-white/5"></div>
              <motion.div
                className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-white to-blue-500"
                animate={{ width: `${((currentIndex + 1) / projectCards.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <div className="flex justify-between mt-3 text-[8px] text-white/10 tracking-widest uppercase font-bold">
                <span>Buffer_Status: Optimal</span>
                <span>Auto_Play: {isAutoPlaying ? 'ON' : 'OFF'}</span>
                <span>System_Clock: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-40 border border-white/5 bg-white/[0.01] backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white uppercase tracking-[0.4em]">Zero_Files_Found</h3>
          </div>
        )}
      </div>

      {/* Technical Background Details */}
      <div className="absolute bottom-10 left-10 pointer-events-none opacity-[0.03] select-none text-[10px] uppercase tracking-[1em] vertical-text">
        PROJECT_ARCHIVE_SYSTEM_V4.0
      </div>

      {/* End Notation */}
      <div className="mt-32 flex items-center justify-center gap-12 opacity-10 text-[8px] font-mono tracking-[0.8em] uppercase">
        <div className="h-px w-32 bg-gradient-to-r from-transparent to-white"></div>
        <span>End_Sequence</span>
        <div className="h-px w-32 bg-gradient-to-l from-transparent to-white"></div>
      </div>
    </div>
  );
};

export default ArticleCardProjectsDemo;
