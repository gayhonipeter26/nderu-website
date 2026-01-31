import * as React from "react";
import { cn } from "@/lib/utils";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Settings,
    ChevronLeft,
    ThumbsUp,
    ThumbsDown,
    Share2,
    Download,
    MoreHorizontal,
    CheckCircle2,
    Check,
    ChevronRight,
    RotateCcw,
    Gauge,
    Monitor,
    SkipForward,
    SkipBack,
    Captions,
    Square,
    PictureInPicture,
    Info,
    X as CloseIcon,
    Volume1,
    ListPlus,
    FileText,
    Flag,
    BarChart2,
    Type,
    Send,
    MessageSquare,
    Sparkles,
    Search,
    Mic,
    Video,
    Bell,
    User,
    Menu,
    RefreshCw,
    ChevronUp,
    ChevronDown,
    Upload,
    Music,
    AlertCircle,
    Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Comment {
    id: string;
    author: string;
    email: string;
    text: string;
    timestamp: string;
    likes: number;
    dislikes?: number;
    isLiked?: boolean;
    isDisliked?: boolean;
    replies?: Comment[];
}

interface YoutubeVideoPlayerProps {
    video: {
        title: string;
        url: string;
        author?: string;
        subscribers?: string;
        description?: string;
        links?: string[];
    };
    onClose: () => void;
    onCreateClick?: () => void;
    recommendations?: any[];
    uploadedVideos?: any[];
}

export function YoutubeVideoPlayer({
    video,
    onClose,
    onCreateClick,
    recommendations = [],
    uploadedVideos = []
}: YoutubeVideoPlayerProps) {
    const [isPlaying, setIsPlaying] = React.useState(true);
    const [isMuted, setIsMuted] = React.useState(false);
    const [volume, setVolume] = React.useState(1);
    const [progress, setProgress] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [showSettings, setShowSettings] = React.useState(false);
    const [playbackSpeed, setPlaybackSpeed] = React.useState(1);
    const [isLooping, setIsLooping] = React.useState(false);
    const [quality, setQuality] = React.useState("1080p");
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const [isTheaterMode, setIsTheaterMode] = React.useState(false);
    const [showCaptions, setShowCaptions] = React.useState(false);
    const [menuView, setMenuView] = React.useState<"main" | "speed" | "quality">("main");
    const [hoverProgress, setHoverProgress] = React.useState<number | null>(null);
    const [hoverTime, setHoverTime] = React.useState<string | null>(null);
    const [isLiked, setIsLiked] = React.useState(false);
    const [isDisliked, setIsDisliked] = React.useState(false);
    const [showCopied, setShowCopied] = React.useState(false);
    const [animationType, setAnimationType] = React.useState<"play" | "pause" | null>(null);
    const [showMoreMenu, setShowMoreMenu] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [showControls, setShowControls] = React.useState(true);
    const [isAutoplayEnabled, setIsAutoplayEnabled] = React.useState(true);
    const [showEndScreen, setShowEndScreen] = React.useState(false);
    const [autoplayCountdown, setAutoplayCountdown] = React.useState(8);
    const [itemToRemove, setItemToRemove] = React.useState<any | null>(null);
    const [showStatsForNerds, setShowStatsForNerds] = React.useState(false);
    const [showTranscript, setShowTranscript] = React.useState(false);
    const [showSavedToast, setShowSavedToast] = React.useState(false);
    const [isBuffering, setIsBuffering] = React.useState(false);

    React.useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleWaiting = () => setIsBuffering(true);
        const handlePlaying = () => setIsBuffering(false);
        const handleCanPlay = () => setIsBuffering(false);

        video.addEventListener('waiting', handleWaiting);
        video.addEventListener('playing', handlePlaying);
        video.addEventListener('canplay', handleCanPlay);

        return () => {
            video.removeEventListener('waiting', handleWaiting);
            video.removeEventListener('playing', handlePlaying);
            video.removeEventListener('canplay', handleCanPlay);
        };
    }, []);

    const controlsTimeoutRef = React.useRef<any>(null);

    // Mix State
    const [mixItems, setMixItems] = React.useState<any[]>(() => {
        const initialItem = {
            id: 'current',
            title: video.title,
            channel: video.author || "Nderu Gathoni",
            duration: "Playing Now",
            thumbnail: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200",
            url: video.url,
            isActive: true
        };

        if (uploadedVideos && uploadedVideos.length > 0) {
            return [
                initialItem,
                ...uploadedVideos.map((v, i) => ({
                    id: `uploaded-${i}`,
                    title: v.title,
                    channel: v.author || "Nderu Gathoni",
                    duration: v.duration || "Uploaded",
                    thumbnail: v.coverImage || "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=200",
                    url: v.url,
                    isActive: false
                }))
            ];
        }

        // Fallback to initial + some from recommendations if available
        const recs = (recommendations || []).slice(0, 5).map((r, i) => ({
            id: `rec-${i}`,
            title: r.title,
            channel: r.author || "Nderu Gathoni",
            duration: r.reading_time || "4:20",
            thumbnail: r.cover_image_url || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200",
            url: r.feature_video_url || video.url,
            isActive: false
        }));

        return [initialItem, ...recs];
    });
    const [currentVideo, setCurrentVideo] = React.useState(video);

    // Comments & Description State
    const [isDescriptionExpanded, setIsDescriptionExpanded] = React.useState(false);
    const [comments, setComments] = React.useState<Comment[]>([
        { id: '1', author: 'Alex Rivera', email: 'alex@example.com', text: 'This tutorial is exactly what I needed! The cinematic shots are incredible. Great work, Nderu! 🔥', timestamp: '2 hours ago', likes: 242, dislikes: 2, replies: [] },
        {
            id: '2', author: 'Sarah Chen', email: 'sarah.c@tech.io', text: 'Love the attention to detail on the UI here. Can you share more about the tech stack used?', timestamp: '5 hours ago', likes: 85, dislikes: 0, replies: [
                { id: 'reply-1', author: 'Nderu Gathoni', email: 'nderu@ke.com', text: 'Thanks Sarah! The stack is Next.js, Framer Motion for animations, and Tailwind for styling. Glad you like it!', timestamp: '3 hours ago', likes: 12 }
            ]
        },
        { id: '3', author: 'Marcus Wright', email: 'marcus@lens.com', text: 'Stunning visuals. The lighting in that opening sequence is just perfect.', timestamp: '1 day ago', likes: 12, dislikes: 0, replies: [] },
    ]);
    const [newComment, setNewComment] = React.useState("");
    const [replyingTo, setReplyingTo] = React.useState<string | null>(null);
    const [replyText, setReplyText] = React.useState("");
    const [userEmail, setUserEmail] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [isCommenting, setIsCommenting] = React.useState(false);

    const videoRef = React.useRef<HTMLVideoElement>(null);
    const animationTimeoutRef = React.useRef<any>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const settingsRef = React.useRef<HTMLDivElement>(null);
    const moreMenuRef = React.useRef<HTMLDivElement>(null);
    const progressBarRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        document.body.style.overflow = "hidden";

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isPlaying) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isPlaying]);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

            switch (e.key.toLowerCase()) {
                case 'k':
                case ' ':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'f':
                    toggleFullScreen();
                    break;
                case 't':
                    toggleTheaterMode();
                    break;
                case 'i':
                    handlePiP();
                    break;
                case 'm':
                    setIsMuted(!isMuted);
                    break;
                case 'j':
                    skipBackward();
                    break;
                case 'l':
                    skipForward();
                    break;
                case 'n':
                    handleNext();
                    break;
                case 'p':
                    handlePrev();
                    break;
                case 'c':
                    setShowCaptions(!showCaptions);
                    break;
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setShowSettings(false);
                setMenuView("main");
            }
            if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
                setShowMoreMenu(false);
            }
        };

        const handleFullscreenChange = () => {
            const isFull = !!document.fullscreenElement;
            setIsFullscreen(isFull);
            if (!isFull) {
                setIsTheaterMode(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, [isPlaying, isMuted, showCaptions, isFullscreen, isTheaterMode]);

    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playbackSpeed;
            videoRef.current.loop = isLooping;
            videoRef.current.muted = isMuted;
            videoRef.current.volume = volume;
        }
    }, [playbackSpeed, isLooping, isMuted, volume]);

    const resetControlsTimer = React.useCallback(() => {
        setShowControls(true);
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);

        if (isTheaterMode || isFullscreen) {
            controlsTimeoutRef.current = setTimeout(() => {
                if (isPlaying && !showSettings && !showMoreMenu) {
                    setShowControls(false);
                }
            }, 5000);
        }
    }, [isTheaterMode, isFullscreen, isPlaying, showSettings, showMoreMenu]);

    React.useEffect(() => {
        if (isTheaterMode || isFullscreen) {
            resetControlsTimer();
        } else {
            setShowControls(true);
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        }
        return () => {
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        };
    }, [isTheaterMode, isFullscreen, resetControlsTimer]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setAnimationType("pause");
            } else {
                videoRef.current.play();
                setAnimationType("play");
            }
            setIsPlaying(!isPlaying);

            if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
            animationTimeoutRef.current = setTimeout(() => setAnimationType(null), 500);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const total = videoRef.current.duration;
            setCurrentTime(current);
            setProgress((current / total) * 100);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (progressBarRef.current && videoRef.current) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            videoRef.current.currentTime = pos * videoRef.current.duration;
        }
    };

    const handleProgressBarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (progressBarRef.current) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            setHoverProgress(pos * 100);
            setHoverTime(formatTime(pos * duration));
        }
    };

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const handlePiP = async () => {
        try {
            if (videoRef.current && videoRef.current !== document.pictureInPictureElement) {
                await videoRef.current.requestPictureInPicture();
            } else if (document.exitPictureInPicture) {
                await document.exitPictureInPicture();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const toggleTheaterMode = () => setIsTheaterMode(!isTheaterMode);

    const handleNext = () => {
        const currentIndex = mixItems.findIndex(item => item.url === currentVideo.url);
        if (currentIndex !== -1 && currentIndex < mixItems.length - 1) {
            handleSelectMixItem(mixItems[currentIndex + 1]);
        }
    };

    const handlePrev = () => {
        const currentIndex = mixItems.findIndex(item => item.url === currentVideo.url);
        if (currentIndex !== -1 && currentIndex > 0) {
            handleSelectMixItem(mixItems[currentIndex - 1]);
        }
    };

    const skipForward = () => {
        if (videoRef.current) videoRef.current.currentTime = Math.min(duration, currentTime + 10);
    };

    const skipBackward = () => {
        if (videoRef.current) videoRef.current.currentTime = Math.max(0, currentTime - 10);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: video.title,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
        }
    };

    const handleReload = () => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setIsPlaying(true);
        }
        setShowSettings(false);
    };

    const handleNextItem = React.useCallback(() => {
        const currentIndex = mixItems.findIndex(item => item.url === currentVideo.url);
        if (currentIndex !== -1 && currentIndex < mixItems.length - 1) {
            const nextItem = mixItems[currentIndex + 1];
            setCurrentVideo({
                title: nextItem.title,
                url: nextItem.url,
                author: nextItem.channel,
                description: nextItem.description || video.description,
                links: nextItem.links || video.links,
                subscribers: video.subscribers
            });
            // Update active state in mix
            setMixItems(items => items.map((item, idx) => ({
                ...item,
                isActive: idx === currentIndex + 1
            })));

            // Reset state
            setCurrentTime(0);
            setProgress(0);
            setIsPlaying(true);
            containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [mixItems, currentVideo, video]);

    const handleVideoEnded = () => {
        setShowEndScreen(true);
        setIsPlaying(false);
        if (isAutoplayEnabled) {
            setAutoplayCountdown(8);
        }
    };

    const nextVideoItem = React.useMemo(() => {
        const currentIndex = mixItems.findIndex(item => item.url === currentVideo.url);
        if (currentIndex !== -1 && currentIndex < mixItems.length - 1) {
            return mixItems[currentIndex + 1];
        }
        return recommendations?.[0] || null;
    }, [mixItems, currentVideo, recommendations]);

    React.useEffect(() => {
        let timer: any;
        if (showEndScreen && isAutoplayEnabled && autoplayCountdown > 0) {
            timer = setInterval(() => {
                setAutoplayCountdown(prev => prev - 1);
            }, 1000);
        } else if (showEndScreen && isAutoplayEnabled && autoplayCountdown === 0) {
            if (nextVideoItem) {
                handleSelectMixItem(nextVideoItem);
                setShowEndScreen(false);
            }
        }
        return () => clearInterval(timer);
    }, [showEndScreen, isAutoplayEnabled, autoplayCountdown, nextVideoItem]);

    const handleSelectMixItem = (item: any) => {
        setCurrentVideo({
            title: item.title,
            url: item.url,
            author: item.channel || item.author,
            description: item.description || video.description,
            links: item.links || video.links,
            subscribers: item.subscribers || video.subscribers
        });

        // Update active state in mix
        setMixItems(items => items.map(mix => ({
            ...mix,
            isActive: mix.id === item.id
        })));

        // Reset state
        setCurrentTime(0);
        setProgress(0);
        setIsPlaying(true);
        setShowEndScreen(false);
        containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleRemoveMixItem = (id: string) => {
        const item = mixItems.find(item => item.id === id);
        if (item) setItemToRemove(item);
    };

    const confirmRemove = () => {
        if (itemToRemove) {
            setMixItems(prev => prev.filter(item => item.id !== itemToRemove.id));
            setItemToRemove(null);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const uploadPromises = files.map(async (file) => {
            // Validation: Max 10 items
            if (mixItems.length >= 10) {
                alert("Maximum 10 items allowed in the mix.");
                return null;
            }

            // Validation: Max 200MB
            if (file.size > 200 * 1024 * 1024) {
                alert(`File ${file.name} exceeds 200MB limit.`);
                return null;
            }

            // Get duration
            return new Promise<any>((resolve) => {
                const element = document.createElement(file.type.startsWith('audio') ? 'audio' : 'video');
                element.preload = 'metadata';
                element.onloadedmetadata = () => {
                    window.URL.revokeObjectURL(element.src);
                    const durationInSeconds = element.duration;

                    // Validation: Max 10 minutes
                    if (durationInSeconds > 600) {
                        alert(`File ${file.name} is longer than 10 minutes. Please upload shorter content (Max 10m).`);
                        resolve(null);
                        return;
                    }

                    const minutes = Math.floor(durationInSeconds / 60);
                    const seconds = Math.floor(durationInSeconds % 60);

                    resolve({
                        id: Math.random().toString(36).substr(2, 9),
                        title: file.name.split('.')[0],
                        channel: "User Upload",
                        duration: `${minutes}:${seconds.toString().padStart(2, '0')}`,
                        thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=200",
                        url: URL.createObjectURL(file),
                        type: file.type.startsWith('audio') ? 'audio' : 'video'
                    });
                };
                element.src = URL.createObjectURL(file);
            });
        });

        const newEntries = (await Promise.all(uploadPromises)).filter(entry => entry !== null);
        setMixItems(prev => [...prev, ...newEntries]);
    };

    const handlePostComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !userEmail.trim()) return;

        const comment: Comment = {
            id: Date.now().toString(),
            author: userName.trim() || userEmail.split('@')[0],
            email: userEmail.trim(),
            text: newComment.trim(),
            timestamp: "Just now",
            likes: 0,
            dislikes: 0,
            replies: []
        };

        setComments([comment, ...comments]);
        setNewComment("");
        setIsCommenting(false);
    };

    const handleCommentLike = (commentId: string) => {
        const updateReplies = (replies: Comment[]): Comment[] => {
            return replies.map(reply => {
                if (reply.id === commentId) {
                    const isLiked = !reply.isLiked;
                    return {
                        ...reply,
                        isLiked,
                        isDisliked: false,
                        likes: isLiked ? reply.likes + 1 : reply.likes - 1,
                        dislikes: reply.isDisliked ? (reply.dislikes || 0) - 1 : (reply.dislikes || 0)
                    };
                }
                if (reply.replies) {
                    return { ...reply, replies: updateReplies(reply.replies) };
                }
                return reply;
            });
        };

        setComments(prev => prev.map(comment => {
            if (comment.id === commentId) {
                const isLiked = !comment.isLiked;
                return {
                    ...comment,
                    isLiked,
                    isDisliked: false,
                    likes: isLiked ? comment.likes + 1 : comment.likes - 1,
                    dislikes: comment.isDisliked ? (comment.dislikes || 0) - 1 : (comment.dislikes || 0)
                };
            }
            if (comment.replies) {
                return { ...comment, replies: updateReplies(comment.replies) };
            }
            return comment;
        }));
    };

    const handleCommentDislike = (commentId: string) => {
        const updateReplies = (replies: Comment[]): Comment[] => {
            return replies.map(reply => {
                if (reply.id === commentId) {
                    const isDisliked = !reply.isDisliked;
                    return {
                        ...reply,
                        isDisliked,
                        isLiked: false,
                        dislikes: isDisliked ? (reply.dislikes || 0) + 1 : (reply.dislikes || 0) - 1,
                        likes: reply.isLiked ? reply.likes - 1 : reply.likes
                    };
                }
                if (reply.replies) {
                    return { ...reply, replies: updateReplies(reply.replies) };
                }
                return reply;
            });
        };

        setComments(prev => prev.map(comment => {
            if (comment.id === commentId) {
                const isDisliked = !comment.isDisliked;
                return {
                    ...comment,
                    isDisliked,
                    isLiked: false,
                    dislikes: isDisliked ? (comment.dislikes || 0) + 1 : (comment.dislikes || 0) - 1,
                    likes: comment.isLiked ? comment.likes - 1 : comment.likes
                };
            }
            if (comment.replies) {
                return { ...comment, replies: updateReplies(comment.replies) };
            }
            return comment;
        }));
    };

    const handlePostReply = (parentId: string) => {
        if (!replyText.trim() || !userEmail.trim()) return;

        const reply: Comment = {
            id: `reply-${Date.now()}`,
            author: userName.trim() || userEmail.split('@')[0],
            email: userEmail.trim(),
            text: replyText.trim(),
            timestamp: "Just now",
            likes: 0,
            dislikes: 0,
            replies: []
        };

        const addReply = (comments: Comment[]): Comment[] => {
            return comments.map(comment => {
                if (comment.id === parentId) {
                    return {
                        ...comment,
                        replies: [reply, ...(comment.replies || [])]
                    };
                }
                if (comment.replies) {
                    return { ...comment, replies: addReply(comment.replies) };
                }
                return comment;
            });
        };

        setComments(prev => addReply(prev));
        setReplyText("");
        setReplyingTo(null);
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "fixed inset-0 z-[100] bg-[#0f0f0f] overflow-y-auto scrollbar-hide flex flex-col",
                isFullscreen && "overflow-hidden"
            )}
        >
            {/* YouTube-Style Top Navigation Bar (Integrated in Player) */}
            {!isFullscreen && (
                <header className="sticky top-0 z-[150] w-full bg-[#0f0f0f] md:bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/5 h-14 md:h-16 shrink-0 transition-colors">
                    <div className="flex items-center justify-between h-full px-4 md:px-6">
                        <div className="flex items-center gap-2 md:gap-4">
                            <button className="p-2 hover:bg-white/10 rounded-full transition-colors hidden md:block">
                                <Menu className="h-6 w-6 text-white" />
                            </button>
                            <div className="flex items-center gap-3">
                                <div
                                    onClick={onClose}
                                    className="flex items-center gap-2 cursor-pointer group"
                                    title="Back to Blogs"
                                >
                                    <ChevronLeft className="h-6 w-6 text-white group-hover:text-white transition-colors" />
                                </div>
                                <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity group md:hidden">
                                    <Home className="h-4 w-4 md:h-5 md:w-5 text-white/90 group-hover:text-white transition-colors" />
                                    <span className="text-lg md:text-xl font-bold tracking-tighter text-white">Home</span>
                                </a>
                                <span className="text-white/20 font-light hidden sm:inline md:hidden">|</span>
                                <span className="text-xl font-bold tracking-tighter text-white/70 hidden sm:block">Blogs</span>
                            </div>
                        </div>

                        {/* Center: Search Bar & Mic */}
                        <div className="hidden md:flex flex-1 max-w-[720px] items-center gap-3 px-10">
                            <div className="flex flex-1 items-center">
                                <div className="relative flex-1 group">
                                    <input
                                        type="text"
                                        placeholder="Search cinematic articles..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-10 px-4 bg-[#121212] border border-white/10 rounded-l-full text-[15px] focus:outline-none focus:border-blue-500 transition-all font-medium placeholder-white/40"
                                    />
                                    <button className="absolute right-0 top-0 h-10 px-5 bg-white/5 border border-l-0 border-white/10 rounded-r-full hover:bg-white/10 transition-colors">
                                        <Search className="h-4 w-4 text-white/70" />
                                    </button>
                                </div>
                            </div>
                            <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                                <Mic className="h-5 w-5 text-white" />
                            </button>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 md:gap-4">
                            <button
                                onClick={onCreateClick}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <Video className="h-5 w-5 md:h-6 md:w-6 text-white" />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <Bell className="h-5 w-5 md:h-6 md:w-6 text-white" />
                            </button>
                            <Avatar className="h-7 w-7 md:h-8 md:w-8 ring-2 ring-white/10 hover:ring-red-600 transition-all cursor-pointer">
                                <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=Nderu" />
                                <AvatarFallback className="bg-red-600 text-white text-xs font-bold">N</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>
            )}

            {/* Mobile Search Overlay Sub-header */}
            <div className="md:hidden px-4 py-2 bg-[#0f0f0f] border-b border-white/5 sticky top-14 z-[140] flex items-center gap-3">
                <div className="h-9 flex-1 flex items-center bg-[#1f1f1f] border border-white/10 rounded-full px-3">
                    <Search className="h-4 w-4 text-white/50 mr-2.5" />
                    <span className="text-sm text-white/50 font-medium">Search content...</span>
                </div>
                <button className="p-2.5 bg-[#1f1f1f] border border-white/10 hover:bg-white/10 rounded-full transition-colors shrink-0">
                    <Mic className="h-4 w-4 text-white" />
                </button>
                <button
                    onClick={onCreateClick}
                    className="p-2.5 bg-[#1f1f1f] border border-white/10 hover:bg-white/10 rounded-full transition-colors shrink-0"
                >
                    <Video className="h-4 w-4 text-white" />
                </button>
                <Avatar className="h-9 w-9 ring-1 ring-white/10 shrink-0">
                    <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=Nderu" />
                    <AvatarFallback className="bg-red-600 text-white text-xs font-bold">N</AvatarFallback>
                </Avatar>
            </div>

            {/* Stable Layout Wrapper */}
            <div className={cn(
                "w-full transition-all duration-500",
                isTheaterMode ? "max-w-none" : "max-w-7xl mx-auto md:px-6 md:py-8",
                isFullscreen && "max-w-none px-0 py-0"
            )}>
                <div
                    className={cn(
                        "grid gap-x-6",
                        isTheaterMode || isFullscreen ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-[1fr_400px]"
                    )}
                    style={{
                        gridTemplateAreas: isTheaterMode || isFullscreen
                            ? '"video" "content"'
                            : '"video sidebar" "info sidebar"',
                        gridTemplateRows: 'auto auto'
                    }}
                >
                    {/* VIDEO PLAYER */}
                    <div
                        className={cn(
                            "transition-all duration-500",
                            isFullscreen ? "fixed inset-0 z-[200] bg-black" : (isTheaterMode ? "w-full bg-black mb-6" : "rounded-xl overflow-hidden shadow-2xl mb-6")
                        )}
                        style={{ gridArea: 'video' }}
                    >
                        <div
                            onMouseMove={resetControlsTimer}
                            className={cn(
                                "relative w-full bg-black group transition-all duration-500 flex items-center justify-center",
                                isFullscreen ? "h-screen" : (isTheaterMode ? "aspect-[21/9] min-h-[500px] max-h-[85vh]" : "aspect-video"),
                                !showControls && (isTheaterMode || isFullscreen) && "cursor-none"
                            )}
                        >
                            <video
                                ref={videoRef}
                                key={currentVideo.url}
                                src={currentVideo.url}
                                autoPlay
                                className="w-full h-full"
                                onClick={togglePlay}
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                                onEnded={handleVideoEnded}
                            />

                            {/* Buffering Loader */}
                            {isBuffering && (
                                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none">
                                    <div className="relative h-16 w-16">
                                        <svg className="animate-spin h-full w-full text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                </div>
                            )}

                            {/* End Screen Overlay */}
                            <AnimatePresence>
                                {showEndScreen && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-6"
                                    >
                                        <div className="max-w-md w-full">
                                            {isAutoplayEnabled && nextVideoItem ? (
                                                <div className="space-y-6">
                                                    <p className="text-[#aaaaaa] text-sm font-bold uppercase tracking-widest">Up Next in {autoplayCountdown}s</p>

                                                    <div className="relative group cursor-pointer" onClick={() => { handleSelectMixItem(nextVideoItem); setShowEndScreen(false); }}>
                                                        <div className="aspect-video w-full rounded-2xl overflow-hidden ring-2 ring-white/10 group-hover:ring-red-600 transition-all shadow-2xl">
                                                            <img
                                                                src={nextVideoItem.thumbnail || nextVideoItem.cover_image_url || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400"}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                                alt="Next"
                                                            />
                                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Play className="h-12 w-12 text-white fill-current" />
                                                            </div>
                                                        </div>
                                                        <div className="mt-4">
                                                            <h3 className="text-white font-bold text-xl line-clamp-2">{nextVideoItem.title}</h3>
                                                            <p className="text-[#aaaaaa] text-sm mt-1">{nextVideoItem.channel || nextVideoItem.author || "Nderu Gathoni"}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-center gap-4 pt-4">
                                                        <button
                                                            onClick={() => setShowEndScreen(false)}
                                                            className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-bold transition-all"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={() => { handleSelectMixItem(nextVideoItem); setShowEndScreen(false); }}
                                                            className="flex items-center gap-2 px-8 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-bold transition-all shadow-lg shadow-red-600/20"
                                                        >
                                                            Play Now
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-6">
                                                    <div className="flex justify-center">
                                                        <div
                                                            onClick={() => {
                                                                if (videoRef.current) {
                                                                    videoRef.current.currentTime = 0;
                                                                    videoRef.current.play();
                                                                    setIsPlaying(true);
                                                                    setShowEndScreen(false);
                                                                }
                                                            }}
                                                            className="h-20 w-20 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 group"
                                                        >
                                                            <RotateCcw className="h-10 w-10 text-white group-hover:rotate-[-45deg] transition-transform" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-bold text-2xl">Want to watch again?</h3>
                                                        <p className="text-[#aaaaaa] mt-2">The video has ended. Click above to replay.</p>
                                                    </div>
                                                    <div className="flex justify-center gap-3">
                                                        {recommendations?.slice(0, 2).map((rec, i) => (
                                                            <div
                                                                key={i}
                                                                onClick={() => { handleSelectMixItem(rec); setShowEndScreen(false); }}
                                                                className="w-40 aspect-video rounded-lg overflow-hidden relative cursor-pointer group"
                                                            >
                                                                <img src={rec.cover_image_url || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <Play className="h-6 w-6 text-white fill-current" />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {animationType && (
                                    <motion.div
                                        key={animationType}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1.2 }}
                                        exit={{ opacity: 0, scale: 1.5 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                                    >
                                        <div className="bg-black/40 backdrop-blur-sm p-8 rounded-full">
                                            {animationType === "play" ? (
                                                <Play className="h-16 w-16 text-white fill-current" />
                                            ) : (
                                                <Pause className="h-16 w-16 text-white fill-current" />
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {showCaptions && (
                                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none">
                                    <span className="bg-black/80 text-white px-3 py-1.5 rounded-md text-xl font-medium shadow-2xl">
                                        [Music Playing: Captions active for {currentVideo.title}]
                                    </span>
                                </div>
                            )}

                            {/* Stats for Nerds Overlay */}
                            <AnimatePresence>
                                {showStatsForNerds && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="absolute top-4 right-4 z-[60] bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-4 text-[11px] font-mono text-white space-y-1 w-64 shadow-2xl"
                                    >
                                        <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1">
                                            <span className="font-bold text-red-500">Stats for nerds</span>
                                            <button onClick={() => setShowStatsForNerds(false)} className="hover:text-red-500"><CloseIcon className="h-3 w-3" /></button>
                                        </div>
                                        <div className="flex justify-between"><span>Video ID / sCPN</span><span className="text-[#aaaaaa] truncate ml-2">{Math.random().toString(36).substring(7)} / {Math.random().toString(36).substring(7)}</span></div>
                                        <div className="flex justify-between"><span>Viewport / Frames</span><span>{videoRef.current?.clientWidth}x{videoRef.current?.clientHeight} / 0 dropped</span></div>
                                        <div className="flex justify-between"><span>Current / Opt Res</span><span>{quality} / {quality}</span></div>
                                        <div className="flex justify-between"><span>Codecs</span><span className="text-[#aaaaaa]">avc1.640028 / mp4a.40.2</span></div>
                                        <div className="flex justify-between"><span>Connection Speed</span><span className="text-green-500">84201 Kbps</span></div>
                                        <div className="flex justify-between"><span>Network Activity</span><span>0 KB</span></div>
                                        <div className="flex justify-between"><span>Buffer Health</span><span className="text-blue-500">24.50 s</span></div>
                                        <div className="flex justify-between"><span>Live Latency</span><span>-</span></div>
                                        <div className="flex justify-between"><span>Volume / Normalized</span><span>{Math.round(volume * 100)}% / {Math.round(volume * 100)}%</span></div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className={cn(
                                "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-500 z-30",
                                showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
                                !showControls && (isTheaterMode || isFullscreen) && "hidden"
                            )}>
                                <div
                                    ref={progressBarRef}
                                    onClick={handleSeek}
                                    onMouseMove={handleProgressBarMouseMove}
                                    onMouseLeave={() => setHoverProgress(null)}
                                    className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer relative group/progress transition-all hover:h-2 flex items-center"
                                >
                                    {hoverProgress !== null && (
                                        <>
                                            <div
                                                className="absolute bottom-full mb-3 px-2 py-1 bg-black/80 backdrop-blur-md text-white text-xs font-bold rounded border border-white/10 shadow-xl pointer-events-none -translate-x-1/2 z-50"
                                                style={{ left: `${hoverProgress}%` }}
                                            >
                                                {hoverTime}
                                            </div>
                                            <div
                                                className="absolute top-0 h-full bg-white/30 pointer-events-none rounded-full"
                                                style={{ width: `${hoverProgress}%` }}
                                            />
                                        </>
                                    )}
                                    <div className="absolute top-0 left-0 h-full bg-red-600 rounded-full z-10" style={{ width: `${progress}%` }} />
                                    <div className="absolute h-4 w-4 bg-red-600 rounded-full shadow-lg z-20 opacity-0 group-hover/progress:opacity-100 transition-opacity -translate-x-1/2" style={{ left: `${progress}%` }} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 md:gap-4">
                                        <div className="flex items-center gap-1">
                                            <button onClick={handlePrev} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors hidden md:flex"><SkipBack className="h-5 w-5 fill-current" /></button>
                                            <button onClick={togglePlay} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">{isPlaying ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 fill-current" />}</button>
                                            <button onClick={handleNext} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"><SkipForward className="h-5 w-5 fill-current" /></button>
                                        </div>
                                        <div className="flex items-center gap-2 group/volume relative">
                                            <button onClick={() => setIsMuted(!isMuted)} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">{isMuted || volume === 0 ? <VolumeX className="h-6 w-6" /> : volume < 0.5 ? <Volume1 className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}</button>
                                            <div className="w-0 group-hover/volume:w-24 overflow-hidden transition-all duration-300 flex items-center h-8">
                                                <input type="range" min="0" max="1" step="0.1" value={isMuted ? 0 : volume} onChange={(e) => { const newVol = parseFloat(e.target.value); setVolume(newVol); if (newVol > 0) setIsMuted(false); else setIsMuted(true); }} className="w-20 h-1 accent-white bg-white/30 rounded-full cursor-pointer appearance-none outline-none" />
                                            </div>
                                        </div>
                                        <span className="text-white text-[13px] font-medium ml-2 tabular-nums">{formatTime(currentTime)} / {formatTime(duration)}</span>
                                    </div>

                                    <div className="flex items-center gap-1 md:gap-3 relative">
                                        <button onClick={() => setShowCaptions(!showCaptions)} className={cn("p-2 rounded-lg transition-all relative overflow-hidden", showCaptions ? "text-red-600" : "text-white hover:bg-white/10")} title="Subtitles/Closed Captions (c)"><Captions className="h-5 w-5" />{showCaptions && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-red-600 rounded-full" />}</button>
                                        <div className="relative" ref={settingsRef}>
                                            <button onClick={() => { setShowSettings(!showSettings); setMenuView("main"); }} className={cn("p-2 rounded-lg transition-transform", showSettings ? "rotate-45 text-red-600" : "text-white hover:bg-white/10 hover:rotate-45")}><Settings className="h-5 w-5" /></button>
                                            <AnimatePresence>{showSettings && (
                                                <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute bottom-full right-0 mb-4 w-64 bg-[#1f1f1f]/f5 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-[110]">
                                                    {menuView === "main" && (
                                                        <div className="py-2">
                                                            <button onClick={() => setMenuView("speed")} className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/10 transition-colors"><div className="flex items-center gap-3"><Gauge className="h-4 w-4" /><span className="text-sm">Playback speed</span></div><div className="flex items-center gap-1 text-xs text-[#aaaaaa]"><span>{playbackSpeed === 1 ? "Normal" : `${playbackSpeed}x`}</span><ChevronRight className="h-4 w-4" /></div></button>
                                                            <button onClick={() => setIsAutoplayEnabled(!isAutoplayEnabled)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/10 transition-colors">
                                                                <div className="flex items-center gap-3">
                                                                    <Play className={cn("h-4 w-4", isAutoplayEnabled && "text-red-600 fill-current")} />
                                                                    <span className="text-sm">Autoplay</span>
                                                                </div>
                                                                <div className={cn("text-xs font-bold", isAutoplayEnabled ? "text-red-600" : "text-[#aaaaaa]")}>
                                                                    {isAutoplayEnabled ? "On" : "Off"}
                                                                </div>
                                                            </button>
                                                            <button onClick={() => setIsLooping(!isLooping)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/10 transition-colors"><div className="flex items-center gap-3"><RotateCcw className="h-4 w-4" /><span className="text-sm">Loop video</span></div><div className={cn("text-xs font-bold", isLooping ? "text-red-600" : "text-[#aaaaaa]")}>{isLooping ? "On" : "Off"}</div></button>
                                                            <button onClick={handleReload} className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/10 transition-colors"><div className="flex items-center gap-3"><RefreshCw className="h-4 w-4" /><span className="text-sm">Reload video</span></div></button>
                                                            <button onClick={() => setMenuView("quality")} className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/10 transition-colors"><div className="flex items-center gap-3"><Monitor className="h-4 w-4" /><span className="text-sm">Quality</span></div><div className="flex items-center gap-1 text-xs text-[#aaaaaa]"><span>{quality}</span><ChevronRight className="h-4 w-4" /></div></button>
                                                        </div>
                                                    )}
                                                    {(menuView === "speed" || menuView === "quality") && (
                                                        <div className="py-2">
                                                            <button onClick={() => setMenuView("main")} className="w-full px-4 py-2 border-b border-white/5 flex items-center gap-3 hover:bg-white/5"><ChevronLeft className="h-4 w-4" /><span className="text-sm font-bold">{menuView === "speed" ? "Playback speed" : "Quality"}</span></button>
                                                            <div className="max-h-64 overflow-y-auto scrollbar-hide">{(menuView === "speed" ? [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] : ["1080p", "720p", "480p", "360p", "Auto"]).map((val) => (<button key={val} onClick={() => { if (menuView === "speed") setPlaybackSpeed(val as number); else setQuality(val as string); setShowSettings(false); setMenuView("main"); }} className="w-full px-4 py-2 text-left text-sm hover:bg-white/10 flex items-center justify-between">{val === 1 ? "Normal" : `${val}${menuView === "speed" ? "x" : ""}`}{(menuView === "speed" ? playbackSpeed === val : quality === val) && <Check className="h-4 w-4 text-red-600" />}</button>))}</div>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}</AnimatePresence>
                                        </div>
                                        <button onClick={handlePiP} className="p-2 text-white hover:bg-white/10 rounded-lg hidden md:flex" title="Miniplayer (i)"><PictureInPicture className="h-5 w-5" /></button>
                                        <button onClick={toggleTheaterMode} className={cn("p-2 rounded-lg hidden md:flex", isTheaterMode ? "text-red-600" : "text-white hover:bg-white/10")} title="Theater mode (t)"><Square className="h-5 w-5" /></button>
                                        <button onClick={toggleFullScreen} className="p-2 text-white hover:bg-white/10 rounded-lg" title="Full screen (f)"><Maximize className={cn("h-5 w-5 transition-colors", isFullscreen && "text-red-600")} /></button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* INFO & COMMENTS AREA */}
                    <div
                        className={cn(
                            "transition-all duration-300",
                            isTheaterMode ? "max-w-[1700px] mx-auto w-full px-4 md:px-6" : "w-full"
                        )}
                        style={{ gridArea: isTheaterMode || isFullscreen ? 'content' : 'info' }}
                    >
                        {!isFullscreen && (
                            <div className={cn(
                                "flex flex-col gap-6",
                                isTheaterMode ? "lg:flex-row" : "flex-col"
                            )}>
                                <div className="flex-1 min-w-0 space-y-6">
                                    {/* Video Title & Actions */}
                                    <div className="space-y-4">
                                        <h1 className="text-xl md:text-2xl font-bold text-white line-clamp-2">{currentVideo.title}</h1>
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                                            <div className="flex items-center justify-between md:justify-start gap-4 flex-1">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-muted overflow-hidden ring-2 ring-red-600">
                                                        <img src="https://api.dicebear.com/7.x/initials/svg?seed=Nderu" alt="Avatar" className="w-full h-full" />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-1">
                                                            <p className="font-bold text-white text-[15px]">{currentVideo.author || "Nderu Gathoni"}</p>
                                                            <CheckCircle2 className="h-3.5 w-3.5 fill-[#aaaaaa] text-[#0f0f0f]" />
                                                        </div>
                                                        <p className="text-[12px] text-[#aaaaaa]">{currentVideo.subscribers || video.subscribers || "7.2k subscribers"}</p>
                                                    </div>
                                                </div>
                                                <Button className="rounded-full bg-white text-black hover:bg-[#e6e6e6] font-bold px-6 h-9 md:h-10 text-sm md:ml-4 transition-all hover:scale-105 active:scale-95">Subscribe</Button>
                                            </div>
                                            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                                                <div className="flex items-center bg-white/10 rounded-full overflow-hidden shrink-0">
                                                    <button onClick={() => { setIsLiked(!isLiked); if (!isLiked) setIsDisliked(false); }} className={cn("flex items-center gap-2 px-4 py-2 hover:bg-white/10 transition-colors border-r border-white/5", isLiked && "text-white font-bold")}>
                                                        <ThumbsUp className={cn("h-5 w-5", isLiked && "fill-current")} />
                                                        <span className="text-sm font-medium">{isLiked ? '8.1k' : '8k'}</span>
                                                    </button>
                                                    <button onClick={() => { setIsDisliked(!isDisliked); if (!isDisliked) setIsLiked(false); }} className={cn("px-4 py-2 hover:bg-white/10 transition-colors", isDisliked && "text-white font-bold")}>
                                                        <ThumbsDown className={cn("h-5 w-5", isDisliked && "fill-current")} />
                                                    </button>
                                                </div>
                                                <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors shrink-0 relative overflow-hidden">
                                                    <Share2 className="h-5 w-5" />
                                                    <span className="text-sm font-medium">Share</span>
                                                    {showCopied && <div className="absolute inset-0 bg-red-600 text-white flex items-center justify-center text-[10px] uppercase font-bold">Link Copied</div>}
                                                    {showSavedToast && <div className="absolute inset-0 bg-green-600 text-white flex items-center justify-center text-[10px] uppercase font-bold">Saved to Playlist</div>}
                                                </button>
                                                <div className="relative" ref={moreMenuRef}>
                                                    <button onClick={() => setShowMoreMenu(!showMoreMenu)} className={cn("p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors shrink-0", showMoreMenu && "bg-white/20")}><MoreHorizontal className="h-5 w-5" /></button>
                                                    <AnimatePresence>{showMoreMenu && (
                                                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="absolute bottom-full right-0 mb-2 w-56 bg-[#1f1f1f] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-[120]">
                                                            <div className="py-2">
                                                                <button
                                                                    onClick={() => {
                                                                        setShowSavedToast(true);
                                                                        setShowMoreMenu(false);
                                                                        setTimeout(() => setShowSavedToast(false), 2000);
                                                                    }}
                                                                    className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-white/10 transition-colors text-sm"
                                                                >
                                                                    <ListPlus className="h-4 w-4" />
                                                                    <span>Save to playlist</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setShowTranscript(!showTranscript);
                                                                        setShowMoreMenu(false);
                                                                    }}
                                                                    className={cn(
                                                                        "w-full px-4 py-2.5 flex items-center gap-3 hover:bg-white/10 transition-colors text-sm",
                                                                        showTranscript && "text-red-500"
                                                                    )}
                                                                >
                                                                    <FileText className="h-4 w-4" />
                                                                    <span>{showTranscript ? "Close transcript" : "Open transcript"}</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        alert("Thank you for your report. Our team will review this content.");
                                                                        setShowMoreMenu(false);
                                                                    }}
                                                                    className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-white/10 transition-colors text-sm"
                                                                >
                                                                    <Flag className="h-4 w-4" />
                                                                    <span>Report</span>
                                                                </button>
                                                                <div className="h-px bg-white/10 my-1 mx-2" />
                                                                <button
                                                                    onClick={() => {
                                                                        setShowStatsForNerds(!showStatsForNerds);
                                                                        setShowMoreMenu(false);
                                                                    }}
                                                                    className={cn(
                                                                        "w-full px-4 py-2.5 flex items-center gap-3 hover:bg-white/10 transition-colors text-sm",
                                                                        showStatsForNerds && "text-red-500"
                                                                    )}
                                                                >
                                                                    <BarChart2 className="h-4 w-4" />
                                                                    <span>Stats for nerds</span>
                                                                </button>
                                                            </div>
                                                        </motion.div>
                                                    )}</AnimatePresence>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description Area */}
                                    <div className="bg-white/5 hover:bg-white/10 transition-all rounded-xl p-4 text-sm leading-relaxed group/desc relative">
                                        <div className="font-bold flex gap-3 mb-2"><span>1,245 views</span><span>Published Jan 30, 2026</span><span className="text-red-500">#nderu #cinematic #creative</span></div>
                                        <div className={cn(
                                            "space-y-4 overflow-hidden transition-all duration-300",
                                            !isDescriptionExpanded ? "max-h-20" : "max-h-[1000px]"
                                        )}>
                                            <p className="text-[#f1f1f1] whitespace-pre-wrap">{currentVideo.description || video.description || `Welcome back! In this video, we dive deep into the production process for "${currentVideo.title}". \n\nWe cover everything from initial concept to the final color grade. Huge thanks to everyone who supported this project. \n\nDon't forget to like and subscribe for more content like this!`}</p>
                                            {currentVideo.links && currentVideo.links.length > 0 && (
                                                <div className="space-y-2 pt-4 border-t border-white/10">
                                                    <p className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2"><Sparkles className="h-3 w-3 text-red-500" /> Featured Links</p>
                                                    <div className="flex flex-col gap-2">{currentVideo.links.map((link, idx) => (<a key={idx} href={link.startsWith('http') ? link : `https://${link}`} target="_blank" rel="noopener noreferrer" className="text-red-500 font-medium hover:underline flex items-center gap-2 shrink-0">{link}</a>))}</div>
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                            className="mt-4 font-bold text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors border border-white/5"
                                        >
                                            {isDescriptionExpanded ? "Show less" : "Show more"}
                                        </button>
                                    </div>

                                    {/* Transcript Extension */}
                                    <AnimatePresence>
                                        {showTranscript && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-2 space-y-4">
                                                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                                        <h3 className="text-lg font-bold text-white">Transcript</h3>
                                                        <button onClick={() => setShowTranscript(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors"><CloseIcon className="h-5 w-5" /></button>
                                                    </div>
                                                    <div className="max-h-96 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent space-y-4">
                                                        {[
                                                            { time: "0:00", text: "Welcome back to the channel, everyone." },
                                                            { time: "0:15", text: "Today we're exploring the cinematic world of production." },
                                                            { time: "0:45", text: "You can see the lighting setup here is quite complex." },
                                                            { time: "1:20", text: "We're using a three-point lighting system with a high-key vibe." },
                                                            { time: "2:10", text: "Let's move on to the color grading process in DaVinci Resolve." },
                                                            { time: "3:05", text: "Notice how the shadows are being lifted just a touch." },
                                                            { time: "3:45", text: "Thank you for watching this advanced breakdown." }
                                                        ].map((item, i) => (
                                                            <div key={i} className="flex gap-4 group cursor-pointer p-2 hover:bg-white/5 rounded-lg transition-colors">
                                                                <span className="text-red-500 font-mono text-sm shrink-0">{item.time}</span>
                                                                <p className="text-white/80 group-hover:text-white transition-colors">{item.text}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* MIXER / SIDEBAR CONTENT (Theater or Mobile) */}
                                    <div className={cn(
                                        "w-full space-y-3",
                                        isTheaterMode ? "block" : "block lg:hidden"
                                    )}>
                                        <SidebarContent
                                            mixItems={mixItems}
                                            onSelectItem={handleSelectMixItem}
                                            onUpload={handleFileUpload}
                                            recommendations={recommendations}
                                            onRemoveItem={handleRemoveMixItem}
                                        />
                                    </div>

                                    {/* Comments Section */}
                                    <div className="pt-4 space-y-8 pb-10">
                                        <div className="flex items-center gap-6">
                                            <h3 className="text-xl font-bold text-white">{comments.length} Comments</h3>
                                            <button className="flex items-center gap-2 text-sm font-bold hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">
                                                <MessageSquare className="h-5 w-5" />
                                                <span>Sort by</span>
                                            </button>
                                        </div>

                                        {/* New Comment Input */}
                                        <div className="flex gap-4 group">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shrink-0 shadow-lg">
                                                <span className="text-sm font-bold text-white">{userEmail ? userEmail[0].toUpperCase() : '?'}</span>
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
                                                                            placeholder="Your Name"
                                                                            value={userName}
                                                                            onChange={(e) => setUserName(e.target.value)}
                                                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-red-500 outline-none transition-all"
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
                                                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-red-500 outline-none transition-all"
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

                                        {/* Comments List */}
                                        <div className="space-y-6">
                                            {comments.map((comment) => (
                                                <CommentItem
                                                    key={comment.id}
                                                    comment={comment}
                                                    onLike={() => handleCommentLike(comment.id)}
                                                    onDislike={() => handleCommentDislike(comment.id)}
                                                    onReply={() => setReplyingTo(comment.id)}
                                                    isReplying={replyingTo === comment.id}
                                                    replyText={replyText}
                                                    onReplyTextChange={setReplyText}
                                                    onCancelReply={() => setReplyingTo(null)}
                                                    onSubmitReply={() => handlePostReply(comment.id)}
                                                    userName={userName}
                                                    userEmail={userEmail}
                                                    onLikeReply={handleCommentLike}
                                                    onDislikeReply={handleCommentDislike}
                                                    onReplyReply={setReplyingTo}
                                                    activeReplyId={replyingTo}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>

                    {/* GLOBAL SIDEBAR */}
                    {!isTheaterMode && !isFullscreen && (
                        <div
                            className="hidden lg:block w-[400px] shrink-0 space-y-3 py-0"
                            style={{ gridArea: 'sidebar' }}
                        >
                            <SidebarContent
                                mixItems={mixItems}
                                onSelectItem={handleSelectMixItem}
                                onUpload={handleFileUpload}
                                recommendations={recommendations}
                                onRemoveItem={handleRemoveMixItem}
                            />
                        </div>
                    )}
                </div>
            </div>


            {/* Custom Remove Confirmation Dialog */}
            <AnimatePresence>
                {itemToRemove && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-[#1e1e1e] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4"
                        >
                            <div className="flex items-center gap-3 text-red-500">
                                <AlertCircle className="h-6 w-6" />
                                <h3 className="text-lg font-bold text-white">Remove from mix?</h3>
                            </div>
                            <p className="text-[#aaaaaa] text-sm leading-relaxed">
                                Are you sure you want to remove <span className="text-white font-bold">"{itemToRemove.title}"</span> from your current playlist?
                            </p>
                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    onClick={() => setItemToRemove(null)}
                                    className="px-4 py-2 hover:bg-white/10 rounded-full text-sm font-bold transition-colors text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmRemove}
                                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-bold transition-all active:scale-95 shadow-lg shadow-red-600/20"
                                >
                                    Remove
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function CommentItem({
    comment,
    onLike,
    onDislike,
    onReply,
    isReplying,
    replyText,
    onReplyTextChange,
    onCancelReply,
    onSubmitReply,
    userName,
    userEmail,
    level = 0,
    onLikeReply,
    onDislikeReply,
    onReplyReply,
    activeReplyId
}: {
    comment: Comment;
    onLike: () => void;
    onDislike: () => void;
    onReply: () => void;
    isReplying: boolean;
    replyText: string;
    onReplyTextChange: (val: string) => void;
    onCancelReply: () => void;
    onSubmitReply: () => void;
    userName: string;
    userEmail: string;
    level?: number;
    onLikeReply: (id: string) => void;
    onDislikeReply: (id: string) => void;
    onReplyReply: (id: string) => void;
    activeReplyId: string | null;
}) {
    const [showReplies, setShowReplies] = React.useState(true);

    return (
        <div className={cn("space-y-4", level > 0 && "mt-4 ml-6 pl-4 border-l border-white/5")}>
            <div className="flex gap-4 group">
                <div className={cn(
                    "rounded-full bg-white/5 overflow-hidden shrink-0 ring-1 ring-white/10",
                    level > 0 ? "h-8 w-8" : "h-10 w-10"
                )}>
                    <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.author}`} alt="Avatar" />
                </div>
                <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-white">@{comment.author.toLowerCase().replace(/\s+/g, '')}</span>
                        <span className="text-[12px] text-[#aaaaaa]">{comment.timestamp}</span>
                    </div>
                    <p className={cn("leading-relaxed text-[#f1f1f1]", level > 0 ? "text-[13px]" : "text-[14px]")}>{comment.text}</p>
                    <div className="flex items-center gap-4 pt-1">
                        <div
                            onClick={onLike}
                            className="flex items-center gap-1 group/like cursor-pointer"
                        >
                            <ThumbsUp className={cn(
                                "h-4 w-4 transition-colors",
                                comment.isLiked ? "text-red-500 fill-red-500" : "text-white/60 group-hover/like:text-white"
                            )} />
                            {comment.likes > 0 && <span className="text-xs text-[#aaaaaa]">{comment.likes}</span>}
                        </div>
                        <div
                            onClick={onDislike}
                            className="cursor-pointer group/dislike"
                        >
                            <ThumbsDown className={cn(
                                "h-4 w-4 transition-colors",
                                comment.isDisliked ? "text-red-500 fill-red-500" : "text-white/60 group-hover/dislike:text-white"
                            )} />
                        </div>
                        <button
                            onClick={onReply}
                            className="text-xs font-bold text-white/60 hover:bg-white/10 px-2 py-1 rounded-full transition-colors"
                        >
                            Reply
                        </button>
                    </div>

                    {isReplying && (
                        <div className="mt-4 flex gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="h-8 w-8 rounded-full bg-red-600/10 flex items-center justify-center shrink-0">
                                <span className="text-[10px] font-bold text-red-500">{userEmail ? userEmail[0].toUpperCase() : '?'}</span>
                            </div>
                            <div className="flex-1 space-y-3">
                                <textarea
                                    autoFocus
                                    placeholder="Add a reply..."
                                    value={replyText}
                                    onChange={(e) => onReplyTextChange(e.target.value)}
                                    className="w-full bg-transparent border-b border-white/20 focus:border-white focus:outline-none transition-all py-1 resize-none text-[14px] placeholder-white/40 min-h-[30px]"
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={onCancelReply}
                                        className="px-3 py-1.5 hover:bg-white/10 rounded-full text-xs font-bold transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={onSubmitReply}
                                        disabled={!replyText.trim() || !userEmail.trim()}
                                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-white/10 disabled:text-white/40 rounded-full text-xs font-bold transition-all active:scale-95"
                                    >
                                        Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {comment.replies && comment.replies.length > 0 && (
                <div className="ml-10">
                    <button
                        onClick={() => setShowReplies(!showReplies)}
                        className="flex items-center gap-2 text-red-500 hover:bg-red-500/10 px-3 py-1 rounded-full transition-colors text-xs font-bold mb-2 ml-4"
                    >
                        {showReplies ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        {showReplies ? 'Hide' : 'Show'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                    </button>

                    {showReplies && (
                        <div className="space-y-4 animate-in fade-in duration-500">
                            {comment.replies.map(reply => (
                                <CommentItem
                                    key={reply.id}
                                    comment={reply}
                                    level={level + 1}
                                    onLike={() => onLikeReply(reply.id)}
                                    onDislike={() => onDislikeReply(reply.id)}
                                    onReply={() => onReplyReply(reply.id)}
                                    isReplying={activeReplyId === reply.id}
                                    replyText={replyText}
                                    onReplyTextChange={onReplyTextChange}
                                    onCancelReply={onCancelReply}
                                    onSubmitReply={() => onSubmitReply()}
                                    userName={userName}
                                    userEmail={userEmail}
                                    onLikeReply={onLikeReply}
                                    onDislikeReply={onDislikeReply}
                                    onReplyReply={onReplyReply}
                                    activeReplyId={activeReplyId}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function SidebarContent({
    mixItems,
    onSelectItem,
    onUpload,
    recommendations = [],
    onRemoveItem
}: {
    mixItems: any[],
    onSelectItem: (item: any) => void,
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void,
    recommendations?: any[],
    onRemoveItem: (id: string) => void
}) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [showRequestForm, setShowRequestForm] = React.useState(false);
    const [activeChip, setActiveChip] = React.useState("All");
    const chipsContainerRef = React.useRef<HTMLDivElement>(null);

    const scrollChips = (direction: 'left' | 'right') => {
        if (chipsContainerRef.current) {
            const scrollAmount = 200;
            chipsContainerRef.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const filteredRecommendations = React.useMemo(() => {
        if (activeChip === "All") return recommendations;
        return recommendations.filter(post => {
            const cat = post.category?.toLowerCase() || "";
            const title = post.title?.toLowerCase() || "";
            const chip = activeChip.toLowerCase();
            return cat.includes(chip) || title.includes(chip);
        });
    }, [activeChip, recommendations]);

    return (
        <div className="flex flex-col gap-6">
            {/* YouTube Mix Section */}
            <div className="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden flex flex-col max-h-[600px] shadow-2xl group/mix">
                {/* Mix Header */}
                <div className="p-4 border-b border-white/10 bg-[#1e1e1e]/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex items-start justify-between mb-1">
                        <div className="flex-1 min-w-0 pr-4">
                            <h2 className="text-sm font-bold text-white line-clamp-1">Mix - Cinematic Production, Creative, Tech...</h2>
                            <p className="text-[11px] text-[#aaaaaa] mt-0.5">Mixes are playlists YouTube makes for you</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="video/*,audio/*"
                                onChange={onUpload}
                                multiple
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="p-1.5 hover:bg-red-600/20 rounded-full transition-all group/upload bg-white/5 border border-white/10"
                                title="Upload to Mix (Max 10m, Max 200MB)"
                            >
                                <Upload className="h-4 w-4 text-white group-hover/upload:text-red-500 transition-colors" />
                            </button>
                            <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                                <MoreHorizontal className="h-4 w-4 text-white/70" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mix Top Arrow */}
                <div className="flex justify-center p-1 bg-[#0f0f0f] border-b border-white/5">
                    <ChevronUp className="h-4 w-4 text-[#aaaaaa]" />
                </div>

                {/* Mix Items List */}
                <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex-1">
                    {mixItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => onSelectItem(item)}
                            className={cn(
                                "flex items-center gap-3 p-2 group cursor-pointer transition-all relative",
                                item.isActive ? "bg-white/10" : "hover:bg-white/5"
                            )}
                        >
                            {/* Track Indicator (Only for active) */}
                            {item.isActive && (
                                <div className="absolute left-1 flex items-center">
                                    <div className="flex gap-0.5 items-end h-3 mb-0.5">
                                        <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-0.5 bg-red-600" />
                                        <motion.div animate={{ height: [12, 4, 12] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-0.5 bg-red-600" />
                                        <motion.div animate={{ height: [8, 12, 8] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-0.5 bg-red-600" />
                                    </div>
                                </div>
                            )}

                            {/* Thumbnail */}
                            <div className={cn(
                                "relative rounded-md overflow-hidden shrink-0",
                                item.isActive ? "ml-4 w-28 aspect-video" : "ml-4 w-24 aspect-video"
                            )}>
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Play className="h-6 w-6 text-white fill-current" />
                                </div>
                                <div className="absolute bottom-1 right-1 px-1 bg-black/80 text-[10px] font-bold text-white rounded">
                                    {item.duration}
                                </div>
                                {item.type === 'audio' && (
                                    <div className="absolute top-1 left-1 p-1 bg-red-600 rounded">
                                        <Music className="h-3 w-3 text-white" />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0 pr-2">
                                <h3 className={cn(
                                    "text-[13px] font-bold line-clamp-2 leading-snug",
                                    item.isActive ? "text-red-500" : "text-white/90 group-hover:text-white"
                                )}>
                                    {item.title}
                                </h3>
                                <p className="text-[11px] text-[#aaaaaa] mt-1 font-medium group-hover:text-white/70">
                                    {item.channel}
                                </p>
                            </div>

                            {/* Options Menu (Visible on Hover) */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity pr-1">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemoveItem(item.id);
                                    }}
                                    className="p-1.5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all active:scale-90"
                                    title="Remove from mix"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {mixItems.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                            <AlertCircle className="h-8 w-8 text-white/20 mb-2" />
                            <p className="text-xs text-[#aaaaaa]">Your mix is empty. Upload videos or audio to get started!</p>
                        </div>
                    )}
                </div>

                {/* Mix Bottom Arrow */}
                <div className="flex justify-center p-1 bg-[#0f0f0f] border-t border-white/5">
                    <ChevronDown className="h-4 w-4 text-[#aaaaaa]" />
                </div>
            </div>

            {/* Constraints Info */}
            <div className="p-3 bg-red-600/5 border border-red-600/20 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-red-500 font-bold text-[10px] uppercase tracking-widest">
                    <Info className="h-3 w-3" />
                    Upload Rules
                </div>
                <ul className="text-[11px] text-[#aaaaaa] space-y-1 list-disc pl-4">
                    <li>Maximum duration: 10 minutes</li>
                    <li>Maximum size: 200MB</li>
                    <li>Maximum items in mix: 10</li>
                </ul>
            </div>

            {/* Filter Chips Container */}
            <div className="flex items-center gap-2 relative group-chips">
                <div
                    ref={chipsContainerRef}
                    className="flex gap-2 overflow-x-auto scrollbar-hide flex-1 py-1 scroll-smooth"
                >
                    {["All", "Cinematic Music", "Photography", "Coding", "UI Design", "Vlogs", "Production", "Releases"].map((chip) => (
                        <button
                            key={chip}
                            onClick={() => setActiveChip(chip)}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap border border-white/5",
                                activeChip === chip ? "bg-white text-black" : "bg-white/10 hover:bg-white/20 text-white"
                            )}
                        >
                            {chip}
                        </button>
                    ))}
                </div>
                <div className="pl-2 bg-gradient-to-l from-[#0f0f0f] via-[#0f0f0f] to-transparent sticky right-0 h-full flex items-center">
                    <button
                        onClick={() => scrollChips('right')}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors bg-[#0f0f0f]/50 backdrop-blur-md border border-white/10"
                    >
                        <ChevronRight className="h-4 w-4 text-white" />
                    </button>
                </div>
            </div>

            {/* Recommendations List (Real Database Content) */}
            <div className="space-y-4 pt-2">
                {filteredRecommendations.length > 0 ? (
                    filteredRecommendations.slice(0, 15).map((post, idx) => (
                        <div
                            key={post.id || idx}
                            onClick={() => onSelectItem({
                                title: post.title,
                                url: post.feature_video_url || "https://vjs.zencdn.net/v/oceans.mp4",
                                author: post.author || "Nderu Gathoni",
                                duration: post.reading_time || "4:20",
                                thumbnail: post.cover_image_url || "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400",
                                description: post.summary,
                                links: post.links || []
                            })}
                            className="flex gap-3 group cursor-pointer group/card pr-2"
                        >
                            <div className="rounded-xl bg-white/5 overflow-hidden shrink-0 w-44 aspect-video relative shadow-lg ring-1 ring-white/5">
                                <img
                                    src={post.cover_image_url || "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400"}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 text-[10px] font-black text-white rounded-md backdrop-blur-sm">
                                    {post.reading_time || "4:20"}
                                </div>
                                {post.feature_video_url && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                        <Play className="h-8 w-8 text-white fill-current" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col pt-0.5">
                                <h3 className="text-[13px] md:text-[14px] font-bold text-white line-clamp-2 leading-tight group-hover/card:text-red-500 transition-colors">
                                    {post.title}
                                </h3>
                                <div className="mt-1.5 space-y-0.5">
                                    <div className="flex items-center gap-1 group/author">
                                        <p className="text-[12px] text-[#aaaaaa] group-hover/author:text-white transition-colors">{post.author || "Nderu Gathoni"}</p>
                                        <CheckCircle2 className="h-3 w-3 fill-[#aaaaaa] text-[#0f0f0f]" />
                                    </div>
                                    <p className="text-[12px] text-[#aaaaaa] font-medium">
                                        {post.likes_count ? `${post.likes_count}k views` : '1.2k views'} • {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Just recently'}
                                    </p>
                                </div>
                            </div>
                            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-full h-fit transition-opacity">
                                <MoreHorizontal className="h-4 w-4 text-white/70" />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                        <div className="h-16 w-16 rounded-full bg-red-600/10 flex items-center justify-center mb-4 ring-1 ring-red-600/20">
                            <Video className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">No recommended videos yet</h3>
                        <p className="text-xs text-[#aaaaaa] leading-relaxed mb-6">
                            We haven't uploaded any similar cinematic content to your database yet. Stay tuned!
                        </p>

                        <button
                            onClick={() => setShowRequestForm(!showRequestForm)}
                            className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 px-6 rounded-full transition-all active:scale-95 shadow-lg shadow-red-600/20 flex items-center gap-2"
                        >
                            <Sparkles className="h-3.5 w-3.5" />
                            {showRequestForm ? "Close Request" : "Request Video Content"}
                        </button>

                        <AnimatePresence>
                            {showRequestForm && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                    animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                    className="w-full overflow-hidden"
                                >
                                    <form className="space-y-3 pt-4 border-t border-white/10 text-left">
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase font-black text-[#606060] tracking-widest ml-1">Video Topic</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Color Grading Tutorial"
                                                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600 transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase font-black text-[#606060] tracking-widest ml-1">Detailed Description</label>
                                            <textarea
                                                placeholder="Tell us more about what you want to see..."
                                                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600 transition-colors min-h-[80px] resize-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase font-black text-[#606060] tracking-widest ml-1">Reference Link</label>
                                            <input
                                                type="url"
                                                placeholder="e.g. YouTube or Pinterest link"
                                                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600 transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase font-black text-[#606060] tracking-widest ml-1">Your Email</label>
                                            <input
                                                type="email"
                                                placeholder="So we can notify you"
                                                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-600 transition-colors"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                alert("Request sent successfully! We will notify you once it's available.");
                                                setShowRequestForm(false);
                                            }}
                                            className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Send className="h-3.5 w-3.5" />
                                            Submit Request
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
