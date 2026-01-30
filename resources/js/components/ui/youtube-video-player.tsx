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
    Menu
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
}

export function YoutubeVideoPlayer({ video, onClose, onCreateClick }: YoutubeVideoPlayerProps) {
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
    const controlsTimeoutRef = React.useRef<any>(null);

    // Comments & Description State
    const [isDescriptionExpanded, setIsDescriptionExpanded] = React.useState(false);
    const [comments, setComments] = React.useState<Comment[]>([
        { id: '1', author: 'Alex Rivera', email: 'alex@example.com', text: 'This tutorial is exactly what I needed! The cinematic shots are incredible. Great work, Nderu! 🔥', timestamp: '2 hours ago', likes: 242 },
        { id: '2', author: 'Sarah Chen', email: 'sarah.c@tech.io', text: 'Love the attention to detail on the UI here. Can you share more about the tech stack used?', timestamp: '5 hours ago', likes: 85 },
        { id: '3', author: 'Marcus Wright', email: 'marcus@lens.com', text: 'Stunning visuals. The lighting in that opening sequence is just perfect.', timestamp: '1 day ago', likes: 12 },
    ]);
    const [newComment, setNewComment] = React.useState("");
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
                    handlePrev();
                    break;
                case 'l':
                    handleNext();
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
        if (videoRef.current) videoRef.current.currentTime = Math.min(duration, currentTime + 10);
    };

    const handlePrev = () => {
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

    const handlePostComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !userEmail.trim()) return;

        const comment: Comment = {
            id: Date.now().toString(),
            author: userName.trim() || userEmail.split('@')[0],
            email: userEmail.trim(),
            text: newComment.trim(),
            timestamp: "Just now",
            likes: 0
        };

        setComments([comment, ...comments]);
        setNewComment("");
        setIsCommenting(false);
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
                <header className="sticky top-0 z-[150] w-full bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/5 h-14 md:h-16 shrink-0">
                    <div className="flex items-center justify-between h-full px-4 md:px-6">
                        {/* Left: Menu & Logo */}
                        <div className="flex items-center gap-4">
                            <div
                                onClick={onClose}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <ChevronLeft className="h-6 w-6 text-white/70 group-hover:text-white transition-colors" />
                                <span className="text-xl font-bold tracking-tighter text-white">Blogs</span>
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
                                className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block"
                            >
                                <Video className="h-6 w-6 text-white" />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block">
                                <Bell className="h-6 w-6 text-white" />
                            </button>
                            <Avatar className="h-8 w-8 ring-2 ring-white/10 hover:ring-red-600 transition-all cursor-pointer">
                                <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=Nderu" />
                                <AvatarFallback className="bg-red-600 text-white text-xs font-bold">N</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>
            )}

            {/* Mobile Search Overlay Sub-header */}
            <div className="md:hidden h-10 px-4 flex items-center bg-[#0f0f0f] border-b border-white/5">
                <Search className="h-4 w-4 text-white/40 mr-2" />
                <span className="text-xs text-white/40">Search Cinematic Content...</span>
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
                                key={video.url}
                                src={video.url}
                                autoPlay
                                className="w-full h-full"
                                onClick={togglePlay}
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                            />

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
                                        [Music Playing: Captions active for {video.title}]
                                    </span>
                                </div>
                            )}

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
                                                            <button onClick={() => setIsLooping(!isLooping)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/10 transition-colors"><div className="flex items-center gap-3"><RotateCcw className="h-4 w-4" /><span className="text-sm">Loop video</span></div><div className={cn("text-xs font-bold", isLooping ? "text-red-600" : "text-[#aaaaaa]")}>{isLooping ? "On" : "Off"}</div></button>
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
                                        <h1 className="text-xl md:text-2xl font-bold text-white line-clamp-2">{video.title}</h1>
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                                            <div className="flex items-center justify-between md:justify-start gap-4 flex-1">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-muted overflow-hidden ring-2 ring-red-600">
                                                        <img src="https://api.dicebear.com/7.x/initials/svg?seed=Nderu" alt="Avatar" className="w-full h-full" />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-1">
                                                            <p className="font-bold text-white text-[15px]">{video.author || "Nderu Gathoni"}</p>
                                                            <CheckCircle2 className="h-3.5 w-3.5 fill-[#aaaaaa] text-[#0f0f0f]" />
                                                        </div>
                                                        <p className="text-[12px] text-[#aaaaaa]">{video.subscribers || "7.2k subscribers"}</p>
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
                                                    <button onClick={() => { setIsDisliked(!isDisliked); if (!isDisliked) setIsLiked(false); }} className={cn("px-4 py-2 hover:bg-white/10 transition-colors", isDisliked && "text-white")}>
                                                        <ThumbsDown className={cn("h-5 w-5", isDisliked && "fill-current")} />
                                                    </button>
                                                </div>
                                                <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors shrink-0 relative overflow-hidden">
                                                    <Share2 className="h-5 w-5" />
                                                    <span className="text-sm font-medium">Share</span>
                                                    {showCopied && <div className="absolute inset-0 bg-red-600 text-white flex items-center justify-center text-[10px] uppercase font-bold">Link Copied</div>}
                                                </button>
                                                <div className="relative" ref={moreMenuRef}>
                                                    <button onClick={() => setShowMoreMenu(!showMoreMenu)} className={cn("p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors shrink-0", showMoreMenu && "bg-white/20")}><MoreHorizontal className="h-5 w-5" /></button>
                                                    <AnimatePresence>{showMoreMenu && (
                                                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="absolute bottom-full right-0 mb-2 w-56 bg-[#1f1f1f] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-[120]">
                                                            <div className="py-2">
                                                                <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-white/10 transition-colors text-sm"><ListPlus className="h-4 w-4" /><span>Save to playlist</span></button>
                                                                <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-white/10 transition-colors text-sm"><FileText className="h-4 w-4" /><span>Open transcript</span></button>
                                                                <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-white/10 transition-colors text-sm"><Flag className="h-4 w-4" /><span>Report</span></button>
                                                                <div className="h-px bg-white/10 my-1 mx-2" />
                                                                <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-white/10 transition-colors text-sm"><BarChart2 className="h-4 w-4" /><span>Stats for nerds</span></button>
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
                                            <p className="text-[#f1f1f1] whitespace-pre-wrap">{video.description || `Welcome back! In this video, we dive deep into the production process for "${video.title}". \n\nWe cover everything from initial concept to the final color grade. Huge thanks to everyone who supported this project. \n\nDon't forget to like and subscribe for more content like this!`}</p>
                                            {video.links && video.links.length > 0 && (
                                                <div className="space-y-2 pt-4 border-t border-white/10">
                                                    <p className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2"><Sparkles className="h-3 w-3 text-red-500" /> Featured Links</p>
                                                    <div className="flex flex-col gap-2">{video.links.map((link, idx) => (<a key={idx} href={link.startsWith('http') ? link : `https://${link}`} target="_blank" rel="noopener noreferrer" className="text-red-500 font-medium hover:underline flex items-center gap-2 shrink-0">{link}</a>))}</div>
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
                                                <div key={comment.id} className="flex gap-4 group">
                                                    <div className="h-10 w-10 rounded-full bg-white/5 overflow-hidden shrink-0 ring-1 ring-white/10">
                                                        <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.author}`} alt="Avatar" />
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[13px] font-bold text-white">@{comment.author.toLowerCase().replace(/\s+/g, '')}</span>
                                                            <span className="text-[12px] text-[#aaaaaa]">{comment.timestamp}</span>
                                                            <div className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] text-[#aaaaaa] opacity-0 group-hover:opacity-100 transition-opacity">
                                                                Verified: {comment.email}
                                                            </div>
                                                        </div>
                                                        <p className="text-[14px] leading-relaxed text-[#f1f1f1]">{comment.text}</p>
                                                        <div className="flex items-center gap-4 pt-1">
                                                            <div className="flex items-center gap-1 group/like cursor-pointer">
                                                                <ThumbsUp className="h-4 w-4 text-white/60 group-hover/like:text-white transition-colors" />
                                                                <span className="text-xs text-[#aaaaaa]">{comment.likes > 0 ? comment.likes : ''}</span>
                                                            </div>
                                                            <ThumbsDown className="h-4 w-4 text-white/60 hover:text-white cursor-pointer transition-colors" />
                                                            <button className="text-xs font-bold text-white/60 hover:bg-white/10 px-2 py-1 rounded-full transition-colors">Reply</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* SIDEBAR CONTENT */}
                                {isTheaterMode && (
                                    <div className="w-full lg:w-[400px] shrink-0 space-y-3 pb-10">
                                        <SidebarContent />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* GLOBAL SIDEBAR */}
                    {!isTheaterMode && !isFullscreen && (
                        <div
                            className="hidden lg:block w-[400px] shrink-0 space-y-3 py-0"
                            style={{ gridArea: 'sidebar' }}
                        >
                            <SidebarContent />
                        </div>
                    )}
                </div>
            </div>

            {/* Close Button Desktop */}
            {!isFullscreen && (
                <button
                    onClick={onClose}
                    className="md:hidden fixed bottom-6 right-6 p-4 bg-red-600 hover:bg-red-700 rounded-full text-white shadow-2xl z-[200] active:scale-95 transition-all"
                >
                    <CloseIcon className="h-6 w-6" />
                </button>
            )}
        </div>
    );
}

function SidebarContent() {
    return (
        <>
            <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide shrink-0">
                {["All", "From X.O", "Related", "Mixed"].map((chip) => (<span key={chip} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium cursor-pointer transition-colors whitespace-nowrap">{chip}</span>))}
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="flex gap-2 group cursor-pointer mb-3">
                    <div className="rounded-lg bg-white/5 overflow-hidden shrink-0 w-40 aspect-video">
                        <img src={`https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400&index=${i}`} alt="Related" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-red-500 transition-colors">Related Project Cinematic - Part {i}</h3>
                        <p className="text-xs text-[#aaaaaa] mt-1">Nderu Gathoni</p>
                        <p className="text-xs text-[#aaaaaa]">245k views • {i} months ago</p>
                    </div>
                </div>
            ))}
        </>
    );
}
