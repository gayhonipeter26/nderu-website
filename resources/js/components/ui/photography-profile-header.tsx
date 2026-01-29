import React from 'react';
import { cn } from "@/lib/utils";
import {
    User,
    Users,
    Image as ImageIcon,
    CheckCircle2
} from "lucide-react";
import { FaInstagram, FaTiktok, FaThreads } from "react-icons/fa6";
import { Button } from "./button";

interface PhotographyProfileHeaderProps {
    name?: string;
    username?: string;
    stats?: {
        followers: number;
        following: number;
        photos: number;
    };
    bannerImage?: string;
    profileImage?: string;
    socialLinks?: {
        tiktok?: string;
        instagram?: string;
        threads?: string;
    };
    className?: string;
}

export function PhotographyProfileHeader({
    name = "Shutter_ bebz photography",
    username = "Shutter_bebz.254",
    stats = {
        followers: 1250,
        following: 450,
        photos: 120
    },
    bannerImage = "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop",
    profileImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    socialLinks = {
        tiktok: "https://tiktok.com/@shutter_bebz.254",
        instagram: "https://instagram.com/shutter_bebz.254",
        threads: "https://threads.net/@shutter_bebz.254"
    },
    className
}: PhotographyProfileHeaderProps) {
    return (
        <div className={cn("relative w-full overflow-hidden bg-background", className)}>
            {/* Banner Area */}
            <div className="relative h-[200px] md:h-[400px] w-full overflow-hidden">
                <img
                    src={bannerImage}
                    alt="Profile Banner"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent md:hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent hidden md:block" />
            </div>

            {/* Profile Content - Overlapping Banner */}
            <div className="relative px-4 pb-8 md:px-10 lg:px-14">
                <div className="container mx-auto -mt-16 md:-mt-20">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-8">

                        {/* Avatar */}
                        <div className="relative group shrink-0">
                            <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-[4px] border-background overflow-hidden shadow-2xl bg-muted relative z-10">
                                <img
                                    src={profileImage}
                                    alt={name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute bottom-1 right-2 md:bottom-2 md:right-2 h-6 w-6 md:h-7 md:w-7 bg-primary rounded-full border-2 border-background flex items-center justify-center z-20">
                                <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-primary-foreground" />
                            </div>
                        </div>

                        {/* Profile Text Info */}
                        <div className="flex-1 space-y-4 text-center md:text-left pt-2 md:pt-0 pb-2">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                                        {name}
                                    </h1>
                                    <div className="flex items-center justify-center md:justify-start gap-1.5 text-muted-foreground font-medium">
                                        <User className="h-4 w-4" />
                                        <span>{username}</span>
                                    </div>
                                </div>

                                {/* Social Actions */}
                                <div className="flex items-center justify-center gap-2">
                                    {socialLinks.tiktok && (
                                        <Button
                                            size="icon"
                                            asChild
                                            variant="secondary"
                                            className="rounded-full h-10 w-10 hover:scale-110 transition-transform"
                                        >
                                            <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer">
                                                <FaTiktok className="size-4" />
                                            </a>
                                        </Button>
                                    )}
                                    {socialLinks.instagram && (
                                        <Button
                                            size="icon"
                                            asChild
                                            variant="secondary"
                                            className="rounded-full h-10 w-10 hover:scale-110 transition-transform"
                                        >
                                            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                                                <FaInstagram className="size-5" />
                                            </a>
                                        </Button>
                                    )}
                                    {socialLinks.threads && (
                                        <Button
                                            size="icon"
                                            asChild
                                            variant="secondary"
                                            className="rounded-full h-10 w-10 hover:scale-110 transition-transform"
                                        >
                                            <a href={socialLinks.threads} target="_blank" rel="noopener noreferrer">
                                                <FaThreads className="size-4" />
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Sub-info Stats */}
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm md:text-base text-muted-foreground border-t border-border/50 pt-4 md:border-none md:pt-0">
                                <div className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer">
                                    <span className="font-bold text-foreground">{stats.followers}</span>
                                    <span>Followers</span>
                                </div>
                                <div className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer">
                                    <span className="font-bold text-foreground">{stats.following}</span>
                                    <span>Following</span>
                                </div>
                                <div className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer">
                                    <ImageIcon className="h-4 w-4" />
                                    <span className="font-bold text-foreground">{stats.photos}</span>
                                    <span>Photos</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
