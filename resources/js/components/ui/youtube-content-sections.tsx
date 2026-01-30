import * as React from "react";
import { cn } from "@/lib/utils";
import { Play, MoreVertical, ChevronLeft, ChevronRight, CheckCircle2, ScrollText } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { router } from "@inertiajs/vue3";

interface Post {
    id: number;
    slug: string;
    title: string;
    summary: string | null;
    cover_image_url: string | null;
    feature_video_url: string | null;
    published_at: string | null;
    likes_count: number;
    category?: string;
    author?: string;
    reading_time?: string | null;
}

interface YoutubeContentSectionsProps {
    posts: Post[];
    className?: string;
    searchQuery?: string;
    activeTab?: string;
    uploadedVideos?: { title: string; url: string; duration: string; coverImage: string; description: string; links: string[] }[];
    onVideoClick?: (video: { title: string; url: string; duration: string; coverImage: string; description: string; links: string[] }) => void;
}

const formatTimeAgo = (date: string | null) => {
    if (!date) return "Recently";
    const now = new Date();
    const published = new Date(date);
    const diffInDays = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInDays / 365)} year${Math.floor(diffInDays / 365) > 1 ? 's' : ''} ago`;
};

const VideoCard = ({ post, isCompact = false, index = 0, onVideoClick }: { post: Post; isCompact?: boolean; index?: number; onVideoClick?: (video: any) => void }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const isVideo = !!post.feature_video_url;

    const handleCardClick = () => {
        if (isVideo) {
            // If it's a dynamic upload, use the original data
            if ((post as any)._original) {
                onVideoClick?.((post as any)._original);
            } else {
                // Otherwise map the post to video structure
                onVideoClick?.({
                    title: post.title,
                    url: post.feature_video_url,
                    description: post.summary || "View this session's details",
                    author: post.author || "Nderu Gathoni",
                    links: []
                });
            }
            return;
        }

        // If it's a pure blog post (no video), navigate to show page
        if (post.id >= 0) {
            router.visit(`/blog/${post.slug}`);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.1, ease: "easeOut" }}
            onClick={handleCardClick}
            className={cn(
                "group cursor-pointer flex-none",
                isCompact
                    ? "w-48 md:w-56"
                    : "w-[85vw] sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]"
            )}
        >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-[#272727] mb-3">
                <div className={cn(
                    "absolute inset-0 bg-[#272727] animate-pulse transition-opacity duration-500",
                    isLoaded ? "opacity-0" : "opacity-100"
                )} />
                <img
                    src={post.cover_image_url || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=400"}
                    alt={post.title}
                    loading="lazy"
                    onLoad={() => setIsLoaded(true)}
                    className={cn(
                        "w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105",
                        isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
                    )}
                />

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-300" />

                {/* Duration badge */}
                <div className="absolute bottom-1.5 right-1.5 bg-black/90 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-[4px] leading-none z-10">
                    {post.reading_time || "3:20"}
                </div>

                {/* Content type overlay (Play or Script) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 z-20">
                    <div className="bg-black/40 backdrop-blur-md rounded-full p-3 border border-white/10">
                        {isVideo ? (
                            <Play className="h-8 w-8 text-white fill-white ml-0.5" />
                        ) : (
                            <ScrollText className="h-8 w-8 text-white" />
                        )}
                    </div>
                </div>
            </div>

            <div className="flex gap-2 md:gap-3">
                <div className="flex-none pt-0.5">
                    <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-[#333] border border-white/5 overflow-hidden ring-offset-2 ring-offset-[#0f0f0f] group-hover:ring-1 ring-white/20 transition-all">
                        <img
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.author || 'XO'}`}
                            alt="Avatar"
                            className="w-full h-full object-cover shadow-inner"
                        />
                    </div>
                </div>
                <div className="flex-1 min-w-0 pr-4 md:pr-6 relative">
                    <h3 className={cn(
                        "font-bold leading-[1.3] text-[#f1f1f1] group-hover:text-white transition-colors line-clamp-2",
                        isCompact ? "text-[13px] md:text-sm" : "text-[14px] md:text-[15px]"
                    )}>
                        {post.title}
                    </h3>
                    <div className="mt-1 space-y-0.5">
                        <p className="text-[12px] md:text-[13px] text-[#aaaaaa] flex items-center gap-1 hover:text-white transition-colors">
                            {post.author || "Nderu Gathoni"}
                            <CheckCircle2 className="h-3 w-3 md:h-3.5 md:w-3.5 fill-[#aaaaaa] text-[#0f0f0f]" />
                        </p>
                        <p className="text-[12px] md:text-[13px] text-[#aaaaaa]">
                            {post.likes_count || Math.floor(Math.random() * 900) + 100}k views • {formatTimeAgo(post.published_at)}
                        </p>
                    </div>

                    <button className="absolute top-0 -right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded-full">
                        <MoreVertical className="h-5 w-5 text-[#f1f1f1]" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const SectionRow = ({
    title,
    items,
    renderItem,
    icon,
    showPlayAll = false
}: {
    title: string;
    items: any[];
    renderItem: (item: any, index: number) => React.ReactNode;
    icon?: React.ReactNode;
    showPlayAll?: boolean;
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 10);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        const current = scrollRef.current;
        if (current) {
            current.addEventListener('scroll', checkScroll);
            checkScroll();
            window.addEventListener('resize', checkScroll);
            return () => {
                current.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            };
        }
    }, [items]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.85;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (items.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative pt-2 pb-8 border-b border-white/5 last:border-0 group/section"
        >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-3 px-1 md:px-0">
                <div className="flex items-center gap-2 md:gap-3">
                    {icon && <div className="h-7 w-7 md:h-9 md:w-9 flex-none">{icon}</div>}
                    <h2 className="text-[18px] md:text-[20px] font-bold tracking-tight text-[#f1f1f1] hover:text-white cursor-pointer transition-colors">
                        {title}
                    </h2>
                    {showPlayAll && (
                        <button className="hidden sm:flex items-center gap-2 ml-3 text-[13px] md:text-[14px] font-bold text-[#f1f1f1] hover:bg-white/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all">
                            <Play className="h-3 w-3 md:h-3.5 md:w-3.5 fill-current" />
                            Play all
                        </button>
                    )}
                </div>
                <button className="p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-colors text-[#f1f1f1]">
                    <MoreVertical className="h-4 w-4 md:h-5 md:w-5" />
                </button>
            </div>

            {/* Carousel Container */}
            <div className="relative group/carousel px-1">
                <AnimatePresence>
                    {showLeftArrow && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => scroll('left')}
                            className="absolute left-[-22px] top-[40%] -translate-y-1/2 z-30 bg-[#0f0f0f]/90 hover:bg-[#272727] border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)] rounded-full p-2.5 transition-all text-white hidden md:flex items-center justify-center backdrop-blur-sm"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </motion.button>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showRightArrow && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => scroll('right')}
                            className="absolute right-[-22px] top-[40%] -translate-y-1/2 z-30 bg-[#0f0f0f]/90 hover:bg-[#272727] border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)] rounded-full p-2.5 transition-all text-white hidden md:flex items-center justify-center backdrop-blur-sm"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Content Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2 px-0.5"
                >
                    {items.map((item, idx) => renderItem(item, idx))}
                </div>
            </div>
        </motion.div>
    );
};

export function YoutubeContentSections({ posts, className, searchQuery = "", activeTab = "home", uploadedVideos = [], onVideoClick }: YoutubeContentSectionsProps) {
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.author || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.category || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Dynamic filtering based on active tab
    const getTabContent = () => {
        const queryLower = searchQuery.toLowerCase();

        const uploadedPosts: Post[] = uploadedVideos.map((video, idx) => ({
            id: -(idx + 1), // Unique negative ID for keying
            slug: `newly-uploaded-${idx}`,
            title: video.title,
            summary: video.description || "Just uploaded",
            cover_image_url: video.coverImage,
            feature_video_url: video.url,
            published_at: new Date().toISOString(),
            likes_count: 0,
            author: "Nderu Gathoni",
            reading_time: video.duration,
            // Keep reference to original video data for click handler
            _original: video
        }));

        if (activeTab === "articles") {
            const articles = posts.filter(p =>
                (p.category?.toLowerCase() === 'article' || !p.feature_video_url) &&
                (p.title.toLowerCase().includes(queryLower) || (p.category || "").toLowerCase().includes(queryLower))
            );
            return (
                <SectionRow
                    title="All Articles"
                    items={articles}
                    renderItem={(post, idx) => <VideoCard key={`article-${post.id}`} post={post} index={idx} onVideoClick={onVideoClick} />}
                />
            );
        }

        if (activeTab === "videos") {
            const videos = posts.filter(p =>
                (p.feature_video_url || p.category?.toLowerCase() === 'video' || p.category?.toLowerCase() === 'release') &&
                (p.title.toLowerCase().includes(queryLower) || (p.category || "").toLowerCase().includes(queryLower))
            );
            return (
                <SectionRow
                    title="All Videos & Releases"
                    showPlayAll
                    items={videos}
                    renderItem={(post, idx) => <VideoCard key={`video-${post.id}`} post={post} index={idx} onVideoClick={onVideoClick} />}
                />
            );
        }

        if (activeTab === "posts") {
            const updates = posts.filter(p =>
                p.category?.toLowerCase() === 'post' || p.category?.toLowerCase() === 'update'
            );
            return (
                <SectionRow
                    title="Community Posts"
                    items={updates.length > 0 ? updates : filteredPosts.slice(0, 10)}
                    renderItem={(post, idx) => <VideoCard key={`post-${post.id}`} post={post} index={idx} onVideoClick={onVideoClick} />}
                />
            );
        }

        // Default "HOME" view
        const forYou = filteredPosts.slice(0, 8);
        const musicVideos = filteredPosts
            .filter(p => p.category?.toLowerCase() === 'music' || p.category?.toLowerCase() === 'release')
            .concat(filteredPosts.slice(4, 12))
            .slice(0, 10);
        const latestUpdates = filteredPosts.slice(0, 15);
        const categories = Array.from(new Set(filteredPosts.map(p => p.category).filter(Boolean))) as string[];

        return (
            <>
                {uploadedPosts.length > 0 && (activeTab === "home" || activeTab === "videos") && (
                    <SectionRow
                        title="Newly Uploaded"
                        items={uploadedPosts}
                        renderItem={(post, idx) => (
                            <VideoCard
                                key={`uploaded-${post.id}`}
                                post={post}
                                index={idx}
                                onVideoClick={onVideoClick}
                            />
                        )}
                    />
                )}

                <SectionRow
                    title="For you"
                    items={forYou}
                    renderItem={(post, idx) => (
                        <VideoCard key={`foryou-${post.id}`} post={post} index={idx} onVideoClick={onVideoClick} />
                    )}
                />

                <SectionRow
                    title="Music videos"
                    showPlayAll
                    icon={
                        <div className="h-full w-full rounded-full bg-red-600 flex items-center justify-center p-1.5">
                            <Play className="h-5 w-5 text-white fill-white" />
                        </div>
                    }
                    items={musicVideos}
                    renderItem={(post, idx) => (
                        <VideoCard key={`music-${post.id}`} post={post} index={idx} onVideoClick={onVideoClick} />
                    )}
                />

                <SectionRow
                    title="Latest Updates"
                    items={latestUpdates}
                    renderItem={(post, idx) => (
                        <VideoCard key={`latest-${post.id}`} post={post} index={idx} onVideoClick={onVideoClick} />
                    )}
                />

                {categories.map(cat => {
                    const catPosts = posts.filter(p => p.category === cat);
                    if (catPosts.length < 2) return null;
                    return (
                        <SectionRow
                            key={`cat-${cat}`}
                            title={cat}
                            items={catPosts}
                            renderItem={(post, idx) => (
                                <VideoCard key={`cat-${cat}-${post.id}`} post={post} index={idx} onVideoClick={onVideoClick} />
                            )}
                        />
                    );
                })}
            </>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={cn("bg-[#0f0f0f] min-h-screen pt-0 pb-20", className)}
        >
            <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 space-y-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {getTabContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
