import React from "react";
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx";

const servicesSections = [
  {
    leftLabel: "Strategy",
    title: <>Digital<br/>Transformation</>,
    rightLabel: "Strategy",
    background: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920",
  },
  {
    leftLabel: "Development",
    title: <>Full-Stack<br/>Solutions</>,
    rightLabel: "Development",
    background: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1920",
  },
  {
    leftLabel: "Photography",
    title: <>Visual<br/>Storytelling</>,
    rightLabel: "Photography",
    background: "https://images.unsplash.com/photo-1511795409834-876760111969?auto=format&fit=crop&w=1920",
  },
  {
    leftLabel: "Consulting",
    title: <>Technical<br/>Expertise</>,
    rightLabel: "Consulting",
    background: "https://images.unsplash.com/photo-1559028006-44a27f925c88?auto=format&fit=crop&w=1920",
  },
  {
    leftLabel: "Support",
    title: <>Ongoing<br/>Partnership</>,
    rightLabel: "Support",
    background: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920",
  },
];

export default function FullScreenScrollFXServicesDemo() {
  const apiRef = React.useRef<FullScreenFXAPI>(null);

  return (
    <FullScreenScrollFX
      sections={servicesSections}
      header={
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: '300', marginBottom: '1rem' }}>
            Our Services
          </div>
          <div style={{ fontSize: 'clamp(1rem, 3vw, 2rem)', fontWeight: '700', opacity: '0.8' }}>
            Transform Your Digital Presence
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
      onIndexChange={(index) => {
        // Optional: Track section changes for analytics
        console.log('Services section:', index);
      }}
    />
  );
}
