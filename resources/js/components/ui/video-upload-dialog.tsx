import * as React from "react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Upload,
    X,
    FileVideo,
    AlertCircle,
    CheckCircle2,
    Loader2,
    Image as ImageIcon,
    Plus,
    Link as LinkIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { saveVideoFile } from "@/lib/video-storage";

interface VideoUploadDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: (videoData: { title: string; url: string; duration: string; size: string; coverImage: string; description: string; links: string[] }) => void;
}

const MAX_FILE_SIZE = 300 * 1024 * 1024; // 300MB
const MAX_DURATION = 600; // 10 minutes in seconds

export function VideoUploadDialog({ open, onOpenChange, onSuccess }: VideoUploadDialogProps) {
    const [file, setFile] = React.useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const [coverImage, setCoverImage] = React.useState<File | null>(null);
    const [coverPreview, setCoverPreview] = React.useState<string | null>(null);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [links, setLinks] = React.useState<string[]>([""]);
    const [detectedDuration, setDetectedDuration] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);
    const [isValidating, setIsValidating] = React.useState(false);
    const [isUploading, setIsUploading] = React.useState(false);

    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const coverInputRef = React.useRef<HTMLInputElement>(null);

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const validateVideo = async (videoFile: File) => {
        setIsValidating(true);
        setError(null);

        if (videoFile.size > MAX_FILE_SIZE) {
            setError("File size exceeds 300MB limit.");
            setIsValidating(false);
            return false;
        }

        return new Promise<boolean>((resolve) => {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = () => {
                window.URL.revokeObjectURL(video.src);
                if (video.duration > MAX_DURATION) {
                    setError("Video duration exceeds 10 minutes limit.");
                    resolve(false);
                } else {
                    setDetectedDuration(formatDuration(video.duration));
                    resolve(true);
                }
                setIsValidating(false);
            };
            video.onerror = () => {
                setError("Failed to load video metadata.");
                setIsValidating(false);
                resolve(false);
            };
            video.src = URL.createObjectURL(videoFile);
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        const isValid = await validateVideo(selectedFile);
        if (isValid) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
        } else {
            setFile(null);
            setPreviewUrl(null);
        }
    };

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setCoverImage(selectedFile);
            setCoverPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleAddLink = () => setLinks([...links, ""]);
    const handleUpdateLink = (index: number, value: string) => {
        const newLinks = [...links];
        newLinks[index] = value;
        setLinks(newLinks);
    };
    const handleRemoveLink = (index: number) => {
        if (links.length > 1) {
            setLinks(links.filter((_, i) => i !== index));
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);

        const videoId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        try {
            await saveVideoFile({ id: videoId, file: file });

            // Simulate upload delay
            setTimeout(() => {
                setIsUploading(false);
                onSuccess?.({
                    // @ts-ignore - Adding id property dynamically
                    id: videoId,
                    title: title || file.name.replace(/\.[^/.]+$/, ""),
                    url: previewUrl || "", // Use the immediate blob URL for playback
                    duration: detectedDuration || "0:00",
                    size: (file.size / (1024 * 1024)).toFixed(1) + "MB",
                    coverImage: coverPreview || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=400",
                    description,
                    links: links.filter(l => l.trim() !== "")
                });
                onOpenChange(false);
                reset();
            }, 1000);
        } catch (e) {
            console.error("Failed to save video to storage", e);
            setIsUploading(false);
        }
    };

    const reset = () => {
        setFile(null);
        setPreviewUrl(null);
        setCoverImage(null);
        setCoverPreview(null);
        setTitle("");
        setDescription("");
        setLinks([""]);
        setDetectedDuration("");
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto scrollbar-hide bg-[#0f0f0f] border-white/10 text-white p-0">
                <div className="sticky top-0 bg-[#0f0f0f]/80 backdrop-blur-md z-10 px-6 py-4 border-b border-white/5">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold flex items-center gap-2">
                            <Upload className="h-5 w-5 text-red-600" />
                            {file ? "Edit Details" : "Upload Video"}
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            {file ? "Provide a title, description and thumbnail for your video." : "Maximum 10 minutes and 300MB."}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-6">
                    <AnimatePresence mode="wait">
                        {!file ? (
                            <motion.div
                                key="upload-area"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onClick={() => fileInputRef.current?.click()}
                                className={cn(
                                    "relative border-2 border-dashed border-white/10 rounded-2xl p-16 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/5 transition-all group",
                                    error && "border-red-500/50 bg-red-500/5"
                                )}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="video/*"
                                    className="hidden"
                                />
                                <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <FileVideo className="h-10 w-10 text-muted-foreground group-hover:text-red-600 transition-colors" />
                                </div>
                                <div className="text-center">
                                    <p className="font-bold text-xl">Select video to upload</p>
                                    <p className="text-sm text-muted-foreground mt-1">Or drag and drop a file</p>
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ y: 5, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="flex items-center gap-2 text-red-500 text-sm mt-2 font-medium"
                                    >
                                        <AlertCircle className="h-4 w-4" />
                                        {error}
                                    </motion.div>
                                )}

                                {isValidating && (
                                    <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                        <div className="flex flex-col items-center gap-2">
                                            <Loader2 className="h-8 w-8 animate-spin text-red-600" />
                                            <span className="text-sm font-medium">Validating video...</span>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form-area"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            >
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#f1f1f1]">Title (required)</label>
                                        <Input
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Add a title that describes your video"
                                            className="bg-transparent border-white/10 focus-visible:ring-red-600 h-12"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#f1f1f1]">Description</label>
                                        <span className="text-[10px] text-muted-foreground ml-2">Actual duration: {detectedDuration}</span>
                                        <Textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Tell viewers about your video"
                                            className="bg-transparent border-white/10 focus-visible:ring-red-600 min-h-[120px] resize-none"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#f1f1f1]">Thumbnail</label>
                                        <p className="text-xs text-muted-foreground mb-3">Select or upload a picture that shows what's in your video.</p>
                                        <div
                                            onClick={() => coverInputRef.current?.click()}
                                            className="aspect-video rounded-xl border-2 border-dashed border-white/10 overflow-hidden relative group cursor-pointer hover:bg-white/5 transition-all"
                                        >
                                            <input
                                                type="file"
                                                ref={coverInputRef}
                                                onChange={handleCoverChange}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                            {coverPreview ? (
                                                <>
                                                    <img src={coverPreview} className="w-full h-full object-cover" alt="Cover Preview" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                        <Button variant="secondary" size="sm" className="rounded-full">Change Photo</Button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                                    <ImageIcon className="h-8 w-8 text-muted-foreground group-hover:text-red-600 transition-colors" />
                                                    <span className="text-xs font-medium">Upload thumbnail</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#f1f1f1]">Video Preview</label>
                                        <div className="aspect-video rounded-xl overflow-hidden bg-black border border-white/10 ring-1 ring-white/5 shadow-2xl relative group">
                                            <video src={previewUrl || ""} className="w-full h-full object-cover" controls />
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 mt-2">
                                            <div className="flex items-center gap-3">
                                                <FileVideo className="h-5 w-5 text-red-600" />
                                                <span className="text-xs font-medium truncate max-w-[150px]">{file.name}</span>
                                            </div>
                                            <Button variant="ghost" size="sm" onClick={reset} className="text-[11px] h-7 hover:bg-white/10">Change</Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-bold text-[#f1f1f1]">Links</label>
                                            <button
                                                onClick={handleAddLink}
                                                className="text-[11px] font-bold text-red-600 hover:text-red-500 flex items-center gap-1"
                                            >
                                                <Plus className="h-3 w-3" />
                                                Add link
                                            </button>
                                        </div>
                                        <div className="space-y-3 max-h-[150px] overflow-y-auto scrollbar-hide pr-1">
                                            {links.map((link, idx) => (
                                                <div key={idx} className="flex gap-2">
                                                    <div className="relative flex-1">
                                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                                                        <Input
                                                            value={link}
                                                            onChange={(e) => handleUpdateLink(idx, e.target.value)}
                                                            placeholder="https://..."
                                                            className="bg-transparent border-white/10 focus-visible:ring-red-600 h-9 pl-9 text-xs"
                                                        />
                                                    </div>
                                                    {links.length > 1 && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleRemoveLink(idx)}
                                                            className="h-9 w-9 text-muted-foreground hover:text-red-500"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="sticky bottom-0 bg-[#0f0f0f]/80 backdrop-blur-md z-10 px-6 py-4 border-t border-white/5 mt-auto">
                    <DialogFooter className="flex-col sm:flex-row gap-3">
                        <Button
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            className="rounded-full hover:bg-white/5 text-sm"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={!file || !title || isUploading}
                            onClick={handleUpload}
                            className="rounded-full bg-red-600 hover:bg-red-700 text-white font-bold px-10 min-w-[140px] shadow-lg shadow-red-600/20"
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Publishing...
                                </>
                            ) : (
                                "Publish"
                            )}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
