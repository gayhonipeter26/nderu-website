import * as React from "react";
import { cn } from "@/lib/utils";
import { Play, ChevronRight, ThumbsUp, MessageSquare, Share2, MoreVertical } from "lucide-react";

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
}

interface YoutubeContentSectionsProps {
    posts: Post[];
    className?: string;
}

export function YoutubeContentSections({ posts, className }: YoutubeContentSectionsProps) {
    const videoPosts = posts.filter(p => p.feature_video_url);
    const articlePosts = posts.filter(p => !p.feature_video_url);

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

    const VideoCard = ({ post }: { post: Post }) => (
        <div className="flex-none w-[280px] md:w-[320px] group cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-3">
                <img
                    src={post.cover_image_url || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=400"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                    3:20
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/60 rounded-full p-3">
                        <Play className="h-6 w-6 text-white fill-white" />
                    </div>
                </div>
            </div>
            <div className="flex gap-3">
                <div className="flex-1">
                    <h3 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-foreground/80">
                        {post.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        {post.likes_count || Math.floor(Math.random() * 1000)}k views • {formatTimeAgo(post.published_at)}
                    </p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1">
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </button>
            </div>
        </div>
    );

    const ReleaseCard = ({ post }: { post: Post }) => (
        <div className="flex-none w-[160px] md:w-[180px] group cursor-pointer">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-2">
                <img
                    src={post.cover_image_url || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=400"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Play className="h-3 w-3" />
                    1 article
                </div>
            </div>
            <h3 className="font-medium text-sm line-clamp-2 mb-0.5">
                {post.title}
            </h3>
            <p className="text-xs text-muted-foreground">
                {post.category || "Article"}
            </p>
        </div>
    );

    const PostCard = ({ post }: { post: Post }) => (
        <div className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <span className="text-sm font-medium">NN</span>
                </div>
                <div className="flex-1">
                    <p className="text-sm font-medium">Nderu News • {formatTimeAgo(post.published_at)}</p>
                </div>
                <button>
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </button>
            </div>

            <p className="text-sm mb-3">{post.summary || post.title}</p>

            {post.cover_image_url && (
                <div className="rounded-lg overflow-hidden mb-3">
                    <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full aspect-video object-cover"
                    />
                </div>
            )}

            <div className="flex items-center gap-4 text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-xs">{post.likes_count || 22}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-xs">7</span>
                </button>
                <button className="flex items-center gap-1 hover:text-foreground transition-colors ml-auto">
                    <Share2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );

    return (
        <div className={cn("bg-background", className)}>
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-12">
                {/* Featured Articles Section */}
                {videoPosts.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-semibold">Featured Articles</h2>
                                <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                                    Play all
                                    <Play className="h-4 w-4" />
                                </button>
                            </div>
                            <button className="text-sm hover:text-foreground flex items-center gap-1">
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {videoPosts.slice(0, 6).map(post => (
                                <VideoCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Releases Section */}
                {articlePosts.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Latest Releases</h2>
                            <button className="text-sm hover:text-foreground flex items-center gap-1">
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {articlePosts.slice(0, 8).map(post => (
                                <ReleaseCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Posts Section */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">Posts</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                        {posts.slice(0, 4).map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
