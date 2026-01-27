"use client"

import { DynamicFrameLayout } from "@/components/ui/dynamic-frame-layout"

const photographyFrames = [
  {
    id: 1,
    video: "https://static.cdn-luma.com/files/981e483f71aa764b/Company%20Thing%20Exported.mp4",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    corner: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16L48 16L48 48L16 48L16 16Z' stroke='%23f97316' stroke-width='2'/%3E%3C/svg%3E",
    edgeHorizontal: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32L64 32' stroke='%23f97316' stroke-width='2'/%3E%3C/svg%3E",
    edgeVertical: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0L32 64' stroke='%23f97316' stroke-width='2'/%3E%3C/svg%3E",
    mediaSize: 1,
    borderThickness: 8,
    borderSize: 95,
    isHovered: false,
  },
  {
    id: 2,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/WebGL%20Exported%20(1).mp4",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    corner: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16L48 16L48 48L16 48L16 16Z' stroke='%23dc2626' stroke-width='2'/%3E%3C/svg%3E",
    edgeHorizontal: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32L64 32' stroke='%23dc2626' stroke-width='2'/%3E%3C/svg%3E",
    edgeVertical: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0L32 64' stroke='%23dc2626' stroke-width='2'/%3E%3C/svg%3E",
    mediaSize: 1,
    borderThickness: 8,
    borderSize: 95,
    isHovered: false,
  },
  {
    id: 3,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Jitter%20Exported%20Poster.mp4",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    corner: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16L48 16L48 48L16 48L16 16Z' stroke='%23ea580c' stroke-width='2'/%3E%3C/svg%3E",
    edgeHorizontal: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32L64 32' stroke='%23ea580c' stroke-width='2'/%3E%3C/svg%3E",
    edgeVertical: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0L32 64' stroke='%23ea580c' stroke-width='2'/%3E%3C/svg%3E",
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
    corner: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16L48 16L48 48L16 48L16 16Z' stroke='%23d97706' stroke-width='2'/%3E%3C/svg%3E",
    edgeHorizontal: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32L64 32' stroke='%23d97706' stroke-width='2'/%3E%3C/svg%3E",
    edgeVertical: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0L32 64' stroke='%23d97706' stroke-width='2'/%3E%3C/svg%3E",
    mediaSize: 1,
    borderThickness: 8,
    borderSize: 95,
    isHovered: false,
  },
  {
    id: 6,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    corner: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16L48 16L48 48L16 48L16 16Z' stroke='%23b45309' stroke-width='2'/%3E%3C/svg%3E",
    edgeHorizontal: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32L64 32' stroke='%23b45309' stroke-width='2'/%3E%3C/svg%3E",
    edgeVertical: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0L32 64' stroke='%23b45309' stroke-width='2'/%3E%3C/svg%3E",
    mediaSize: 1,
    borderThickness: 8,
    borderSize: 95,
    isHovered: false,
  },
  {
    id: 7,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Illustration%20Exported%20(1).mp4",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    corner: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16L48 16L48 48L16 48L16 16Z' stroke='%2392400e' stroke-width='2'/%3E%3C/svg%3E",
    edgeHorizontal: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32L64 32' stroke='%2392400e' stroke-width='2'/%3E%3C/svg%3E",
    edgeVertical: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0L32 64' stroke='%2392400e' stroke-width='2'/%3E%3C/svg%3E",
    mediaSize: 1,
    borderThickness: 8,
    borderSize: 95,
    isHovered: false,
  },
  {
    id: 8,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Art%20Direction%20Exported.mp4",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    corner: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16L48 16L48 48L16 48L16 16Z' stroke='%2378350f' stroke-width='2'/%3E%3C/svg%3E",
    edgeHorizontal: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32L64 32' stroke='%2378350f' stroke-width='2'/%3E%3C/svg%3E",
    edgeVertical: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0L32 64' stroke='%2378350f' stroke-width='2'/%3E%3C/svg%3E",
    mediaSize: 1,
    borderThickness: 8,
    borderSize: 95,
    isHovered: false,
  },
  {
    id: 9,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Product%20Video.mp4",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    corner: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16L48 16L48 48L16 48L16 16Z' stroke='%23451408' stroke-width='2'/%3E%3C/svg%3E",
    edgeHorizontal: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32L64 32' stroke='%23451408' stroke-width='2'/%3E%3C/svg%3E",
    edgeVertical: "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0L32 64' stroke='%23451408' stroke-width='2'/%3E%3C/svg%3E",
    mediaSize: 1,
    borderThickness: 8,
    borderSize: 95,
    isHovered: false,
  },
]

export function DynamicFrameLayoutPhotography() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Photography Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional photography and videography services that capture your brand's essence
          </p>
        </div>

        {/* Dynamic Frame Layout */}
        <div className="h-screen max-h-[800px] bg-zinc-900 rounded-lg overflow-hidden">
          <DynamicFrameLayout 
            frames={photographyFrames} 
            className="w-full h-full" 
            showFrames={true}
            hoverSize={6}
            gapSize={4}
          />
        </div>

        {/* Services Overview */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Professional Photography</h3>
            <p className="text-muted-foreground">Corporate events, product photography, and brand storytelling</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Video Production</h3>
            <p className="text-muted-foreground">Commercial videos, event coverage, and promotional content</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Post-Production</h3>
            <p className="text-muted-foreground">Professional editing, color grading, and retouching services</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-orange-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to capture your story?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let us help you create stunning visual content that resonates with your audience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                Book a Photoshoot
              </button>
              <button className="px-6 py-3 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
