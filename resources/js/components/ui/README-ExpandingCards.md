# ExpandingCards Component Documentation

## Overview

The ExpandingCards component is an interactive React component that displays a grid of cards that expand when hovered or clicked, creating an engaging visual effect for showcasing portfolios, projects, or any visual content.

## Features

- **Responsive Design**: Adapts between desktop (horizontal) and mobile (vertical) layouts
- **Smooth Animations**: CSS transitions for expanding/collapsing effects
- **Interactive**: Hover and click interactions
- **Customizable**: Configurable items, default active index, and styling
- **Accessible**: Proper keyboard navigation and focus management
- **TypeScript**: Full type safety with defined interfaces

## Files Created

1. **`expanding-cards.tsx`** - Main component implementation
2. **`expanding-cards-demo.tsx`** - Demo with architectural wonders
3. **`expanding-cards-portfolio-demo.tsx`** - Portfolio-specific demo
4. **`ExpandingCardsWrapper.vue`** - Vue wrapper component
5. **`ExpandingCardsReactWrapper.tsx`** - React wrapper utilities
6. **`ExpandingCardsDemo.vue`** - Standalone demo page

## Component Interface

### CardItem Interface

```typescript
export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  icon: React.ReactNode;
  linkHref: string;
}
```

### ExpandingCards Props

```typescript
interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}
```

## Usage Examples

### Basic Usage

```tsx
import { ExpandingCards, CardItem } from "@/components/ui/expanding-cards";

const items: CardItem[] = [
  {
    id: "1",
    title: "Project Title",
    description: "Project description here",
    imgSrc: "https://example.com/image.jpg",
    icon: <SomeIcon size={24} />,
    linkHref: "/project-details",
  },
  // ... more items
];

<ExpandingCards items={items} defaultActiveIndex={0} />
```

### Vue Integration

```vue
<template>
  <ExpandingCardsWrapper />
</template>

<script setup>
import ExpandingCardsWrapper from '@/components/ExpandingCardsWrapper.vue';
</script>
```

### Direct React Mounting

```tsx
import { renderExpandingCards } from '@/components/ui/ExpandingCardsReactWrapper';

// Mount to a container
renderExpandingCards('my-container-id');
```

## Customization

### Styling

The component uses Tailwind CSS classes and can be customized through:

1. **className prop**: Pass additional CSS classes
2. **CSS Variables**: Override design tokens
3. **Inline Styles**: For specific customizations

### Data Customization

1. **Images**: Use high-quality images (Unsplash recommended)
2. **Icons**: Use lucide-react icons or custom React components
3. **Content**: Customize titles and descriptions for your use case

## Responsive Behavior

- **Desktop (≥768px)**: Horizontal grid layout
- **Mobile (<768px)**: Vertical grid layout
- **Automatic detection**: Component detects screen size and adjusts

## Performance Considerations

- Images are loaded with `loading="lazy"` for better performance
- Component uses React.memo for optimization
- Proper cleanup on unmount to prevent memory leaks

## Integration in Current Project

### Home Page Integration

The component is integrated into the Home page at:
- Section ID: `#portfolio-showcase`
- Container: `expandingCardsContainer`
- Demo: `ExpandingCardsPortfolioDemo`

### Navigation Integration

The component links are integrated with the existing mega menu navigation system for seamless user experience.

## Dependencies

- **React**: ^19.0.0
- **lucide-react**: ^0.563.0 (already installed)
- **@/lib/utils**: Utility functions (cn helper)

## Browser Support

- Modern browsers with CSS Grid support
- Chrome 57+
- Firefox 52+
- Safari 10.1+
- Edge 16+

## Troubleshooting

### Common Issues

1. **Images not loading**: Check image URLs and ensure they're accessible
2. **Component not rendering**: Verify React mounting and container references
3. **Styling issues**: Ensure Tailwind CSS is properly configured

### Debug Tips

1. Check browser console for errors
2. Verify image URLs are accessible
3. Ensure proper React component mounting
4. Check responsive behavior with browser dev tools

## Future Enhancements

Potential improvements to consider:

1. **Lazy Loading**: Implement intersection observer for better performance
2. **Touch Gestures**: Add swipe support for mobile
3. **Accessibility**: Enhanced ARIA labels and screen reader support
4. **Theming**: Dark/light mode support
5. **Animations**: More sophisticated animation options
