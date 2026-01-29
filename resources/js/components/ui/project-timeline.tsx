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
    const months = React.useMemo(() => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        // Distribute months roughly across the 52 weeks
        return monthNames.map((m, i) => ({ name: m, index: Math.floor(i * (52 / 12)) }));
    }, []);

    const contributions = React.useMemo(() => {
        return Array.from({ length: weeks * days }).map(() => ({
            level: Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0,
        }));
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-40 relative z-20 max-w-6xl mx-auto flex flex-col md:flex-row gap-8"
        >
            {/* Main Content Column */}
            <div className="flex-1 space-y-6">
                {/* 1. Contribution Graph */}
                <div className="p-6 border border-white/10 bg-black/95 backdrop-blur-xl relative shadow-2xl">
                    {/* Decorative Corner Accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-500/50" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-blue-500/50" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-blue-500/50" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500/50" />

                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <Github className="w-5 h-5 text-white/70" />
                            <h3 className="text-white text-base md:text-lg font-mono tracking-widest uppercase">
                                <CrypticText text="1,024 contributions in the last year" delay={0} />
                            </h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
                            <span>2026_LOGS</span>
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 overflow-x-auto pb-2 mask-fade-sides no-scrollbar">
                        {/* Month Labels aligned to grid */}
                        <div className="flex relative h-4 w-full mb-2">
                            {months.map((month, i) => (
                                <div
                                    key={i}
                                    className="absolute text-[10px] text-white/40 font-mono transform -translate-x-1/2"
                                    style={{ left: `${(month.index / 52) * 100}%`, paddingLeft: '32px' }}
                                >
                                    {month.name}
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            {/* Day Labels - Perfectly aligned to rows */}
                            <div className="flex flex-col gap-1 pt-[1px] pr-2">
                                <div className="h-2.5 text-[9px] text-transparent select-none">Mon</div> {/* Spacer */}
                                <div className="h-2.5 flex items-center text-[9px] text-white/40 font-mono">Mon</div>
                                <div className="h-2.5 text-[9px] text-transparent select-none">Wed</div>
                                <div className="h-2.5 flex items-center text-[9px] text-white/40 font-mono">Wed</div>
                                <div className="h-2.5 text-[9px] text-transparent select-none">Fri</div>
                                <div className="h-2.5 flex items-center text-[9px] text-white/40 font-mono">Fri</div>
                                <div className="h-2.5 text-[9px] text-transparent select-none">Sun</div>
                            </div>

                            {/* The Grid */}
                            <div className="flex gap-1 flex-1">
                                {Array.from({ length: weeks }).map((_, weekIndex) => (
                                    <div key={weekIndex} className="flex flex-col gap-1">
                                        {Array.from({ length: days }).map((_, dayIndex) => {
                                            const index = weekIndex * days + dayIndex;
                                            const indexCalc = weekIndex * 7 + dayIndex;
                                            const dayOfWeek = indexCalc % 7;
                                            const isWeekday = dayOfWeek > 0 && dayOfWeek < 6;
                                            const chance = isWeekday ? 0.6 : 0.2;
                                            const level = Math.random() < chance ? Math.floor(Math.random() * 4) + 1 : 0;

                                            return (
                                                <motion.div
                                                    key={dayIndex}
                                                    initial={{ opacity: 0 }}
                                                    whileInView={{ opacity: 1 }}
                                                    transition={{ delay: index * 0.0002 }}
                                                    whileHover={{ scale: 1.2, zIndex: 10 }}
                                                    className={`
                                                        w-2.5 h-2.5 rounded-[1px] relative group
                                                        ${level === 0 ? 'bg-white/5' : ''}
                                                        ${level === 1 ? 'bg-blue-900/40' : ''}
                                                        ${level === 2 ? 'bg-blue-700/60' : ''}
                                                        ${level === 3 ? 'bg-blue-500/80' : ''}
                                                        ${level === 4 ? 'bg-blue-400 shadow-[0_0_4px_rgba(96,165,250,0.8)]' : ''}
                                                    `}
                                                >
                                                    {level > 0 && (
                                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none">
                                                            <div className="bg-black border border-white/20 px-2 py-1 text-[9px] text-white whitespace-nowrap shadow-xl">
                                                                #{Math.floor(Math.random() * 1000).toString(16).toUpperCase()} on {new Date().toISOString().split('T')[0]}
                                                            </div>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-6 text-[10px] text-white/30 uppercase tracking-widest px-1">
                        <span className="hover:text-white/60 transition-colors cursor-pointer flex items-center gap-2">
                            Learn how we count contributions
                            <ExternalLink className="w-3 h-3" />
                        </span>
                        <div className="flex items-center gap-2">
                            <span>Less</span>
                            <div className="flex gap-1">
                                <div className="w-2.5 h-2.5 bg-white/5 rounded-[1px]" />
                                <div className="w-2.5 h-2.5 bg-blue-900/40 rounded-[1px]" />
                                <div className="w-2.5 h-2.5 bg-blue-700/60 rounded-[1px]" />
                                <div className="w-2.5 h-2.5 bg-blue-500/80 rounded-[1px]" />
                                <div className="w-2.5 h-2.5 bg-blue-400 rounded-[1px]" />
                            </div>
                            <span>More</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 2. Activity Overview */}
                    <div className="p-6 border border-white/10 bg-black/95 backdrop-blur-md h-full">
                        <h4 className="text-white text-xs font-mono uppercase tracking-widest mb-6 border-b border-white/5 pb-2 flex justify-between items-center">
                            <span>Activity Overview</span>
                            <div className="flex gap-1">
                                <div className="w-1 h-1 bg-white/20 rounded-full" />
                                <div className="w-1 h-1 bg-white/20 rounded-full" />
                                <div className="w-1 h-1 bg-white/20 rounded-full" />
                            </div>
                        </h4>
                        <div className="flex gap-4">
                            <div className="flex-1 space-y-4">
                                <div className="text-[10px] text-white/60 uppercase tracking-wider">Contributed to</div>
                                <ul className="space-y-3">
                                    {['gayhonipeter26/nderu-website', 'gayhonipeter26/medi', 'gayhonipeter26/Hospital-Manage...', 'gayhonipeter26/portfolio'].map((repo, i) => (
                                        <li key={i} className="flex items-center gap-2 group cursor-pointer">
                                            <Github className="w-3 h-3 text-white/40 group-hover:text-blue-400 transition-colors" />
                                            <span className="text-xs text-blue-400/90 font-mono group-hover:underline underline-offset-4 decoration-blue-500/30 truncate max-w-[140px]">{repo}</span>
                                        </li>
                                    ))}
                                    <li className="text-[10px] text-white/30 italic pl-5">and 12 others...</li>
                                </ul>
                            </div>
                            {/* Simulated Radar Chart */}
                            <div className="w-32 h-32 relative flex items-center justify-center shrink-0">
                                <div className="absolute inset-0 border border-white/5 rounded-full" />
                                <div className="absolute w-[70%] h-[70%] border border-white/5 rounded-full" />
                                <div className="absolute w-[40%] h-[40%] border border-white/5 rounded-full" />

                                {/* Data Shape */}
                                <svg className="absolute inset-0 w-full h-full p-2 overflow-visible rotate-12">
                                    <polygon
                                        points="64,20 100,64 64,100 30,64"
                                        className="fill-blue-500/10 stroke-blue-500 stroke-[1.5]"
                                        filter="drop-shadow(0 0 4px rgba(59,130,246,0.3))"
                                    />
                                    <polygon
                                        points="64,35 85,64 64,85 45,64"
                                        className="fill-white/5 stroke-white/20 stroke-[1]"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* 3. Contribution Activity Timeline */}
                    <div className="p-6 border border-white/10 bg-black/95 backdrop-blur-md h-full">
                        <h4 className="text-white text-xs font-mono uppercase tracking-widest mb-6 border-b border-white/5 pb-2 flex justify-between items-center">
                            <span>Contribution Activity</span>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        </h4>
                        <div className="space-y-6 pl-2 relative">
                            {/* Timeline Line */}
                            <div className="absolute left-[3px] top-2 bottom-0 w-px bg-white/10" />

                            {[
                                {
                                    date: 'January 2026', items: [
                                        { text: 'Created 28 commits in 2 repositories', subtext: 'gayhonipeter26/nderu-website (21 commits)', highlight: true },
                                        { text: 'Created 2 repositories', subtext: 'gayhonipeter26/MDE-V1.2', highlight: false }
                                    ]
                                },
                                {
                                    date: 'December 2025', items: [
                                        { text: 'Opened 3 pull requests', subtext: 'Hospital-Management-System', highlight: false }
                                    ]
                                }
                            ].map((month, i) => (
                                <div key={i} className="relative">
                                    <div className="text-[9px] text-white/50 font-mono mb-3 uppercase tracking-wider bg-black/50 inline-block px-1 ml-[-4px] relative z-10">{month.date}</div>
                                    <div className="space-y-4">
                                        {month.items.map((item, j) => (
                                            <div key={j} className="relative pl-6 group">
                                                <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-blue-500 transition-colors ring-4 ring-black" />
                                                <div className="text-xs text-white/90 font-mono mb-1">{item.text}</div>
                                                <div className="text-[10px] text-blue-400/60 font-mono hover:underline cursor-pointer transition-colors hover:text-blue-400">{item.subtext}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Year Selector Sidebar */}
            <div className="w-full md:w-24 shrink-0 flex flex-row md:flex-col gap-2">
                <div className="md:sticky md:top-32 w-full space-y-2">
                    {['2026', '2025', '2024', '2023', '2022'].map((year, i) => (
                        <button
                            key={year}
                            className={`
                                w-full py-2 px-4 text-[10px] font-mono border transition-all duration-300 relative group overflow-hidden text-center md:text-left
                                ${i === 0
                                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)]'
                                    : 'bg-black/40 border-white/5 text-white/30 hover:border-white/20 hover:text-white/60'
                                }
                            `}
                        >
                            {i === 0 && <div className="absolute inset-0 bg-blue-500/10 animate-pulse-slow" />}
                            <span className="relative z-10">{year}</span>
                        </button>
                    ))}
                    <div className="hidden md:block h-px w-full bg-white/5 my-4" />
                    <button className="hidden md:block w-full py-2 px-4 text-[10px] font-mono border border-transparent text-white/20 hover:text-white/40 text-left">
                        Manage
                    </button>
                    <button className="hidden md:block w-full py-2 px-4 text-[10px] font-mono border border-transparent text-white/20 hover:text-white/40 text-left">
                        Settings
                    </button>
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

            {/* Timeline Section Wrapper - Contains Line and Items */}
            <div className="relative">
                {/* The Vertical Line - Centered for Alternating Layout */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/20 md:-translate-x-1/2 z-10">
                    <motion.div
                        className="absolute top-0 left-0 right-0 origin-top bg-gradient-to-b from-white via-white/40 to-transparent w-full"
                        style={{ scaleY, height: "100%" }}
                    />
                </div>

                <div className="relative z-10 space-y-32 pb-32">
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
            </div>

            {/* GitHub Activity Section - Separated from line */}
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
