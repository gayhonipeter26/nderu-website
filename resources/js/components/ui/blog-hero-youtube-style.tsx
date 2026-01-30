import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Search, Mic, Bell, User, X, ChevronLeft, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { VideoUploadDialog } from "@/components/ui/video-upload-dialog";
import { YoutubeVideoPlayer } from "@/components/ui/youtube-video-player";

interface BlogHeroYoutubeStyleProps {
    title?: string;
    username?: string;
    subscriberCount?: string;
    videoCount?: string;
    bannerImage?: string;
    avatarImage?: string;
    description?: string;
    onSearch?: (query: string) => void;
    onTabChange?: (tab: string) => void;
    onVideoUploaded?: (videoData: { title: string; url: string; duration: string; coverImage: string; description: string; links: string[] }) => void;
    showPlayerExternally?: boolean;
    onPlayerClose?: () => void;
    video?: { title: string; url: string; duration: string; coverImage: string; description: string; links: string[] } | null;
    className?: string;
}

export function BlogHeroYoutubeStyle({
    title = "Blogs",
    username = "@nderu_ke",
    subscriberCount = "6.9k subscribers",
    videoCount = "32 articles",
    bannerImage = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
    avatarImage = "/images/profile.jpg",
    description = "Insights on software engineering, system architecture, and photography",
    onSearch,
    onTabChange,
    onVideoUploaded,
    showPlayerExternally = false,
    onPlayerClose,
    video,
    className
}: BlogHeroYoutubeStyleProps) {
    const [activeTab, setActiveTab] = React.useState("home");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isTabSearchOpen, setIsTabSearchOpen] = React.useState(false);
    const [tabSearchQuery, setTabSearchQuery] = React.useState("");
    const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);
    const [isUploadDialogOpen, setIsUploadDialogOpen] = React.useState(false);
    const [showPlayer, setShowPlayer] = React.useState(false);

    React.useEffect(() => {
        if (showPlayerExternally) {
            setShowPlayer(true);
        }
    }, [showPlayerExternally]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch?.(query);
    };

    const handleTabSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setTabSearchQuery(query);
        onSearch?.(query);
    };

    const toggleTabSearch = () => {
        setIsTabSearchOpen(!isTabSearchOpen);
        if (isTabSearchOpen) {
            setTabSearchQuery("");
            onSearch?.(searchQuery); // Reset to top bar search if tab search closed
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={cn("relative w-full bg-background", className)}
        >
            {/* YouTube-Style Top Navigation Bar */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="sticky top-0 md:top-[64px] z-50 bg-background border-b border-border shadow-sm"
            >
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 md:h-16 gap-4">
                        {/* Mobile Search Overlay */}
                        <AnimatePresence>
                            {isMobileSearchOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute inset-0 z-[60] bg-background flex items-center px-4 gap-3"
                                >
                                    <button
                                        onClick={() => setIsMobileSearchOpen(false)}
                                        className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>
                                    <div className="flex-1 relative">
                                        <input
                                            autoFocus
                                            type="text"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            placeholder="Search"
                                            className="w-full h-10 px-4 bg-muted border border-border rounded-full text-sm focus:outline-none"
                                        />
                                    </div>
                                    <button className="p-2 hover:bg-muted rounded-full">
                                        <Mic className="h-5 w-5" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Left: Logo/Brand */}
                        <div className="flex items-center gap-4 shrink-0">
                            <h2 className="text-lg font-bold tracking-tight">Blogs</h2>
                        </div>

                        {/* Center: Search Bar (Desktop) */}
                        <div className="hidden md:flex flex-1 max-w-2xl items-center gap-2">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search"
                                    className="w-full h-10 px-4 pr-12 bg-muted/50 border border-border rounded-full text-sm focus:outline-none focus:border-foreground/50 transition-colors shadow-inner"
                                />
                                <button className="absolute right-0 top-0 h-10 px-4 border-l border-border rounded-r-full hover:bg-muted transition-colors">
                                    <Search className="h-4 w-4 text-muted-foreground" />
                                </button>
                            </div>
                            <button className="p-2 rounded-full hover:bg-muted transition-colors bg-muted/30">
                                <Mic className="h-5 w-5 text-muted-foreground" />
                            </button>
                        </div>

                        {/* Right: Icons */}
                        <div className="flex items-center gap-2 md:gap-4 shrink-0">
                            {/* Mobile Search Trigger */}
                            <button
                                onClick={() => setIsMobileSearchOpen(true)}
                                className="md:hidden p-2 rounded-full hover:bg-muted transition-colors"
                            >
                                <Search className="h-5 w-5 text-muted-foreground" />
                            </button>

                            {/* Create Button (YouTube Style) */}
                            <button
                                onClick={() => setIsUploadDialogOpen(true)}
                                className="hidden md:flex items-center gap-2 p-2 rounded-full hover:bg-muted transition-colors group"
                                title="Create"
                            >
                                <Video className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                <span className="hidden lg:inline text-sm font-medium">Create</span>
                            </button>

                            <button
                                onClick={() => setIsUploadDialogOpen(true)}
                                className="md:hidden p-2 rounded-full hover:bg-muted transition-colors"
                                title="Create"
                            >
                                <Video className="h-5 w-5 text-muted-foreground" />
                            </button>

                            {/* Notifications */}
                            <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
                                <Bell className="h-5 w-5 text-muted-foreground" />
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* Profile */}
                            <Avatar className="h-8 w-8 cursor-pointer ring-1 ring-border">
                                <AvatarImage src={avatarImage} alt="Profile" />
                                <AvatarFallback>
                                    <User className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Banner */}
            <motion.div
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative h-[120px] md:h-[200px] w-full overflow-hidden bg-gradient-to-br from-purple-900/20 via-background to-blue-900/20"
            >
                <img
                    src={bannerImage}
                    alt="Blog Banner"
                    className="absolute inset-0 h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </motion.div>

            {/* Profile Section */}
            <div className="relative">
                <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-6 -mt-12 md:-mt-16">
                        {/* Avatar */}
                        <motion.div
                            initial={{ y: 20, opacity: 0, scale: 0.9 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="relative shrink-0 flex justify-center md:block w-full md:w-auto"
                        >
                            <div className="h-20 w-20 md:h-32 md:w-32 rounded-full border-4 border-background overflow-hidden bg-muted shadow-2xl">
                                <img
                                    src={avatarImage}
                                    alt={title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </motion.div>

                        {/* Info */}
                        <motion.div
                            initial={{ y: 15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex-1 pb-0 w-full text-center md:text-left"
                        >
                            <div className="flex flex-col gap-2 items-center md:items-start">
                                <div className="flex items-center gap-2">
                                    <h1 className="text-xl md:text-4xl font-bold tracking-tight text-foreground">
                                        {title}
                                    </h1>
                                    <BadgeCheck className="h-4 w-4 md:h-6 md:w-6 text-blue-500 fill-blue-500/10" />
                                </div>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-xs md:text-sm text-muted-foreground font-medium">
                                    <span className="font-bold text-foreground/80">{username}</span>
                                    <span className="hidden sm:inline text-muted-foreground/40">•</span>
                                    <span>{subscriberCount}</span>
                                    <span className="hidden sm:inline text-muted-foreground/40">•</span>
                                    <span>{videoCount}</span>
                                </div>
                                <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mt-1 leading-relaxed px-4 md:px-0">
                                    {description}
                                </p>
                                <div className="mt-4 flex items-center justify-center md:justify-start gap-3 w-full md:w-auto px-4 md:px-0">
                                    <Button
                                        size="sm"
                                        className="flex-1 md:flex-none rounded-full bg-foreground text-background hover:bg-foreground/90 font-bold px-8 transition-all hover:scale-105 active:scale-95 text-xs md:text-sm h-9 md:h-10"
                                    >
                                        Subscribe
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="flex-1 md:flex-none rounded-full font-bold px-6 transition-all hover:bg-muted/80 text-xs md:text-sm h-9 md:h-10"
                                    >
                                        Join
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Navigation Tabs */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex items-center justify-between border-b border-border mt-4 md:mt-6 overflow-hidden"
                    >
                        <div className="flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth">
                            <button
                                onClick={() => { setActiveTab("home"); onTabChange?.("home"); }}
                                className={cn(
                                    "px-1 py-3 md:py-4 text-xs md:text-sm font-bold whitespace-nowrap transition-all relative group shrink-0",
                                    activeTab === "home" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                HOME
                                <AnimatePresence>
                                    {activeTab === "home" && (
                                        <motion.div
                                            layoutId="activeTabIndicator"
                                            className="absolute bottom-0 left-0 right-0 h-[3px] bg-foreground rounded-t-full"
                                        />
                                    )}
                                </AnimatePresence>
                            </button>
                            <button
                                onClick={() => { setActiveTab("articles"); onTabChange?.("articles"); }}
                                className={cn(
                                    "px-1 py-4 text-sm font-bold whitespace-nowrap transition-all relative group",
                                    activeTab === "articles" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                ARTICLES
                                <AnimatePresence>
                                    {activeTab === "articles" && (
                                        <motion.div
                                            layoutId="activeTabIndicator"
                                            className="absolute bottom-0 left-0 right-0 h-[3px] bg-foreground rounded-t-full"
                                        />
                                    )}
                                </AnimatePresence>
                            </button>
                            <button
                                onClick={() => { setActiveTab("videos"); onTabChange?.("videos"); }}
                                className={cn(
                                    "px-1 py-4 text-sm font-bold whitespace-nowrap transition-all relative group",
                                    activeTab === "videos" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                VIDEOS
                                <AnimatePresence>
                                    {activeTab === "videos" && (
                                        <motion.div
                                            layoutId="activeTabIndicator"
                                            className="absolute bottom-0 left-0 right-0 h-[3px] bg-foreground rounded-t-full"
                                        />
                                    )}
                                </AnimatePresence>
                            </button>
                            <button
                                onClick={() => { setActiveTab("posts"); onTabChange?.("posts"); }}
                                className={cn(
                                    "px-1 py-4 text-sm font-bold whitespace-nowrap transition-all relative group",
                                    activeTab === "posts" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                POSTS
                                <AnimatePresence>
                                    {activeTab === "posts" && (
                                        <motion.div
                                            layoutId="activeTabIndicator"
                                            className="absolute bottom-0 left-0 right-0 h-[3px] bg-foreground rounded-t-full"
                                        />
                                    )}
                                </AnimatePresence>
                            </button>

                            {/* Search Icon in Tabs */}
                            <div className="flex items-center h-full">
                                <AnimatePresence mode="wait">
                                    {isTabSearchOpen ? (
                                        <motion.div
                                            key="search-input"
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: "auto", opacity: 1 }}
                                            exit={{ width: 0, opacity: 0 }}
                                            className="flex items-center gap-2 px-3 py-1.5 h-9 bg-muted/40 rounded-full ml-2 overflow-hidden"
                                        >
                                            <Search className="h-4 w-4 text-muted-foreground" />
                                            <input
                                                autoFocus
                                                type="text"
                                                value={tabSearchQuery}
                                                onChange={handleTabSearchChange}
                                                placeholder="Search channel"
                                                className="bg-transparent border-none text-sm focus:outline-none w-32 md:w-48 text-foreground font-medium"
                                            />
                                            <button onClick={toggleTabSearch} className="p-1 hover:bg-muted/80 rounded-full transition-colors">
                                                <X className="h-3.5 w-3.5 text-muted-foreground" />
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.button
                                            key="search-button"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={toggleTabSearch}
                                            className="p-3 text-muted-foreground hover:text-foreground transition-colors group"
                                            title="Search"
                                        >
                                            <Search className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <VideoUploadDialog
                open={isUploadDialogOpen}
                onOpenChange={setIsUploadDialogOpen}
                onSuccess={(data) => {
                    onVideoUploaded?.(data);
                }}
            />

            <AnimatePresence>
                {showPlayer && video && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-[100]"
                    >
                        <YoutubeVideoPlayer
                            key={video.url}
                            video={video}
                            onClose={() => {
                                setShowPlayer(false);
                                onPlayerClose?.();
                            }}
                            onCreateClick={() => setIsUploadDialogOpen(true)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
