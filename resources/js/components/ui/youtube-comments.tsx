import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare,
    ThumbsUp,
    ThumbsDown,
    MoreVertical,
    Type,
    Send,
    Flag,
    Ban,
    Trash2
} from "lucide-react";

export interface Comment {
    id: number | string;
    author_name: string;
    author_email?: string | null;
    body: string;
    created_at?: string | null;
    timestamp?: string; // For compatibility
    likes?: number;
}

interface YoutubeCommentsProps {
    comments: Comment[];
    className?: string;
    onCommentSubmit?: (comment: { author_name: string; author_email: string; body: string }) => void;
    showInput?: boolean;
}

export function YoutubeComments({ comments: initialComments, className, onCommentSubmit, showInput = true }: YoutubeCommentsProps) {
    const [comments, setComments] = React.useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = React.useState("");
    const [userEmail, setUserEmail] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [isCommenting, setIsCommenting] = React.useState(false);
    const [activeMenuCommentId, setActiveMenuCommentId] = React.useState<number | string | null>(null);
    const [likedComments, setLikedComments] = React.useState<Set<number | string>>(new Set());
    const [dislikedComments, setDislikedComments] = React.useState<Set<number | string>>(new Set());
    const [activeReplyId, setActiveReplyId] = React.useState<number | string | null>(null);
    const [replyText, setReplyText] = React.useState("");
    const menuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenuCommentId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Update local state when props change
    React.useEffect(() => {
        setComments(initialComments);
    }, [initialComments]);

    const handlePostComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !userEmail.trim()) return;

        const newCommentObj: Comment = {
            id: Date.now(),
            author_name: userName.trim() || userEmail.split('@')[0],
            author_email: userEmail.trim(),
            body: newComment.trim(),
            created_at: new Date().toISOString(),
            likes: 0
        };

        setComments([newCommentObj, ...comments]);
        onCommentSubmit?.({
            author_name: newCommentObj.author_name,
            author_email: newCommentObj.author_email || "",
            body: newCommentObj.body
        });

        setNewComment("");
        setIsCommenting(false);
    };

    const getDisplayDate = (dateStr?: string | null) => {
        if (!dateStr) return "Just now";
        try {
            const date = new Date(dateStr);
            const now = new Date();
            const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

            if (diffInSeconds < 60) return "Just now";
            if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
            if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
            if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }).format(date);
        } catch (e) {
            return "Recently";
        }
    };

    const handleLike = (commentId: number | string) => {
        setComments(prevComments => prevComments.map(comment => {
            if (comment.id === commentId) {
                const wasLiked = likedComments.has(commentId);
                const wasDisliked = dislikedComments.has(commentId);

                const newLikes = wasLiked
                    ? (comment.likes || 0) - 1
                    : wasDisliked
                        ? (comment.likes || 0) + 2
                        : (comment.likes || 0) + 1;

                return { ...comment, likes: Math.max(0, newLikes) };
            }
            return comment;
        }));

        setLikedComments(prev => {
            const newSet = new Set(prev);
            if (newSet.has(commentId)) {
                newSet.delete(commentId);
            } else {
                newSet.add(commentId);
            }
            return newSet;
        });

        if (dislikedComments.has(commentId)) {
            setDislikedComments(prev => {
                const newSet = new Set(prev);
                newSet.delete(commentId);
                return newSet;
            });
        }
    };

    const handleDislike = (commentId: number | string) => {
        setComments(prevComments => prevComments.map(comment => {
            if (comment.id === commentId) {
                const wasLiked = likedComments.has(commentId);
                const wasDisliked = dislikedComments.has(commentId);

                const newLikes = wasDisliked
                    ? (comment.likes || 0) + 1
                    : wasLiked
                        ? (comment.likes || 0) - 2
                        : (comment.likes || 0) - 1;

                return { ...comment, likes: Math.max(0, newLikes) };
            }
            return comment;
        }));

        setDislikedComments(prev => {
            const newSet = new Set(prev);
            if (newSet.has(commentId)) {
                newSet.delete(commentId);
            } else {
                newSet.add(commentId);
            }
            return newSet;
        });

        if (likedComments.has(commentId)) {
            setLikedComments(prev => {
                const newSet = new Set(prev);
                newSet.delete(commentId);
                return newSet;
            });
        }
    };

    const handleReply = (commentId: number | string) => {
        setActiveReplyId(activeReplyId === commentId ? null : commentId);
        setReplyText("");
    };

    const handlePostReply = (e: React.FormEvent, commentId: number | string) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        // Here you would typically submit the reply to your backend
        console.log('Reply to comment', commentId, ':', replyText);

        setReplyText("");
        setActiveReplyId(null);
    };

    return (
        <div className={cn("text-white space-y-6", className)}>
            <div className="flex items-center gap-6 mb-6">
                <h3 className="text-xl font-bold">{comments.length} Comments</h3>
                <button className="flex items-center gap-2 text-sm font-bold hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">
                    <MessageSquare className="h-5 w-5" />
                    <span>Sort by</span>
                </button>
            </div>

            {/* Comment Input */}
            {showInput && (
                <div className="flex gap-4 group mb-8">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shrink-0 shadow-lg">
                        <span className="text-sm font-bold text-white uppercase">{userEmail ? userEmail[0] : '?'}</span>
                    </div>
                    <div className="flex-1 space-y-4">
                        <form onSubmit={handlePostComment} className="space-y-3">
                            <div className="relative">
                                <textarea
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onFocus={() => setIsCommenting(true)}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="w-full bg-transparent border-b border-white/20 focus:border-white focus:outline-none transition-all py-1 resize-none text-[15px] placeholder-white/40 min-h-[40px]"
                                />
                            </div>

                            <AnimatePresence>
                                {isCommenting && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden space-y-4"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="relative group">
                                                <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 group-focus-within:text-red-500 transition-colors" />
                                                <input
                                                    type="text"
                                                    placeholder="Your Name (optional)"
                                                    value={userName}
                                                    onChange={(e) => setUserName(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-red-500 outline-none transition-all text-white"
                                                />
                                            </div>
                                            <div className="relative group">
                                                <Send className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 group-focus-within:text-red-500 transition-colors" />
                                                <input
                                                    type="email"
                                                    placeholder="Your Real Email (required)"
                                                    value={userEmail}
                                                    required
                                                    onChange={(e) => setUserEmail(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-red-500 outline-none transition-all text-white"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-3">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsCommenting(false);
                                                    setNewComment("");
                                                }}
                                                className="px-4 py-2 hover:bg-white/10 rounded-full text-sm font-bold transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={!newComment.trim() || !userEmail.trim()}
                                                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-white/10 disabled:text-white/40 rounded-full text-sm font-bold transition-all active:scale-95"
                                            >
                                                Comment
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 group">
                        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white font-bold uppercase">
                            {comment.author_name ? comment.author_name[0] : '?'}
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[13px] font-bold text-white">{comment.author_name}</span>
                                <span className="text-[12px] text-[#aaaaaa]">{getDisplayDate(comment.created_at || comment.timestamp)}</span>
                            </div>
                            <p className="text-[14px] leading-relaxed text-[#f1f1f1] whitespace-pre-wrap">{comment.body}</p>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 mt-2">
                                <button
                                    onClick={() => handleLike(comment.id)}
                                    className={cn(
                                        "flex items-center gap-1.5 p-1.5 -ml-1.5 hover:bg-white/10 rounded-full transition-colors group/like",
                                        likedComments.has(comment.id) && "bg-blue-500/20"
                                    )}
                                >
                                    <ThumbsUp className={cn(
                                        "h-3.5 w-3.5 transition-colors",
                                        likedComments.has(comment.id) ? "text-blue-500 fill-blue-500" : "text-white/70 group-hover/like:text-white"
                                    )} />
                                    <span className={cn(
                                        "text-xs",
                                        likedComments.has(comment.id) ? "text-blue-500" : "text-[#aaaaaa]"
                                    )}>{comment.likes || 0}</span>
                                </button>
                                <button
                                    onClick={() => handleDislike(comment.id)}
                                    className={cn(
                                        "p-1.5 hover:bg-white/10 rounded-full transition-colors group/dislike",
                                        dislikedComments.has(comment.id) && "bg-blue-500/20"
                                    )}
                                >
                                    <ThumbsDown className={cn(
                                        "h-3.5 w-3.5 transition-colors",
                                        dislikedComments.has(comment.id) ? "text-blue-500 fill-blue-500" : "text-white/70 group-hover/dislike:text-white"
                                    )} />
                                </button>
                                <button
                                    onClick={() => handleReply(comment.id)}
                                    className="ml-2 text-xs font-bold text-[#aaaaaa] hover:text-white px-3 py-1.5 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    Reply
                                </button>
                            </div>

                            {/* Reply Input */}
                            <AnimatePresence>
                                {activeReplyId === comment.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-4 ml-0"
                                    >
                                        <form onSubmit={(e) => handlePostReply(e, comment.id)} className="flex gap-3">
                                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shrink-0">
                                                <span className="text-xs font-bold text-white uppercase">{userEmail ? userEmail[0] : '?'}</span>
                                            </div>
                                            <div className="flex-1 space-y-3">
                                                <textarea
                                                    placeholder="Add a reply..."
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    className="w-full bg-transparent border-b border-white/20 focus:border-white focus:outline-none transition-all py-1 resize-none text-sm placeholder-white/40 min-h-[32px]"
                                                    rows={1}
                                                />
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setActiveReplyId(null)}
                                                        className="px-3 py-1.5 hover:bg-white/10 rounded-full text-xs font-bold transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={!replyText.trim()}
                                                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-white/10 disabled:text-white/40 rounded-full text-xs font-bold transition-all"
                                                    >
                                                        Reply
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="relative">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenuCommentId(activeMenuCommentId === comment.id ? null : comment.id);
                                }}
                                className={cn("p-2 hover:bg-white/10 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity", activeMenuCommentId === comment.id && "opacity-100 bg-white/10")}
                            >
                                <MoreVertical className="h-4 w-4 rotate-90" />
                            </button>
                            <AnimatePresence>
                                {activeMenuCommentId === comment.id && (
                                    <motion.div
                                        ref={menuRef}
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                        className="absolute top-full right-0 mt-1 w-48 bg-[#1f1f1f] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 py-2"
                                    >
                                        <button onClick={() => setActiveMenuCommentId(null)} className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-white/10 transition-colors text-sm text-left">
                                            <Flag className="h-4 w-4" />
                                            <span>Report</span>
                                        </button>
                                        <button onClick={() => setActiveMenuCommentId(null)} className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-white/10 transition-colors text-sm text-left">
                                            <Ban className="h-4 w-4" />
                                            <span>Block user</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
