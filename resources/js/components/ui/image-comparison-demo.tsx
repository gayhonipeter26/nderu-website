import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider
} from "@/components/ui/image-comparison";

export default function ImageComparisonDemo() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-background">
      <ImageComparison className="aspect-4/5 md:aspect-16/9 w-full max-w-4xl rounded-lg shadow-2xl" enableHover>
        <ImageComparisonImage
          src="/assets/photos/about-before.jpg"
          alt="Before - Technical foundation"
          position="left"
        />
        <ImageComparisonImage
          src="/assets/photos/about-after.jpg"
          className="grayscale"
          alt="After - Polished professional result"
          position="right"
        />
        <ImageComparisonSlider className="w-0.5 bg-white/30 backdrop-blur-xs">
          <div className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg"></div>
        </ImageComparisonSlider>
      </ImageComparison>
    </div>
  );
}
