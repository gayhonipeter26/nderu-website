import * as React from "react";
import { motion } from "framer-motion";
import { Plus, User, Loader2 } from "lucide-react";
import { StoryViewer, type Story } from "@/components/ui/story-viewer";
import { cn } from "@/lib/utils";

interface AddStoryButtonProps {
    onUpload: (files: FileList) => void;
    isUploading?: boolean;
}

function AddStoryButton({ onUpload, isUploading }: AddStoryButtonProps) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onUpload(e.target.files);
        }
    };

    return (
        <div className="relative flex flex-col items-center gap-2 group cursor-pointer">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,video/*"
                multiple
            />
            <button
                onClick={handleClick}
                disabled={isUploading}
                className="relative focus:outline-none"
                aria-label="Add your Highlight"
            >
                <div className="relative">
                    <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full p-1">
                        <div
                            className={cn(
                                "w-full h-full rounded-full flex items-center justify-center",
                                "border-2 border-dashed border-muted-foreground/40",
                                "bg-muted/30 transition-all duration-200",
                                "group-hover:border-muted-foreground/60 group-hover:bg-muted/50",
                                isUploading && "animate-pulse"
                            )}
                        >
                            {isUploading ? (
                                <Loader2 className="w-7 h-7 text-muted-foreground/50 animate-spin" />
                            ) : (
                                <User className="w-7 h-7 text-muted-foreground/50" />
                            )}
                        </div>
                    </div>
                    {!isUploading && (
                        <motion.div
                            className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-sm"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Plus className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
                        </motion.div>
                    )}
                </div>
            </button>
            <span className="text-[10px] sm:text-xs font-medium text-muted-foreground truncate max-w-[80px]">
                {isUploading ? "Uploading..." : "Add Highlight"}
            </span>
        </div>
    );
}

const categories = [
    {
        username: "Coding",
        avatar: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=200&h=200&fit=crop",
        timestamp: "Active",
        stories: [
            { id: "code-1", type: "image" as const, src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=1200&fit=crop" },
            { id: "code-2", type: "image" as const, src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=1200&fit=crop" },
            { id: "code-3", type: "video" as const, src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
        ],
    },
    {
        username: "Photography",
        avatar: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=200&h=200&fit=crop",
        timestamp: "Active",
        stories: [
            { id: "photo-1", type: "image" as const, src: "/images/shoot1.jpeg" },
            { id: "photo-2", type: "image" as const, src: "images/shoot2.jpeg" },
        ],
    },
    {
        username: "HeartBeat(26)",
        avatar: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200&h=200&fit=crop",
        timestamp: "Active",
        stories: [
            { id: "rel-1", type: "image" as const, src: "/images/alc1.jpeg" },
            { id: "rel-2", type: "image" as const, src: "/images/alc2.jpeg" },
        ],
    },
    {
        username: "Brother",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
        timestamp: "Active",
        stories: [
            { id: "bro-1", type: "image" as const, src: "/images/bro1.jpeg" },
            { id: "bro-2", type: "image" as const, src: "/images/bro2.jpeg" },
            { id: "bro-3", type: "image" as const, src: "/images/bro3.jpeg" },
        ],
    },
    {
        username: "Friend",
        avatar: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=200&fit=crop",
        timestamp: "Active",
        stories: [
            { id: "friend-1", type: "image" as const, src: "https://images.unsplash.com/photo-1525026198548-4baa33f611e3?w=800&h=1200&fit=crop" },
            { id: "friend-2", type: "image" as const, src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&h=1200&fit=crop" },
        ],
    },
];

export function StoryViewerDemo() {
    const [userStories, setUserStories] = React.useState<Story[]>([]);
    const [isUploading, setIsUploading] = React.useState(false);

    const handleUpload = React.useCallback((files: FileList) => {
        const MAX_FILE_SIZE = 250 * 1024 * 1024; // 250MB
        const fileArray = Array.from(files).slice(0, 3);

        const oversizedFile = fileArray.find(file => file.size > MAX_FILE_SIZE);
        if (oversizedFile) {
            alert(`The file "${oversizedFile.name}" is too large. Maximum size is 250MB.`);
            return;
        }

        setIsUploading(true);
        const newStories: Story[] = [];

        let processedCount = 0;
        fileArray.forEach((file, index) => {
            const type = file.type.startsWith('video') ? 'video' : 'image';
            const reader = new FileReader();

            reader.onload = (e) => {
                const src = e.target?.result as string;
                newStories.push({
                    id: `user-story-${Date.now()}-${index}`,
                    type,
                    src,
                    duration: type === 'image' ? 5000 : undefined
                });

                processedCount++;
                if (processedCount === fileArray.length) {
                    setUserStories(prev => [...newStories, ...prev]);
                    setIsUploading(false);
                }
            };

            reader.readAsDataURL(file);
        });
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto px-4 pb-12">
            <div className="flex gap-4 sm:gap-6 md:gap-10 overflow-x-auto py-4 px-1 no-scrollbar lg:justify-center">
                <AddStoryButton onUpload={handleUpload} isUploading={isUploading} />

                {userStories.length > 0 && (
                    <StoryViewer
                        stories={userStories}
                        username="Your Story"
                        avatar="/images/profile.jpg"
                        timestamp="Just now"
                        onStoryView={() => { }}
                        onAllStoriesViewed={() => { }}
                    />
                )}

                {categories.map((cat) => (
                    <StoryViewer
                        key={cat.username}
                        stories={cat.stories}
                        username={cat.username}
                        avatar={cat.avatar}
                        timestamp={cat.timestamp}
                        onStoryView={() => { }}
                        onAllStoriesViewed={() => { }}
                    />
                ))}
            </div>
            <div className="h-px w-full bg-border/40 mt-4" />
        </div>
    );
}
