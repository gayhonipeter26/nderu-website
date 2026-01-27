import React from "react";
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx";

const sections = [
  {
    leftLabel: "Silence",
    title: <>Absence</>,
    rightLabel: "Silence",
    background: "https://images.unsplash.com/photo-3289156/pexels-photo-3289156.jpeg?auto=format&fit=crop&w=1920",
  },
  {
    leftLabel: "Essence",
    title: <>Stillness</>,
    rightLabel: "Essence",
    background: "https://images.unsplash.com/photo-163790/at-night-under-a-lantern-guy-night-city-163790.jpeg?auto=format&fit=crop&w=1920",
  },
  {
    leftLabel: "Rebirth",
    title: <>Growth</>,
    rightLabel: "Rebirth",
    background: "https://images.unsplash.com/photo-9817/pexels-photo-9817.jpeg?auto=format&fit=crop&w=1920",
  },
  {
    leftLabel: "Change",
    title: <>Opportunity</>,
    rightLabel: "Change",
    background: "https://images.unsplash.com/photo-939807/pexels-photo-939807.jpeg?auto=format&fit=crop&w=1920",
  },
];

export default function FullScreenScrollFXDemo() {
  const apiRef = React.useRef<FullScreenFXAPI>(null);

  return (
    <>
      <FullScreenScrollFX
        sections={sections}
        header={<><div>The Creative</div><div>Process</div></>}
        footer={<div></div>}
        showProgress
        durations={{ change: 0.7, snap: 800 }}
      />
    </>
  );
}
