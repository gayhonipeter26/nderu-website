import React from 'react';
import { createRoot } from 'react-dom/client';
import ExpandingCardsDemo from './expanding-cards-demo';

export function renderExpandingCards(containerId: string) {
  const container = document.getElementById(containerId);
  if (container) {
    const root = createRoot(container);
    root.render(
      React.createElement(React.StrictMode, null,
        React.createElement(ExpandingCardsDemo)
      )
    );
  }
}

export default ExpandingCardsDemo;
