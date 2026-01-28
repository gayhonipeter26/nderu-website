"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const sections = [
    {
        title: "Where I Focus",
        content: "On the software side, I design and develop Hospital Management Systems (HMS), retail and wholesale POS platforms, multi-tenant applications, and workflow-driven business tools. These systems are built to be reliable, scalable, and simple—especially for small to mid-sized organizations. On the photography side, I focus on telling honest stories through visuals, capturing environments, people, and details in a way that feels natural and intentional.",
        bg: "bg-background"
    },
    {
        title: "How I Build Software",
        content: "I work primarily with Laravel on the backend and Vue or React on the frontend, building modular systems that can grow without becoming fragile. I prioritize clean architecture, predictable workflows, and familiar UI patterns so users can focus on their work—not the system.",
        bg: "bg-muted/30"
    },
    {
        title: "My Approach to Photography",
        content: "Photography, for me, is about observation and timing. I’m drawn to real-life scenes, subtle emotions, and meaningful details. I focus on composition, lighting, and mood rather than over-editing, letting each image speak for itself.",
        bg: "bg-background"
    },
    {
        title: "Why Real-World Problems Matter",
        content: "Many products fail because they don’t reflect how people actually work or live. Whether I’m building software or capturing images, I pay attention to context, edge cases, and long-term value. If something feels forced or complicated, it usually means it needs to be rethought.",
        bg: "bg-muted/30"
    },
    {
        title: "Beyond Code and Cameras",
        content: "I’m interested in systems that last—technically and creatively. That includes documentation, performance, security, usability, and continuous learning. I believe strong thinking connects both engineering and art.",
        bg: "bg-background"
    },
    {
        title: "What I’m Working Toward",
        content: "My long-term goal is to build and create work that improves essential services, tells meaningful stories, and proves that simplicity—done well—can be powerful.",
        bg: "bg-muted/30"
    }
];

export const AboutMeScrollingContent = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const sectionEls = containerRef.current!.querySelectorAll(".scroll-section");

            sectionEls.forEach((section) => {
                const title = section.querySelector(".section-title");
                const body = section.querySelector(".section-body");

                // Animate entry
                gsap.fromTo(
                    [title, body],
                    {
                        y: 40,
                        opacity: 0,
                        filter: "blur(8px)"
                    },
                    {
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        duration: 1.2,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            end: "top 20%",
                            toggleActions: "play none none reverse",
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="space-y-0">
            {sections.map((section, i) => (
                <section
                    key={i}
                    className={cn(
                        "scroll-section min-h-[60vh] flex flex-col justify-center px-6 md:px-12 py-24 border-b border-border/40",
                        section.bg
                    )}
                >
                    <div className="max-w-xl">
                        <h2 className="section-title text-2xl md:text-3xl font-bold tracking-tight mb-6 text-foreground uppercase tracking-[0.1em]">
                            {section.title}
                        </h2>
                        <p className="section-body text-lg text-muted-foreground leading-relaxed font-medium">
                            {section.content}
                        </p>
                    </div>
                </section>
            ))}
        </div>
    );
};
