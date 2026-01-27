"use client"

import { DynamicFrameLayout } from "@/components/ui/dynamic-frame-layout"

const portfolioFrames = [
  {
    id: 1,
    video: "https://static.cdn-luma.com/files/981e483f71aa764b/Company%20Thing%20Exported.mp4",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    corner: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16L48 16L48 48L16 48L16 16Z' stroke='%233b82f6' stroke-width='2'/%3E%3C/svg%3E",
    edgeHorizontal: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32L64 32' stroke='%233b82f6' stroke-width='2'/%3E%3C/svg%3E",
    edgeVertical: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0L32 64' stroke='%233b82f6' stroke-width='2'/%3E%3C/svg%3E",
    mediaSize: 1,
    borderThickness: 8,
    borderSize: 95,
    isHovered: false,
  },
  {
    id: 2,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/WebGL%20Exported%20(1).mp4",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    corner: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16L48 16L48 48L16 48L16 16Z' stroke='%238b5cf6' stroke-width='2'/%3E%3C/svg%3E",
    edgeHorizontal: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32L64 32' stroke='%238b5cf6' stroke-width='2'/%3E%3C/svg%3E",
    edgeVertical: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0L32 64' stroke='%238b5cf6' stroke-width='2'/%3E%3C/svg%3E",
    mediaSize: 1,
    borderThickness: 8,
    borderSize: 95,
    isHovered: false,
  },
  {
    id: 3,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Jitter%20Exported%20Poster.mp4",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    corner: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16L48 16L48 48L16 48L16 16Z' stroke='%2310b981' stroke-width='2'/%3E%3C/svg%3E",
    edgeHorizontal: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32L64 32' stroke='%2310b981' stroke-width='2'/%3E%3C/svg%3E",
    edgeVertical: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0L32 64' stroke='%2310b981' stroke-width='2'/%3E%3C/svg%3E",
    mediaSize: 1,
    borderThickness: 8,
    borderSize: 95,
    isHovered: false,
  },
  {
    id: 4,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Exported%20Web%20Video.mp4",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    corner: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16L48 16L48 48L16 48L16 16Z' stroke='%23f59e0b' stroke-width='2'/%3E%3C/svg%3E",
    edgeHorizontal: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32L64 32' stroke='%23f59e0b' stroke-width='2'/%3E%3C/svg%3E",
    edgeVertical: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0L32 64' stroke='%23f59e0b' stroke-width='2'/%3E%3C/svg%3E",
    mediaSize: 1,
    borderThickness: 8,
    borderSize: 95,
    isHovered: false,
  },
  {
    id: 5,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    corner: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16L48 16L48 48L16 48L16 16Z' stroke='%23ef4444' stroke-width='2'/%3E%3C/svg%3E",
    edgeHorizontal: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32L64 32' stroke='%23ef4444' stroke-width='2'/%3E%3C/svg%3E",
    edgeVertical: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0L32 64' stroke='%23ef4444' stroke-width='2'/%3E%3C/svg%3E",
    mediaSize: 1,
    borderThickness: 8,
    borderSize: 95,
    isHovered: false,
  },
  {
    id: 6,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    corner: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16L48 16L48 48L16 48L16 16Z' stroke='%23ec4899' stroke-width='2'/%3E%3C/svg%3E",
    edgeHorizontal: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32L64 32' stroke='%23ec4899' stroke-width='2'/%3E%3C/svg%3E",
    edgeVertical: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0L32 64' stroke='%23ec4899' stroke-width='2'/%3E%3C/svg%3E",
    mediaSize: 1,
    borderThickness: 8,
    borderSize: 95,
    isHovered: false,
  },
  {
    id: 7,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Illustration%20Exported%20(1).mp4",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    corner: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16L48 16L48 48L16 48L16 16Z' stroke='%238b5cf6' stroke-width='2'/%3E%3C/svg%3E",
    edgeHorizontal: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32L64 32' stroke='%238b5cf6' stroke-width='2'/%3E%3C/svg%3E",
    edgeVertical: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0L32 64' stroke='%238b5cf6' stroke-width='2'/%3E%3C/svg%3E",
    mediaSize: 1,
    borderThickness: 8,
    borderSize: 95,
    isHovered: false,
  },
  {
    id: 8,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Art%20Direction%20Exported.mp4",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    corner: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16L48 16L48 48L16 48L16 16Z' stroke='%2310b981' stroke-width='2'/%3E%3C/svg%3E",
    edgeHorizontal: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32L64 32' stroke='%2310b981' stroke-width='2'/%3E%3C/svg%3E",
    edgeVertical: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0L32 64' stroke='%2310b981' stroke-width='2'/%3E%3C/svg%3E",
    mediaSize: 1,
    borderThickness: 8,
    borderSize: 95,
    isHovered: false,
  },
  {
    id: 9,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Product%20Video.mp4",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    corner: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16L48 16L48 48L16 48L16 16Z' stroke='%23f59e0b' stroke-width='2'/%3E%3C/svg%3E",
    edgeHorizontal: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32L64 32' stroke='%23f59e0b' stroke-width='2'/%3E%3C/svg%3E",
    edgeVertical: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0L32 64' stroke='%23f59e0b' stroke-width='2'/%3E%3C/svg%3E",
    mediaSize: 1,
    borderThickness: 8,
    borderSize: 95,
    isHovered: false,
  },
]

export function DynamicFrameLayoutDemo() {
  return (
    <div className="h-screen w-screen bg-zinc-900">
      <DynamicFrameLayout 
        frames={portfolioFrames} 
        className="w-full h-full" 
        showFrames={true}
        hoverSize={6}
        gapSize={4}
      />
    </div>
  )
}
