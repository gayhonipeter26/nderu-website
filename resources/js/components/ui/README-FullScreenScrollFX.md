# FullScreenScrollFX Component Documentation

## Overview

The FullScreenScrollFX component is an immersive, full-screen scrolling animation component that creates a cinematic experience with smooth transitions, parallax effects, and interactive navigation. It's perfect for showcasing portfolios, creative projects, or storytelling experiences.

## Features

- **Full-Screen Experience** - Immersive viewport-filling design
- **GSAP Animations** - Smooth, hardware-accelerated transitions
- **ScrollTrigger Integration** - Programmatic scroll-based navigation
- **Interactive Lists** - Click-to-navigate section indicators
- **Progress Tracking** - Visual progress indicator
- **Responsive Design** - Adapts to different screen sizes
- **Customizable Styling** - Extensive color and layout options
- **Accessibility** - ARIA labels and keyboard navigation

## Dependencies

- **React**: ^19.0.0 (already installed)
- **GSAP**: ^3.14.2 (already installed)
- **TypeScript**: Full type safety

## Component Structure

### Files Created

1. **`full-screen-scroll-fx.tsx`** - Main component implementation
2. **`full-screen-scroll-fx-demo.tsx`** - Demo with sample content
3. **`FullScreenScrollFXWrapper.vue`** - Vue wrapper component
4. **`FullScreenScrollFXDemo.vue`** - Standalone demo page
5. **`README-FullScreenScrollFX.md`** - This documentation file

## Props Interface

```typescript
export type FullScreenFXProps = {
  sections: Section[];
  className?: string;
  style?: CSSProperties;
  
  // Layout
  fontFamily?: string;
  header?: ReactNode;
  footer?: ReactNode;
  gap?: number;           // rem
  gridPaddingX?: number;  // rem
  
  showProgress?: boolean;
  debug?: boolean;
  
  // Motion
  durations?: Durations;
  reduceMotion?: boolean;
  smoothScroll?: boolean;
  
  // Background transition
  bgTransition?: "fade" | "wipe";
  parallaxAmount?: number;
  
  // Controlled index
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  initialIndex?: number;
  
  // Colors
  colors?: Colors;
  
  // Imperative API
  apiRef?: React.Ref<FullScreenFXAPI>;
  ariaLabel?: string;
};
```

### Section Type

```typescript
type Section = {
  id?: string;
  background: string;
  leftLabel?: ReactNode;
  title: string | ReactNode;
  rightLabel?: ReactNode;
  renderBackground?: (active: boolean, previous: boolean) => ReactNode;
};
```

## Usage Examples

### Basic Usage

```tsx
import { FullScreenScrollFX } from "@/components/ui/full-screen-scroll-fx";

const sections = [
  {
    leftLabel: "Introduction",
    title: "Welcome",
    rightLabel: "Start",
    background: "https://images.unsplash.com/photo-1.jpg",
  },
  // ... more sections
];

<FullScreenScrollFX sections={sections} />
```

### Advanced Usage

```tsx
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx";

const MyComponent = () => {
  const apiRef = React.useRef<FullScreenFXAPI>(null);

  const handleNext = () => {
    apiRef.current?.next();
  };

  return (
    <FullScreenScrollFX
      sections={sections}
      header={<div>My Header</div>}
      footer={<div>My Footer</div>}
      showProgress
      durations={{ change: 0.8, snap: 1000 }}
      bgTransition="fade"
      parallaxAmount={5}
      colors={{
        text: "rgba(255,255,255,0.9)",
        overlay: "rgba(0,0,0,0.4)",
        pageBg: "#1a1a1a",
        stageBg: "#000000",
      }}
      apiRef={apiRef}
      onIndexChange={(index) => console.log('Current section:', index)}
    />
  );
};
```

## Customization Options

### Layout Options

- **`fontFamily`** - Custom font family for text
- **`header`** - ReactNode for header content
- **`footer`** - ReactNode for footer content
- **`gap`** - Spacing between grid columns (rem)
- **`gridPaddingX`** - Horizontal padding (rem)

### Animation Options

- **`durations`** - Animation durations for change and snap
- **`reduceMotion`** - Disable animations for accessibility
- **`smoothScroll`** - Enable smooth scrolling (requires Lenis)
- **`bgTransition`** - Background transition mode ("fade" or "wipe")
- **`parallaxAmount`** - Parallax effect intensity (%)

### Color Customization

```typescript
colors = {
  text: "rgba(245,245,245,0.92)",      // Text color
  overlay: "rgba(0,0,0,0.35)",           // Background overlay
  pageBg: "#ffffff",                    // Page background
  stageBg: "#000000",                    // Stage background
}
```

## Imperative API

The component exposes an imperative API through the `apiRef` prop:

```typescript
export type FullScreenFXAPI = {
  next: () => void;           // Go to next section
  prev: () => void;           // Go to previous section
  goTo: (index: number) => void; // Go to specific section
  getIndex: () => number;      // Get current section index
  refresh: () => void;         // Refresh ScrollTrigger
};
```

## Responsive Behavior

### Desktop (≥900px)
- **3-column layout**: Left list (30%) / Center (40%) / Right list (30%)
- **Full-height sections**: Each section takes full viewport height
- **Smooth scrolling**: Programmatic scroll navigation
- **Interactive lists**: Click to navigate to sections

### Mobile (<900px)
- **Single column layout**: Stacked vertical arrangement
- **Reduced height**: Auto-height sections
- **Touch-friendly**: Larger tap targets
- **Simplified navigation**: Centered content

## Integration Examples

### Vue Integration

```vue
<template>
  <FullScreenScrollFXWrapper />
</template>

<script setup>
import FullScreenScrollFXWrapper from '@/components/FullScreenScrollFXWrapper.vue';
</script>
```

### Inertia.js/Laravel Integration

```tsx
// In a Vue page component
import FullScreenScrollFXWrapper from '@/components/FullScreenScrollFXWrapper.vue';

export default function PortfolioPage() {
  return (
    <WebsiteLayout>
      <FullScreenScrollFXWrapper />
    </WebsiteLayout>
  );
}
```

## Performance Considerations

### Optimization Tips

1. **Image Optimization**: Use optimized images with proper dimensions
2. **Lazy Loading**: Consider lazy loading for many sections
3. **Animation Performance**: GSAP provides hardware acceleration
4. **Memory Management**: Component properly cleans up on unmount
5. **Resize Handling**: Debounce resize events for better performance

### Best Practices

- Use high-quality, optimized images for backgrounds
- Limit the number of sections for better performance
- Consider using `reduceMotion` for accessibility
- Test on various devices and screen sizes
- Monitor memory usage with many sections

## Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **GSAP**: Requires modern browser with ES6+ support
- **ScrollTrigger**: Works in all modern browsers
- **CSS Grid**: Requires CSS Grid support

## Troubleshooting

### Common Issues

1. **Images not loading**: Check image URLs and ensure they're accessible
2. **Animations not working**: Verify GSAP is properly installed
3. **Scroll not working**: Check ScrollTrigger initialization
4. **Layout issues**: Verify CSS Grid support
5. **Performance issues**: Reduce number of sections or optimize images

### Debug Mode

Enable debug mode to see current section information:

```tsx
<FullScreenScrollFX sections={sections} debug={true} />
```

## Accessibility

- **Keyboard Navigation**: Tab through interactive elements
- **Screen Reader Support**: ARIA labels and roles
- **Reduced Motion**: Respects prefers-reduced-motion setting
- **Focus Management**: Proper focus handling for navigation
- **High Contrast**: Customizable color schemes for better visibility

## Styling Customization

### CSS Variables

The component uses CSS variables for easy customization:

```css
:root {
  --fx-font: '"Rubik Wide", system-ui, sans-serif';
  --fx-text: rgba(245,245,245,0.92);
  --fx-overlay: rgba(0,0,0,0.35);
  --fx-page-bg: #ffffff;
  --fx-stage-bg: #000000;
  --fx-gap: 1rem;
  --fx-grid-px: 2rem;
  --fx-row-gap: 10px;
}
```

### Custom Classes

The component uses BEM-style class naming:
- `.fx` - Main container
- `.fx-header` - Header section
- `.fx-content` - Main content area
- `.fx-left` / `.fx-right` - Side lists
- `.fx-center` - Center content
- `.fx-footer` - Footer section

## Advanced Features

### Custom Background Rendering

Use the `renderBackground` prop for custom backgrounds:

```tsx
{
  background: "", // Not used when renderBackground is provided
  renderBackground: (active, previous) => (
    <div className={`custom-bg ${active ? 'active' : ''}`}>
      <VideoPlayer src={videoSrc} autoPlay muted />
    </div>
  )
}
```

### Controlled Mode

Use controlled mode for external state management:

```tsx
const [currentIndex, setCurrentIndex] = useState(0);

<FullScreenScrollFX
  sections={sections}
  currentIndex={currentIndex}
  onIndexChange={setCurrentIndex}
/>
```

This component provides a powerful, flexible foundation for creating immersive full-screen experiences with smooth animations and professional polish.
