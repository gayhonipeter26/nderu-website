import React, { useState, useEffect } from "react";
import { FullScreenScrollFXFixed, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx-fixed";

const servicesSections = [
  {
    leftLabel: "Strategy",
    title: <>Digital<br/>Transformation</>,
    rightLabel: "Strategy",
    background: "https://images.unsplash.com/photo-1559028012-8e4a5e4b1d4c?auto=format&fit=crop&w=1920&q=80",
    headerTitle: "Strategic Planning",
    headerSubtitle: "Transform Your Business Vision"
  },
  {
    leftLabel: "Development",
    title: <>Full-Stack<br/>Solutions</>,
    rightLabel: "Development",
    background: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1920&q=80",
    headerTitle: "Expert Development",
    headerSubtitle: "Build Powerful Digital Solutions"
  },
  {
    leftLabel: "Photography",
    title: <>Visual<br/>Storytelling</>,
    rightLabel: "Photography",
    background: "https://images.unsplash.com/photo-1516035069371-29a1b484362e?auto=format&fit=crop&w=1920&q=80",
    headerTitle: "Creative Photography",
    headerSubtitle: "Capture Your Brand's Essence"
  },
  {
    leftLabel: "Consulting",
    title: <>Technical<br/>Expertise</>,
    rightLabel: "Consulting",
    background: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1920&q=80",
    headerTitle: "Professional Consulting",
    headerSubtitle: "Expert Technical Guidance"
  },
  {
    leftLabel: "Support",
    title: <>Ongoing<br/>Partnership</>,
    rightLabel: "Support",
    background: "https://images.unsplash.com/photo-1553877522-32f3745a5c31?auto=format&fit=crop&w=1920&q=80",
    headerTitle: "Dedicated Support",
    headerSubtitle: "Your Success is Our Priority"
  },
];

export default function FullScreenScrollFXServicesDemoFixed() {
  const apiRef = React.useRef<FullScreenFXAPI>(null);
  const [currentSection, setCurrentSection] = useState(0);

  const handleIndexChange = (index: number) => {
    setCurrentSection(index);
  };

  const currentService = servicesSections[currentSection];

  return (
    <FullScreenScrollFXFixed
      sections={servicesSections}
      header={
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: 'clamp(2rem, 6vw, 4rem)', 
            fontWeight: '300', 
            marginBottom: '1rem'
          }}>
            Our Services
          </div>
          <div style={{ 
            fontSize: 'clamp(1rem, 3vw, 2rem)', 
            fontWeight: '700', 
            opacity: '0.8',
            transition: 'all 0.8s ease-out'
          }}>
            {currentService.headerSubtitle}
          </div>
        </div>
      }
      footer={
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: '900' }}>
            Let's Build Together
          </div>
        </div>
      }
      showProgress
      durations={{ change: 0.8, snap: 1000 }}
      bgTransition="fade"
      parallaxAmount={3}
      colors={{
        text: "rgba(255,255,255,0.95)",
        overlay: "rgba(0,0,0,0.4)",
        pageBg: "#0f172a",
        stageBg: "#1e293b",
      }}
      fontFamily="'Inter', system-ui, -apple-system, sans-serif"
      gap={1.5}
      gridPaddingX={3}
      apiRef={apiRef}
      onIndexChange={handleIndexChange}
    />
  );
}
