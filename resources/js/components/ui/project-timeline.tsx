"use client"

import React from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"
import { CrypticText } from "@/components/ui/cryptic-text"

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

const GithubActivity = () => {
    // Generate simulated contribution data
    const weeks = 52;
    const days = 7;
    const contributions = React.useMemo(() => {
        return Array.from({ length: weeks * days }).map(() => ({
            level: Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0,
        }));
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 relative max-w-4xl mx-auto p-8 border border-white/10 bg-black/50 backdrop-blur-xl"
        >
            <div className="absolute top-0 left-0 w-2 h-2 bg-blue-500/50" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500/50" />
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-500/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500/50" />

            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-white/70" />
                    <h3 className="text-white text-lg font-mono tracking-widest uppercase">
                        <CrypticText text="Contribution_Matrix" delay={0} />
                    </h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
                    <span>2026_LOGS</span>
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
            </div>

            <div className="flex gap-1 overflow-x-auto pb-4 mask-fade-sides no-scrollbar">
                {Array.from({ length: weeks }).map((_, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                        {Array.from({ length: days }).map((_, dayIndex) => {
                            const index = weekIndex * days + dayIndex;
                            const level = contributions[index]?.level || 0;

                            return (
                                <motion.div
                                    key={dayIndex}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: index * 0.001 }}
                                    whileHover={{ scale: 1.2, zIndex: 10 }}
                                    className={`
                                        w-3 h-3 rounded-sm cursor-crosshair relative group
                                        ${level === 0 ? 'bg-white/5' : ''}
                                        ${level === 1 ? 'bg-blue-900/40 border border-blue-500/20' : ''}
                                        ${level === 2 ? 'bg-blue-700/60 border border-blue-500/40' : ''}
                                        ${level === 3 ? 'bg-blue-500/80 border border-white/20' : ''}
                                        ${level === 4 ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : ''}
                                    `}
                                >
                                    {/* Tooltip */}
                                    {level > 0 && (
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none">
                                            <div className="bg-black border border-white/20 px-2 py-1 text-[10px] text-white whitespace-nowrap">
                                                COMMIT_0x{Math.floor(Math.random() * 1000).toString(16).toUpperCase()}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between mt-6 text-[10px] text-white/30 uppercase tracking-widest">
                <span>Total_Commits: <span className="text-white">1,024</span></span>
                <div className="flex items-center gap-2">
                    <span>Low</span>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-white/5" />
                        <div className="w-2 h-2 bg-blue-900/40" />
                        <div className="w-2 h-2 bg-blue-700/60" />
                        <div className="w-2 h-2 bg-blue-500/80" />
                        <div className="w-2 h-2 bg-white" />
                    </div>
                    <span>High</span>
                </div>
            </div>
        </motion.div>
    );
};

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

            {/* The Vertical Line - Centered for Alternating Layout */}
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

                        {/* Content Box - Alternating Sides */}
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

                                <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} gap-1 mb-4`}>
                                    <div className="flex items-center gap-2 opacity-60 text-[10px] tracking-[0.2em] uppercase">
                                        <span className="text-white">∞</span>
                                        {item.tag && <span className="text-white"><CrypticText text={item.tag} delay={index * 100} /></span>}
                                        {!item.tag && <span className="text-white"><CrypticText text={`PROJECT.${String(items.length - index).padStart(2, '0')}`} delay={index * 100} /></span>}
                                    </div>
                                    <h3 className="text-base md:text-xl font-bold text-white tracking-[0.1em] uppercase group-hover:translate-x-1 transition-transform">
                                        <CrypticText text={item.title} delay={index * 150} />
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

                                <p className="text-gray-400 text-xs md:text-base leading-relaxed mb-6 font-mono opacity-80">
                                    {item.description}
                                </p>

                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <div>
                                        <h4 className={`text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                            // STATUS.SOLVED
                                        </h4>
                                        <p className="text-gray-300 text-xs md:text-sm italic leading-tight">
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

            {/* GitHub Activity Section */}
            <GithubActivity />

            {/* Bottom Tech notation */}
            <div className="mt-20 flex items-center justify-center gap-4 opacity-20 text-[10px]">
                <div className="h-px w-24 bg-white"></div>
                <span>TIMELINE.END</span>
                <div className="h-px w-24 bg-white"></div>
            </div>
        </div>
    )
}
