import React from 'react';
import { createRoot } from 'react-dom/client';
import { DemoOne } from './mega-menu-demo';

export const renderMegaMenu = (containerId: string) => {
  const container = document.getElementById(containerId);
  if (container) {
    const root = createRoot(container);
    root.render(<DemoOne />);
    return root;
  }
  return null;
};

export default MegaMenuReactWrapper;
