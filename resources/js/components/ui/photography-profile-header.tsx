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
            <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
                <img
                    src={bannerImage}
                    alt="Profile Banner"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 lg:p-14">
                    <div className="container mx-auto flex flex-col md:flex-row items-end gap-6">

                        {/* Avatar */}
                        <div className="relative group">
                            <div className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-background overflow-hidden shadow-2xl bg-muted">
                                <img
                                    src={profileImage}
                                    alt={name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute bottom-0 right-0 h-6 w-6 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                                <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                            </div>
                        </div>

                        {/* Profile Text Info */}
                        <div className="flex-1 space-y-4 text-white">
                            <div className="flex flex-wrap items-center gap-4">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                                    {name}
                                </h1>
                                <div className="flex items-center gap-2">
                                    {socialLinks.tiktok && (
                                        <Button
                                            size="icon"
                                            asChild
                                            className="bg-white/10 hover:bg-white/20 border-white/10 text-white rounded-full transition-all duration-300 hover:scale-110"
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
                                            className="bg-white/10 hover:bg-white/20 border-white/10 text-white rounded-full transition-all duration-300 hover:scale-110"
                                        >
                                            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                                                <FaInstagram className="size-4" />
                                            </a>
                                        </Button>
                                    )}
                                    {socialLinks.threads && (
                                        <Button
                                            size="icon"
                                            asChild
                                            className="bg-white/10 hover:bg-white/20 border-white/10 text-white rounded-full transition-all duration-300 hover:scale-110"
                                        >
                                            <a href={socialLinks.threads} target="_blank" rel="noopener noreferrer">
                                                <FaThreads className="size-4" />
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Sub-info Row 1 */}
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm md:text-base font-medium text-white/90">
                                <div className="flex items-center gap-1.5 opacity-80">
                                    <User className="h-4 w-4" />
                                    <span>{username}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Users className="h-4 w-4" />
                                    <span><span className="font-bold">{stats.followers}</span> Followers</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Users className="h-4 w-4" />
                                    <span><span className="font-bold">{stats.following}</span> Following</span>
                                </div>
                            </div>
                        </div>

                        {/* Sub-info Row 2 (Extreme Right/Bottom) */}
                        <div className="flex flex-wrap md:flex-col items-center md:items-end gap-x-4 gap-y-1 text-xs md:text-sm text-white/60 font-medium pb-2">
                            <div className="flex items-center gap-1.5">
                                <ImageIcon className="h-4 w-4" />
                                <span>{stats.photos} Photos</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
