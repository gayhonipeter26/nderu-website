import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Grid, Play, UserCircle, Tag, Heart, Send, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileStats {
    posts: number;
    projects: number;
    experience: number;
}

interface InstagramProfileHeaderProps {
    name?: string;
    username?: string;
    avatarUrl?: string;
    stats?: ProfileStats;
    bio?: string;
    footerText?: string;
    children?: React.ReactNode;
    activeTab?: string;
    onTabChange?: (tab: string) => void;
}

export const InstagramProfileHeader: React.FC<InstagramProfileHeaderProps> = ({
    name = "Nderu.ke",
    username = "nderu_ke",
    avatarUrl = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200",
    stats = { posts: 42, projects: 50, experience: 5 },
    bio = "Builder of Practical Systems. Software engineer designing HMS, POS & Workflow-driven tools.",
    footerText = "Followed by tech_community and 500 others",
    children,
    activeTab = "about",
    onTabChange
}) => {
    const [isLiked, setIsLiked] = React.useState(false);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
            {/* Main Profile Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-20 mb-8 md:mb-14">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
                        <div className="bg-background rounded-full p-[3px]">
                            <Avatar className="h-32 w-32 md:h-40 md:w-40 border-2 border-background">
                                <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
                                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>

                {/* Right side Info */}
                <div className="flex-1 space-y-6">
                    {/* Top Row: Username and Actions */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <h2 className="text-xl font-medium tracking-tight">{username}</h2>
                        <div className="flex items-center gap-2">
                            <a href="/contact">
                                <Button variant="secondary" size="sm" className="font-semibold h-8 rounded-lg px-6">
                                    Contact
                                </Button>
                            </a>
                            <a
                                href={`https://instagram.com/${username.replace('_', '.')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="secondary" size="sm" className="font-semibold h-8 rounded-lg px-3">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </a>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setIsLiked(!isLiked)}
                            >
                                <Heart
                                    className={cn(
                                        "h-5 w-5 transition-colors",
                                        isLiked ? "fill-red-500 text-red-500" : "text-foreground"
                                    )}
                                />
                            </Button>
                        </div>
                    </div>

                    {/* Middle Row: Stats */}
                    <div className="flex items-center justify-around md:justify-start md:gap-10 border-y md:border-none py-3 md:py-0 w-full">
                        <div className="flex flex-col md:flex-row items-center md:gap-1">
                            <span className="font-bold">{stats.posts}</span>
                            <span className="text-muted-foreground md:text-foreground">posts</span>
                        </div>
                        <div className="flex flex-col md:flex-row items-center md:gap-1">
                            <span className="font-bold">{stats.projects}</span>
                            <span className="text-muted-foreground md:text-foreground">projects</span>
                        </div>
                        <div className="flex flex-col md:flex-row items-center md:gap-1">
                            <span className="font-bold">{stats.experience}</span>
                            <span className="text-muted-foreground md:text-foreground">years</span>
                        </div>
                    </div>

                    {/* Bottom Row: Bio */}
                    <div className="space-y-1 text-center md:text-left">
                        <h1 className="font-bold text-sm flex items-center gap-1 justify-center md:justify-start">
                            {name}
                            <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                        </h1>
                        <p className="text-sm whitespace-pre-line leading-relaxed max-w-md">
                            {bio}
                        </p>
                        <div className="pt-2">
                            <span className="text-xs text-muted-foreground font-medium">
                                {footerText}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dynamic Stories/Highlights */}
            <div className="mb-4">
                {children}
            </div>

            {/* Profile Tabs */}
            <div className="flex items-center justify-center gap-12 border-t border-border">
                <div
                    onClick={() => onTabChange?.("about")}
                    className={cn(
                        "flex items-center gap-1.5 py-4 cursor-pointer transition-colors border-t -mt-[1px]",
                        activeTab === "about" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                >
                    <Grid size={12} />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">About Me</span>
                </div>
                <div
                    onClick={() => onTabChange?.("philosophy")}
                    className={cn(
                        "flex items-center gap-1.5 py-4 cursor-pointer transition-colors border-t -mt-[1px]",
                        activeTab === "philosophy" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                >
                    <Play size={12} />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Philosophy</span>
                </div>
                <div
                    onClick={() => onTabChange?.("trajectory")}
                    className={cn(
                        "flex items-center gap-1.5 py-4 cursor-pointer transition-colors border-t -mt-[1px]",
                        activeTab === "trajectory" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                >
                    <Tag size={12} />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Trajectory</span>
                </div>
            </div>
        </div>
    );
};
