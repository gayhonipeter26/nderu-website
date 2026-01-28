import * as React from "react";
import { motion } from "framer-motion";
import { Camera, LayoutGrid, Newspaper, ArrowRight, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ContactCard } from "@/components/ui/contact-card";

export const InstagramCtaSections = () => {
    return (
        <section className="py-24 bg-black overflow-hidden border-t border-zinc-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <ContactCard
                        title="Beyond the Profile"
                        description="Explore the depth of my work through specialized lenses. From visual storytelling to technical engineering and deep-dives in the blog."
                        className="bg-[#0A0A0A] border-zinc-800/50 rounded-none shadow-none border-x-0 md:border-x"
                        formSectionClassName="bg-[#0D0D0D] border-zinc-800/50"
                        contactInfo={[
                            {
                                icon: Camera,
                                label: 'Photography',
                                value: 'visual_stories',
                                className: 'cursor-pointer hover:bg-white/5 transition-colors rounded-xl p-4 border border-zinc-800/30 group/item'
                            },
                            {
                                icon: LayoutGrid,
                                label: 'Projects',
                                value: 'tech_portfolio',
                                className: 'cursor-pointer hover:bg-white/5 transition-colors rounded-xl p-4 border border-zinc-800/30 group/item'
                            },
                            {
                                icon: Newspaper,
                                label: 'Blog',
                                value: 'deep_dives',
                                className: 'cursor-pointer hover:bg-white/5 transition-colors rounded-xl p-4 border border-zinc-800/30 group/item'
                            }
                        ]}
                    >
                        <div className="flex flex-col gap-8 w-full p-4 h-full justify-center">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Quick Access</h4>
                                <div className="space-y-3">
                                    <a href="/photography" className="block">
                                        <Button className="w-full h-12 bg-white text-black hover:bg-zinc-200 transition-all font-bold rounded-lg text-sm justify-between px-6 group/btn">
                                            View Photography
                                            <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </a>
                                    <a href="/projects" className="block">
                                        <Button className="w-full h-12 bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 transition-all font-bold rounded-lg text-sm justify-between px-6 group/btn">
                                            Open Portfolio
                                            <LayoutGrid className="size-4" />
                                        </Button>
                                    </a>
                                    <a href="/blog" className="block">
                                        <Button className="w-full h-12 bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 transition-all font-bold rounded-lg text-sm justify-between px-6 group/btn">
                                            Read Articles
                                            <Newspaper className="size-4" />
                                        </Button>
                                    </a>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-zinc-800/50">
                                <a href="/contact" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors flex items-center gap-2 group/contact">
                                    Work with me? <Send className="size-3 group-hover/contact:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </ContactCard>
                </div>

                {/* Technical Marker Footer */}
                <div className="mt-16 flex justify-center items-center gap-6 opacity-30 select-none pointer-events-none">
                    <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-zinc-800" />
                    <div className="flex items-center gap-3">
                        <div className="size-1 bg-zinc-700" />
                        <span className="text-[9px] font-mono tracking-[0.5em] text-zinc-600 uppercase italic">Architecture / Visuals / Software</span>
                        <div className="size-1 bg-zinc-700" />
                    </div>
                    <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-zinc-800" />
                </div>
            </div>
        </section>
    );
};
