import TextBlockAnimation from "@/components/ui/text-block-animation";
import { ArrowDown } from "lucide-react";

export default function TextBlockAnimationDemo() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 flex flex-col">
      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* 1. HERO SECTION: Professional Services */}
        <section className="min-h-screen flex flex-col items-center justify-center relative px-6">
          <div className="max-w-4xl w-full">
            <TextBlockAnimation
              blockColor="#6366f1" // Indigo
              animateOnScroll={false}
              delay={0.2}
              duration={0.8}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight">
                Where vision meets<br />
                <span className="inline-block bg-black text-white dark:bg-white dark:text-black px-3 pb-1 rounded-md mt-2">
    Flawless Execution.
  </span>
              </h1>
            </TextBlockAnimation>
            <TextBlockAnimation
              blockColor="#10b981" // Green
              animateOnScroll={false}
              delay={1.0}
              duration={0.6}
            >
              <p className="text-xl md:text-2xl font-medium text-zinc-600 dark:text-zinc-400 mt-4">
                Services Page • Web Development, Mobile Apps, API Design, Database Architecture, Cloud Solutions, Street Photography, Studio Photography, Photo Mounting, Event Photography, Brand Photography
              </p>
            </TextBlockAnimation>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-60">
            <span className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Scroll to Explore Services
            </span>
            <ArrowDown className="w-5 h-5 text-zinc-500 dark:text-zinc-400 animate-bounce" />
          </div>

        </section>

        {/* 2. SERVICES PITCH */}
        <section className="min-h-[80vh] flex flex-col justify-center items-center px-6 py-24 bg-zinc-100/80 dark:bg-zinc-900/60">
          <div className="max-w-3xl w-full space-y-16">
            <TextBlockAnimation blockColor="#10b981" duration={0.7}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Expert Development & Photography
              </h2>
            </TextBlockAnimation>

            <TextBlockAnimation blockColor="#f59e0b" stagger={0.03}>
              <p className="text-lg md:text-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
                You stopped scrolling because the motion caught your eye.
                That&apos;s the power of <strong>professional execution</strong> and <strong>creative vision</strong> properly combined.
                I deliver exceptional results for clients who aren&apos;t satisfied with &quot;good enough.&quot;
              </p>
            </TextBlockAnimation>

            <div className="pl-6 border-l-2 border-indigo-500 dark:border-indigo-400">
              <TextBlockAnimation blockColor="#ffffff" duration={0.6}>
                <p className="text-base md:text-lg italic text-zinc-500 dark:text-zinc-400">
                  &quot;From full-stack applications to professional photography, excellence is our standard.&quot;
                </p>
              </TextBlockAnimation>
            </div>
          </div>
        </section>

        {/* 3. FOOTER: Call to Action */}
        <footer className="h-[40vh] md:h-[50vh] flex items-center justify-center border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950">
          <TextBlockAnimation blockColor="#ef4444" duration={0.8}>
            <a
              href="/contact"
              className="text-4xl md:text-6xl lg:text-7xl font-black hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Let&apos;s Work Together.
            </a>
          </TextBlockAnimation>
        </footer>
      </div>
    </div>
  );
}
