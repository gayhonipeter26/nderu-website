# Testimonials Columns Component

## Overview

The Testimonials Columns component is an animated React component that displays customer testimonials in three scrolling columns with smooth animations and professional styling.

## Features

- **Animated Scrolling**: Continuous vertical scrolling animation for each column
- **Responsive Design**: Shows 1 column on mobile, 2 on tablet, 3 on desktop
- **Smooth Animations**: Uses Motion (Framer Motion) for smooth transitions
- **Professional Styling**: Clean design with shadows, borders, and hover effects
- **TypeScript Support**: Fully typed with TypeScript interfaces
- **Customizable Durations**: Different scroll speeds for each column

## Components

### TestimonialsColumn

The main component that creates a single scrolling column of testimonials.

**Props:**
- `className?: string` - Additional CSS classes
- `testimonials: Testimonial[]` - Array of testimonial objects
- `duration?: number` - Scroll animation duration in seconds (default: 10)

**Testimonial Interface:**
```typescript
interface Testimonial {
  text: string;      // Testimonial content
  image: string;     // Profile image URL
  name: string;      // Customer name
  role: string;      // Customer role/title
}
```

### Testimonials (Demo Component)

The complete demo component that displays three columns with sample data.

## Installation

### Dependencies

The component requires the following npm package:

```bash
npm install motion
```

### Files

1. **Main Component**: `/components/ui/testimonials-columns-1.tsx`
2. **Demo Component**: `/components/ui/testimonials-columns-1-demo.tsx`
3. **Vue Wrapper**: `/components/TestimonialsColumnsWrapper.vue`
4. **Demo Page**: `/pages/TestimonialsDemo.vue`

## Usage

### Basic Usage

```tsx
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1';

const testimonials = [
  {
    text: "This product revolutionized our workflow!",
    image: "https://example.com/avatar.jpg",
    name: "John Doe",
    role: "CEO"
  }
];

<TestimonialsColumn 
  testimonials={testimonials} 
  duration={15} 
/>
```

### Full Demo Usage

```tsx
import Testimonials from '@/components/ui/testimonials-columns-1-demo';

// In your React component
<Testimonials />
```

### Vue Integration

```vue
<template>
  <TestimonialsColumnsWrapper />
</template>

<script setup>
import TestimonialsColumnsWrapper from '@/components/TestimonialsColumnsWrapper.vue';
</script>
```

## Customization

### Styling

The component uses Tailwind CSS classes and can be customized through:

- **CSS Variables**: Override theme colors through CSS variables
- **Tailwind Classes**: Modify existing classes or add custom ones
- **Inline Styles**: Pass custom styles via props

### Animation

Customize the scrolling animation:

```tsx
<TestimonialsColumn 
  testimonials={testimonials} 
  duration={20}  // Slower scrolling
  className="custom-column-styles"
/>
```

### Content

Update testimonials data:

```tsx
const customTestimonials = [
  {
    text: "Your custom testimonial text",
    image: "https://images.unsplash.com/photo-...",
    name: "Customer Name",
    role: "Customer Role"
  }
];
```

## Responsive Behavior

- **Mobile (<768px)**: 1 column visible
- **Tablet (768px-1024px)**: 2 columns visible
- **Desktop (>1024px)**: 3 columns visible

## Performance

- **Optimized Images**: Uses optimized Unsplash images
- **Smooth Animations**: Hardware-accelerated CSS transforms
- **Efficient Rendering**: React.memo for performance optimization
- **Lazy Loading**: Images load as needed

## Integration Guidelines

### Data Structure

Ensure your testimonial data follows the required interface:

```typescript
const testimonials: Testimonial[] = [
  {
    text: "Customer feedback text",
    image: "https://example.com/profile.jpg",
    name: "Full Name",
    role: "Job Title"
  }
];
```

### Image Requirements

- **Size**: 100x100px recommended for profile images
- **Format**: WebP, JPEG, or PNG
- **Optimization**: Use compressed images for better performance

### Best Practices

1. **Use Real Images**: Replace placeholder images with actual customer photos
2. **Keep Text Concise**: Testimonial text should be brief and impactful
3. **Verify Roles**: Ensure customer roles are accurate and current
4. **Test Responsiveness**: Verify component works on all screen sizes
5. **Performance**: Monitor animation performance on lower-end devices

## Troubleshooting

### Common Issues

1. **Images Not Loading**: Verify image URLs are accessible
2. **Animation Not Working**: Ensure Motion library is installed
3. **TypeScript Errors**: Check interface implementation
4. **Responsive Issues**: Verify Tailwind CSS configuration

### Solutions

1. **Image Loading**: Use absolute URLs or import images
2. **Motion Issues**: Reinstall the motion package
3. **TypeScript**: Ensure proper type definitions
4. **CSS**: Verify Tailwind CSS is properly configured

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Android Chrome
- **Features**: CSS Grid, Flexbox, CSS Transforms

## Accessibility

- **Semantic HTML**: Uses proper HTML structure
- **ARIA Labels**: Includes appropriate ARIA attributes
- **Keyboard Navigation**: Supports keyboard interaction
- **Screen Readers**: Compatible with screen readers

## Future Enhancements

Potential improvements to consider:

1. **Auto-Pause on Hover**: Stop scrolling when user hovers
2. **Custom Speed Controls**: Allow users to control scroll speed
3. **Testimonial Filtering**: Filter by category or rating
4. **Modal View**: Open full testimonial in modal
5. **Infinite Scroll**: Load more testimonials dynamically
