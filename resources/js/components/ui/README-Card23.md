# ArticleCard Component Documentation

## Overview

The ArticleCard component is an elegant, animated React component that displays content in a card format with a distinctive date badge, tag, and location overlay on images. It features smooth Framer Motion animations and a modern design perfect for showcasing projects, blog posts, or portfolio items.

## Features

- **Smooth Animations**: Framer Motion powered hover and entrance animations
- **Modern Design**: Clean, card-based layout with rounded corners and shadows
- **Date Badge**: Unique split date display with month and day
- **Location Overlay**: Map pin with location information overlayed on images
- **Tag System**: Categorization tags for content organization
- **Responsive Design**: Works perfectly on all screen sizes
- **TypeScript**: Full type safety with defined interfaces
- **Customizable**: Extensive props for customization

## Files Created

1. **`card-23.tsx`** - Main ArticleCard component implementation
2. **`card-23-demo.tsx`** - Original demo with nature photography theme
3. **`card-23-portfolio-demo.tsx`** - Customized portfolio demo
4. **`ArticleCardWrapper.vue`** - Vue wrapper component
5. **`ArticleCardDemo.vue`** - Standalone demo page
6. **`README-Card23.md`** - This documentation file

## Component Interface

### ArticleCardProps Interface

```typescript
export interface ArticleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tag: string;
  date: {
    month: string;
    day: number;
  };
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  location: {
    city: string;
    country: string;
  };
}
```

## Usage Examples

### Basic Usage

```tsx
import { ArticleCard } from "@/components/ui/card-23";

<ArticleCard
  tag="Web Development"
  date={{ month: "JAN", day: 25 }}
  title="Healthcare Platform"
  description="Full-stack healthcare management system with patient records and appointment scheduling."
  imageUrl="https://example.com/image.jpg"
  imageAlt="Healthcare platform interface"
  location={{ city: "Nairobi", country: "Kenya" }}
/>
```

### Multiple Cards Grid

```tsx
import { ArticleCard } from "@/components/ui/card-23";

const projects = [
  {
    tag: "Web Development",
    date: { month: "JAN", day: 15 },
    title: "Healthcare Platform",
    description: "Full-stack healthcare management system...",
    imageUrl: "https://example.com/healthcare.jpg",
    imageAlt: "Healthcare platform interface",
    location: { city: "Nairobi", country: "Kenya" },
  },
  // ... more projects
];

return (
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {projects.map((project, index) => (
      <ArticleCard key={index} {...project} />
    ))}
  </div>
);
```

### Vue Integration

```vue
<template>
  <ArticleCardWrapper />
</template>

<script setup>
import ArticleCardWrapper from '@/components/ArticleCardWrapper.vue';
</script>
```

## Customization Options

### Styling

The component uses Tailwind CSS classes and can be customized through:

1. **className prop**: Pass additional CSS classes
2. **CSS Variables**: Override design tokens
3. **Inline Styles**: For specific customizations

### Animation Customization

The animations can be modified by adjusting the variants:

```typescript
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { 
    y: -5, 
    scale: 1.02, 
    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.15)" 
  },
};
```

### Data Customization

1. **Images**: Use high-quality images (Unsplash recommended)
2. **Tags**: Customize tag colors and styles
3. **Dates**: Format dates as needed
4. **Locations**: Add any location information
5. **Content**: Customize titles and descriptions

## Integration in Current Project

### Home Page Integration

The component is integrated into the Home page at:
- Section ID: `#featured-projects`
- Container: `articleCardContainer`
- Demo: `ArticleCardPortfolioDemo`

### Portfolio Demo Content

The portfolio demo showcases:
- **Healthcare Platform** - Web development project
- **Tech Conference 2024** - Photography project
- **E-commerce Mobile App** - Mobile development project

## Dependencies

- **React**: ^19.0.0
- **framer-motion**: ^12.29.2 (already installed)
- **lucide-react**: ^0.563.0 (already installed)
- **@/lib/utils**: Utility functions (cn helper)

## Animation Details

### Card Animations

- **Initial**: Fade in from bottom (opacity: 0, y: 20)
- **Animate**: Fade to full opacity and position (opacity: 1, y: 0)
- **Hover**: Lift up and scale slightly (y: -5, scale: 1.02)
- **Shadow**: Enhanced shadow on hover

### Image Animations

- **Hover**: Scale up slightly (scale: 1.1)
- **Duration**: 0.4s ease-out transition

## Responsive Behavior

- **Desktop**: Cards in grid layout (1-3 columns)
- **Tablet**: 2-column layout
- **Mobile**: Single column layout
- **Aspect Ratio**: Images maintain 16:10 aspect ratio

## Performance Considerations

- Images are optimized with proper alt text
- Component uses React.memo for optimization
- Proper cleanup on unmount to prevent memory leaks
- Efficient animation performance with Framer Motion

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Chrome 57+
- Firefox 52+
- Safari 10.1+
- Edge 16+

## Troubleshooting

### Common Issues

1. **Images not loading**: Check image URLs and ensure they're accessible
2. **Animations not working**: Verify framer-motion is properly installed
3. **TypeScript errors**: Ensure proper prop types are passed
4. **Layout issues**: Check Tailwind CSS configuration

### Debug Tips

1. Check browser console for errors
2. Verify image URLs are accessible
3. Ensure proper React component mounting
4. Check responsive behavior with browser dev tools

## Future Enhancements

Potential improvements to consider:

1. **Lazy Loading**: Implement intersection observer for better performance
2. **Click Actions**: Add onClick handlers for card interactions
3. **Loading States**: Add skeleton loading states
4. **Variants**: Create different card layouts and styles
5. **Accessibility**: Enhanced ARIA labels and screen reader support
6. **Theming**: Dark/light mode support
7. **More Animations**: Additional entrance and exit animations

## Design System Integration

The ArticleCard component integrates seamlessly with your existing design system:

- **Colors**: Uses shadcn/ui color tokens
- **Typography**: Consistent with your site's typography scale
- **Spacing**: Follows your spacing system
- **Borders**: Uses your border radius system
- **Shadows**: Consistent with your shadow system
