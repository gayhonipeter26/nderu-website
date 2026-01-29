"use client"

import React from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"

interface TimelineItem {
    title: string
    description: string
    technologies: string[]
    problemSolved: string
    tag?: string
    githubUrl?: string
    liveUrl?: string
}

interface ProjectTimelineProps {
    items: TimelineItem[]
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ items }) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    React.useEffect(() => {
        // @ts-ignore
        if (window.UnicornStudio && window.UnicornStudio.isInitialized) {
            // @ts-ignore
            window.UnicornStudio.init();
        }
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <div ref={containerRef} className="relative max-w-6xl mx-auto px-4 py-32 bg-black font-mono overflow-hidden">
            {/* Background Animation - Matching Hero Section */}
            <div className="absolute inset-0 w-full h-full opacity-30 pointer-events-none isolate hidden lg:block">
                <div
                    data-us-project="OMzqyUv6M3kSnv0JeAtC"
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
            {/* Dark Overlay for better contrast */}
            <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none"></div>

            {/* The Vertical Line with Technical Gradient */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/20 md:-translate-x-1/2 z-10">
                <motion.div
                    className="absolute top-0 left-0 right-0 origin-top bg-gradient-to-b from-white via-white/40 to-transparent w-full"
                    style={{ scaleY, height: "100%" }}
                />
            </div>

            <div className="relative z-10 space-y-32">
                {items.map((item, index) => (
                    <div key={index} className="relative flex flex-col md:flex-row items-start md:items-center">
                        {/* Technical Dot on the line */}
                        <div className="absolute left-4 md:left-1/2 w-6 h-6 -translate-x-1/2 z-10 hidden md:flex items-center justify-center">
                            <div className="w-6 h-6 border border-white/30 bg-black flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-white"></div>
                            </div>
                            <motion.div
                                className="absolute inset-0 border border-white/10"
                                initial={{ scale: 0, rotate: 45 }}
                                whileInView={{ scale: [0, 1.8, 1.2], opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </div>

                        {/* Content Box with Tech Framing - Wider Rectangular Layout */}
                        <div className={`w-full md:w-[70%] ${index % 2 === 0 ? 'md:mr-auto md:pr-24' : 'md:ml-auto md:pl-24'} pl-12 md:pl-0`}>
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className="group relative p-10 bg-white/[0.02] border border-white/10 backdrop-blur-md hover:bg-white/[0.05] transition-all duration-300"
                            >
                                {/* Corner Accents */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/40 group-hover:border-white transition-colors"></div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/40 group-hover:border-white transition-colors"></div>

                                <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'} gap-1 mb-4`}>
                                    <div className="flex items-center gap-2 opacity-60 text-[10px] tracking-[0.2em] uppercase">
                                        <span className="text-white">∞</span>
                                        {item.tag && <span className="text-white">{item.tag}</span>}
                                        {!item.tag && <span className="text-white">PROJECT.{String(items.length - index).padStart(2, '0')}</span>}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-widest uppercase group-hover:translate-x-1 transition-transform">
                                        {item.title}
                                    </h3>

                                    {/* Action Icons */}
                                    <div className={`flex gap-3 mt-2 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                                        {item.githubUrl && (
                                            <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                                                <Github size={16} />
                                            </a>
                                        )}
                                        {item.liveUrl && (
                                            <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                                                <ExternalLink size={16} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 font-mono opacity-80">
                                    {item.description}
                                </p>

                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <div>
                                        <h4 className={`text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                            // STATUS.SOLVED
                                        </h4>
                                        <p className="text-gray-300 text-xs italic leading-tight">
                                            "{item.problemSolved}"
                                        </p>
                                    </div>

                                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                                        {item.technologies.map((tech) => (
                                            <span key={tech} className="px-2 py-0.5 border border-white/10 text-white/60 text-[9px] uppercase tracking-tighter hover:border-white/40 hover:text-white transition-colors">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Tech notation */}
            <div className="mt-20 flex items-center justify-center gap-4 opacity-20 text-[10px]">
                <div className="h-px w-24 bg-white"></div>
                <span>TIMELINE.END</span>
                <div className="h-px w-24 bg-white"></div>
            </div>
        </div>
    )
}
