import { Marquee } from "./marquee";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    SiReact,
    SiVuedotjs,
    SiLaravel,
    SiTailwindcss,
    SiTypescript,
    SiJavascript,
    SiFramer,
    SiVite,
    SiPhp,
    SiMysql,
    SiDocker,
    SiNodedotjs,
    SiSqlite
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const AntigravityIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2L2 19h20L12 2z" className="opacity-40" />
        <path d="M12 2L7 11h10L12 2z" />
        <circle cx="12" cy="14" r="3" className="animate-pulse" />
        <path d="M8 21h8" className="opacity-50" />
    </svg>
);

const TechLogos = [
    { name: "Antigravity", icon: AntigravityIcon, color: "#FFFFFF", hex: "0xAI" },
    { name: "Laravel", icon: SiLaravel, color: "#FF2D20", hex: "0xFF2D" },
    { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D", hex: "0x4FC0" },
    { name: "SQLite", icon: SiSqlite, color: "#003B57", hex: "0x003B" },
    { name: "VS Code", icon: VscVscode, color: "#007ACC", hex: "0x007A" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", hex: "0x3178" },
    { name: "React", icon: SiReact, color: "#61DAFB", hex: "0x61DA" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", hex: "0x06B6" },
    { name: "Vite", icon: SiVite, color: "#646CFF", hex: "0x646C" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1", hex: "0x4479" },
    { name: "Docker", icon: SiDocker, color: "#2496ED", hex: "0x2496" },
];

const CrypticText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const [display, setDisplay] = useState("");
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+";

    useEffect(() => {
        let iteration = 0;
        let timeout: any;

        const startScramble = () => {
            const interval = setInterval(() => {
                setDisplay(
                    text
                        .split("")
                        .map((char, index) => {
                            if (index < iteration) return text[index];
                            return characters[Math.floor(Math.random() * characters.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 30);
        };

        timeout = setTimeout(startScramble, delay);
        return () => {
            clearTimeout(timeout);
        };
    }, [text, delay]);

    return <span>{display}</span>;
}

const CrypticIcon = ({ Icon, delay = 0 }: { Icon: any; delay?: number }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [char, setChar] = useState("");
    const characters = "01<>{}[]/+$#@!%&";

    useEffect(() => {
        let timeout: any;
        let interval: any;

        const startLoading = () => {
            interval = setInterval(() => {
                setChar(characters[Math.floor(Math.random() * characters.length)]);
            }, 80);

            timeout = setTimeout(() => {
                clearInterval(interval);
                setIsLoaded(true);
            }, 1000);
        };

        const initialDelay = setTimeout(startLoading, delay);
        return () => {
            clearTimeout(initialDelay);
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [delay]);

    return (
        <div className="w-10 h-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
                {!isLoaded ? (
                    <motion.span
                        key="char"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.5, filter: "blur(8px)" }}
                        className="text-blue-500/50 font-bold text-xl"
                    >
                        {char}
                    </motion.span>
                ) : (
                    <motion.div
                        key="icon"
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        className="relative"
                    >
                        <Icon className="text-4xl" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export function UsedTechnologiesMarquee() {
    const [isBooted, setIsBooted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsBooted(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="py-20 bg-black overflow-hidden font-mono border-y border-white/5 relative">
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%] z-20 opacity-20"></div>

            <div className="container mx-auto px-4 mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/10 pb-12">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-white/30 text-[10px] tracking-[0.4em] uppercase mb-4">
                            <span className="w-2 h-2 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                            <CrypticText text="ENGINEERING_STACK.V4" />
                        </div>
                        <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-white uppercase leading-none">
                            <CrypticText text="Used Technologies" delay={500} />
                        </h2>
                    </div>

                    <div className="flex flex-col gap-2 text-right text-[9px] tracking-[0.2em] uppercase shrink-0">
                        <AnimatePresence>
                            {isBooted ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.3 }}
                                    className="flex flex-col gap-2"
                                >
                                    <span>CORE_DEPENDENCIES / 12_MATCHED</span>
                                    <span>SYSTEM_STABILITY / OPTIMAL</span>
                                </motion.div>
                            ) : (
                                <div className="text-blue-500/50 flex flex-col items-end">
                                    <span className="animate-pulse">BOOTING_SEQUENCE...</span>
                                    <span className="text-[7px]">0x7F 0x45 0x4C 0x46 ...</span>
                                </div>
                            )}
                        </AnimatePresence>
                        <div className="h-px w-full bg-white/20 mt-2"></div>
                    </div>
                </div>
            </div>

            <div className="relative">
                <Marquee speed={50} pauseOnHover className="mt-0 py-8">
                    {TechLogos.map((tech, index) => (
                        <motion.div
                            key={index}
                            className="flex items-center gap-6 mx-12 group cursor-crosshair relative"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="relative">
                                {/* Glitch Layers */}
                                <div className="absolute inset-0 text-red-500 opacity-0 group-hover:opacity-50 group-hover:translate-x-1 transition-all duration-75 mix-blend-screen pointer-events-none">
                                    <tech.icon className="text-4xl" />
                                </div>
                                <div className="absolute inset-0 text-blue-500 opacity-0 group-hover:opacity-50 group-hover:-translate-x-1 transition-all duration-75 mix-blend-screen pointer-events-none">
                                    <tech.icon className="text-4xl" />
                                </div>
                                <div className="text-white/20 group-hover:text-white transition-all duration-300 relative z-10">
                                    <CrypticIcon Icon={tech.icon} delay={1000 + (index * 200)} />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-white/10 group-hover:text-white transition-colors duration-300 text-[10px] font-black tracking-[0.3em] uppercase">
                                    <CrypticText text={tech.name} delay={1500 + (index * 200)} />
                                </span>
                                <span className="text-[8px] text-white/5 group-hover:text-blue-500/50 transition-colors duration-300 tracking-widest mt-1">
                                    PTR_{tech.hex}
                                </span>
                            </div>

                            {/* Hover Technical Decoration */}
                            <div className="absolute -top-4 -left-4 w-2 h-2 border-t border-l border-blue-500/0 group-hover:border-blue-500/50 transition-all duration-300"></div>
                            <div className="absolute -bottom-4 -right-4 w-2 h-2 border-b border-r border-blue-500/0 group-hover:border-blue-500/50 transition-all duration-300"></div>
                        </motion.div>
                    ))}
                </Marquee>

                {/* Overlays */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>
            </div>

            {/* Decorative Technical Line */}
            <div className="mt-20 container mx-auto px-4">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <div className="flex justify-between mt-4 text-[8px] text-white/10 tracking-[0.6em] uppercase">
                    <span className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-green-500/50 rounded-full animate-ping"></span>
                        <CrypticText text="Stack_Verification_Protocol_Active" delay={2000} />
                    </span>
                    <span>Buffer: {isBooted ? "LOADED" : "INITIALIZING..."}</span>
                </div>
            </div>
        </div>
    );
}
