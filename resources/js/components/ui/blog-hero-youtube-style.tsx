import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Search, Mic, Bell, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogHeroYoutubeStyleProps {
    title?: string;
    username?: string;
    subscriberCount?: string;
    videoCount?: string;
    bannerImage?: string;
    avatarImage?: string;
    description?: string;
    className?: string;
}

export function BlogHeroYoutubeStyle({
    title = "Blog",
    username = "@nderu_ke",
    subscriberCount = "6.9k subscribers",
    videoCount = "32 articles",
    bannerImage = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
    avatarImage = "/images/profile.jpg",
    description = "Insights on software engineering, system architecture, and photography",
    className
}: BlogHeroYoutubeStyleProps) {
    const [activeTab, setActiveTab] = React.useState("home");
    const [searchQuery, setSearchQuery] = React.useState("");

    return (
        <div className={cn("relative w-full bg-background", className)}>
            {/* YouTube-Style Top Navigation Bar */}
            <div className="sticky top-0 z-50 bg-background border-b border-border">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 md:h-16 gap-4">
                        {/* Left: Logo/Brand */}
                        <div className="flex items-center gap-4 shrink-0">
                            <h2 className="text-lg md:text-xl font-bold tracking-tight">Nderu News</h2>
                        </div>

                        {/* Center: Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-2xl items-center gap-2">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search"
                                    className="w-full h-10 px-4 pr-12 bg-muted/50 border border-border rounded-full text-sm focus:outline-none focus:border-foreground/50 transition-colors"
                                />
                                <button className="absolute right-0 top-0 h-10 px-4 border-l border-border rounded-r-full hover:bg-muted transition-colors">
                                    <Search className="h-4 w-4 text-muted-foreground" />
                                </button>
                            </div>
                            <button className="p-2 rounded-full hover:bg-muted transition-colors">
                                <Mic className="h-5 w-5 text-muted-foreground" />
                            </button>
                        </div>

                        {/* Right: Icons */}
                        <div className="flex items-center gap-2 md:gap-4 shrink-0">
                            {/* Mobile Search */}
                            <button className="md:hidden p-2 rounded-full hover:bg-muted transition-colors">
                                <Search className="h-5 w-5 text-muted-foreground" />
                            </button>

                            {/* Notifications */}
                            <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
                                <Bell className="h-5 w-5 text-muted-foreground" />
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* Profile */}
                            <Avatar className="h-8 w-8 cursor-pointer">
                                <AvatarImage src={avatarImage} alt="Profile" />
                                <AvatarFallback>
                                    <User className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </div>

            {/* Banner */}
            <div className="relative h-[120px] md:h-[200px] w-full overflow-hidden bg-gradient-to-br from-purple-900/20 via-background to-blue-900/20">
                <img
                    src={bannerImage}
                    alt="Blog Banner"
                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>

            {/* Profile Section */}
            <div className="relative px-4 md:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-6 -mt-12 md:-mt-16">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            <div className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-background overflow-hidden bg-muted shadow-xl">
                                <img
                                    src={avatarImage}
                                    alt={title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 pb-4 md:pb-6">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
                                        {title}
                                    </h1>
                                    <BadgeCheck className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground" />
                                </div>
                                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                    <span className="font-medium">{username}</span>
                                    <span className="hidden md:inline">•</span>
                                    <span>{subscriberCount}</span>
                                    <span className="hidden md:inline">•</span>
                                    <span>{videoCount}</span>
                                </div>
                                <p className="text-sm text-muted-foreground max-w-2xl mt-1">
                                    {description}
                                </p>
                                <div className="mt-3">
                                    <Button
                                        size="sm"
                                        className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium px-6"
                                    >
                                        Subscribe
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex items-center gap-6 md:gap-8 border-b border-border mt-4 overflow-x-auto no-scrollbar">
                        <button
                            onClick={() => setActiveTab("home")}
                            className={cn(
                                "px-1 py-3 text-sm font-medium whitespace-nowrap transition-colors",
                                activeTab === "home"
                                    ? "text-foreground border-b-2 border-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => setActiveTab("articles")}
                            className={cn(
                                "px-1 py-3 text-sm font-medium whitespace-nowrap transition-colors",
                                activeTab === "articles"
                                    ? "text-foreground border-b-2 border-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Articles
                        </button>
                        <button
                            onClick={() => setActiveTab("videos")}
                            className={cn(
                                "px-1 py-3 text-sm font-medium whitespace-nowrap transition-colors",
                                activeTab === "videos"
                                    ? "text-foreground border-b-2 border-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Videos
                        </button>
                        <button
                            onClick={() => setActiveTab("posts")}
                            className={cn(
                                "px-1 py-3 text-sm font-medium whitespace-nowrap transition-colors",
                                activeTab === "posts"
                                    ? "text-foreground border-b-2 border-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Posts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
