import React from "react";
import { MoreVertical, Play, Clock, User, Eye, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface VideoArticle {
    id: number;
    title: string;
    summary: string | null;
    author?: string;
    published_at: string | null;
    cover_image_url: string | null;
    feature_video_url: string | null;
    reading_time?: string | null;
    category?: string;
}

export const VideoArticleCard = ({ article }: { article: VideoArticle }) => {
    return (
        <div className="group flex flex-col md:flex-row gap-4 py-6 border-b border-border/40 hover:bg-muted/30 transition-colors px-4 rounded-lg">
            {/* Thumbnail on the left */}
            <div className="relative w-full md:w-[360px] aspect-video flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                {article.cover_image_url ? (
                    <img
                        src={article.cover_image_url}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Play className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                )}

                {/* Duration/Video Badge */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[0.7rem] font-medium text-white shadow-sm">
                    <Play size={10} fill="currentColor" />
                    <span>Featured</span>
                </div>
            </div>

            {/* Content on the right */}
            <div className="flex flex-1 flex-col">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-bold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                    </h3>
                    <button className="p-1 hover:bg-muted rounded-full transition-colors">
                        <MoreVertical className="h-5 w-5 text-muted-foreground" />
                    </button>
                </div>

                {/* Metadata Row */}
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground font-medium">
                    <span>{article.author || "Nderu.ke"}</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                    <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{article.published_at ? new Date(article.published_at).toLocaleDateString() : 'Recent'}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed max-w-3xl">
                    {article.summary || "No description provided for this featured video. Click to watch the full update and insights."}
                </p>

                {/* Tags/Category */}
                {article.category && (
                    <div className="mt-auto pt-4">
                        <Badge variant="secondary" className="text-[10px] uppercase tracking-wider rounded-none px-2 py-0">
                            {article.category}
                        </Badge>
                    </div>
                )}
            </div>
        </div>
    );
};

export const VideoArticlesList = ({ articles }: { articles: VideoArticle[] }) => {
    if (!articles.length) return null;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
                <div className="size-1.5 bg-primary rounded-full animate-pulse" />
                Featured Broadcasts
            </h2>
            <div className="flex flex-col">
                {articles.map((article) => (
                    <VideoArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
};
