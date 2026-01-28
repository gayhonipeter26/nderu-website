import { BentoCell, BentoGrid, ContainerScale, ContainerScroll } from "@/components/ui/hero-gallery-scroll-animation"
import { Button } from "@/components/ui/button"

const IMAGES = [
    "/assets/photos/your-photo-1.jpg",
    "/assets/photos/your-photo-2.jpg",
    "/assets/photos/your-photo-3.jpg",
    "/assets/photos/your-photo-4.jpg",
    "/assets/photos/your-photo-5.jpg",
]

const HeroDemo1 = () => {
    return (
        <ContainerScroll className="h-[350vh]">
            <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full p-4">
                {IMAGES.map((imageUrl, index) => (
                    <BentoCell
                        key={index}
                        className="overflow-hidden rounded-xl shadow-xl"
                    >
                        <img
                            className="size-full object-cover object-center"
                            src={imageUrl}
                            alt=""
                        />
                    </BentoCell>
                ))}
            </BentoGrid>

            <ContainerScale className="relative z-10 text-center">
                <h1 className="max-w-xl text-5xl font-bold tracking-tighter text-white drop-shadow-lg">
                    Cinematic Moments
                </h1>
                <p className="my-6 max-w-xl text-sm text-white/90 md:text-base drop-shadow-md">
                    Capturing stories through the lens, one scroll at a time.
                    Experience the art of photography in motion.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <Button className="bg-primary px-6 py-2 font-medium hover:bg-primary/90">
                        View Gallery
                    </Button>
                    <Button
                        variant="outline"
                        className="bg-white/10 backdrop-blur-md border-white/20 text-white px-6 py-2 font-medium hover:bg-white/20"
                    >
                        Learn More
                    </Button>
                </div>
            </ContainerScale>
        </ContainerScroll>
    )
}

export { HeroDemo1 }
