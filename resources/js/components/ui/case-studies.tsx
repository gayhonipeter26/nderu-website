import { useEffect, useState } from "react";
import { Monitor, LayoutDashboard, Users, Code, Camera, Briefcase } from "lucide-react";

// Load react-countup dynamically to avoid SSR issues
let CountUp: any = null;
const loadCountUp = async () => {
  if (!CountUp) {
    const module = await import("react-countup");
    CountUp = module.default;
  }
  return CountUp;
};

/** Hook: respects user's motion preferences */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

/** Utility: parse a metric like "98%", "3.8x", "$1,200+", "1.5M", "€23.4k" */
function parseMetricValue(raw: string) {
  const value = (raw ?? "").toString().trim();
  const m = value.match(
    /^([^\d\-+]*?)\s*([\-+]?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*([^\d\s]*)$/
  );
  if (!m) {
    return { prefix: "", end: 0, suffix: value, decimals: 0 };
  }
  const [, prefix, num, suffix] = m;
  const normalized = num.replace(/,/g, "");
  const end = parseFloat(normalized);
  const decimals = (normalized.split(".")[1]?.length ?? 0);
  return {
    prefix: prefix ?? "",
    end: isNaN(end) ? 0 : end,
    suffix: suffix ?? "",
    decimals,
  };
}

/** Small component: one animated metric */
function MetricStat({
  value,
  label,
  sub,
  duration = 1.6,
}: {
  value: string;
  label: string;
  sub?: string;
  duration?: number;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const { prefix, end, suffix, decimals } = parseMetricValue(value);
  const [CountUpComponent, setCountUpComponent] = useState<any>(null);

  useEffect(() => {
    loadCountUp().then((Component) => {
      setCountUpComponent(() => Component);
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 text-left p-6">
      <p
        className="text-2xl font-medium text-gray-900 dark:text-white sm:text-4xl"
        aria-label={`${label} ${value}`}
      >
        {prefix}
        {reduceMotion || !CountUpComponent ? (
          <span>
            {end.toLocaleString(undefined, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })}
          </span>
        ) : (
          <CountUpComponent
            end={end}
            decimals={decimals}
            duration={duration}
            separator=","
            enableScrollSpy
            scrollSpyOnce
          />
        )}
        {suffix}
      </p>
      <p className="font-medium text-gray-900 dark:text-white text-left">
        {label}
      </p>
      {sub ? (
        <p className="text-gray-600 dark:text-gray-400 text-left">{sub}</p>
      ) : null}
    </div>
  );
}

export default function CaseStudies() {
  console.log('CaseStudies component rendering');
  
  const caseStudies = [
    {
      id: 1,
      quote:
        "The custom web application transformed our business operations. We now process orders 5x faster and have complete visibility across all departments. The architecture is scalable and the user experience is exceptional.",
      name: "Sarah Chen",
      role: "CTO, RetailScale",
      image: "/assets/photos/your-photo-1.jpg", // Using your existing photo
      icon: Code,
      service: "Web Development",
      metrics: [
        { value: "5x", label: "Processing Speed", sub: "Order fulfillment" },
        { value: "98%", label: "User Satisfaction", sub: "Post-launch survey" },
      ],
    },
    {
      id: 2,
      quote:
        "The event photography coverage was outstanding. Every important moment was captured perfectly, and the final deliverables were ready ahead of schedule with stunning quality.",
      name: "David Liu",
      role: "Event Director, TechSummit",
      image: "/assets/photos/your-photo-2.jpg", // Using your existing photo
      icon: Camera,
      service: "Photography",
      metrics: [
        { value: "800+", label: "Photos Delivered", sub: "Within 48 hours" },
        { value: "100%", label: "Client Satisfaction", sub: "Based on feedback" },
      ],
    },
    {
      id: 3,
      quote:
        "The system architecture redesign was game-changing. We now handle 10x more traffic with zero downtime, and the microservices approach allows us to deploy new features independently.",
      name: "Michael Okonkwo",
      role: "Engineering Lead, DataFlow",
      image: "/assets/photos/your-photo-3.jpg", // Using your existing photo
      icon: Briefcase,
      service: "Design & Architecture",
      metrics: [
        { value: "10x", label: "Traffic Capacity", sub: "With zero downtime" },
        { value: "75%", label: "Deployment Speed", sub: "Feature releases" },
      ],
    },
  ];

  return (
    <section
      className="py-32 bg-background"
      aria-labelledby="case-studies-heading"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
          <h2
            id="case-studies-heading"
            className="text-4xl font-semibold md:text-5xl text-foreground"
          >
            What We Offer
          </h2>
          <p className="text-muted-foreground">
            Professional web development, photography, and software engineering services that deliver exceptional results.
          </p>
        </div>

        {/* Service Categories */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center justify-center gap-2">
              <Code className="h-6 w-6 text-primary" />
              Web Development
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <p>Custom Applications</p>
              <p>API Development</p>
              <p>Cloud Solutions</p>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center justify-center gap-2">
              <Camera className="h-6 w-6 text-primary" />
              Photography
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <p>Event Coverage</p>
              <p>Studio Sessions</p>
              <p>Brand Photography</p>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center justify-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              Design & Architecture
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <p>System Design</p>
              <p>Software Architecture</p>
              <p>Technical Consulting</p>
            </div>
          </div>
        </div>

        {/* Cases */}
        <div className="mt-20 flex flex-col gap-20">
          {caseStudies.map((study, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <div
                key={study.id}
                className="grid gap-12 lg:grid-cols-3 xl:gap-24 items-center border-b border-gray-200 dark:border-gray-800 pb-12"
              >
                {/* Left: Image + Quote */}
                <div
                  className={[
                    "flex flex-col sm:flex-row gap-10 lg:col-span-2 lg:border-r lg:pr-12 xl:pr-16 text-left",
                    reversed
                      ? "lg:order-2 lg:border-r-0 lg:border-l border-gray-200 dark:border-gray-800 lg:pl-12 xl:pl-16 lg:pr-0"
                      : "border-gray-200 dark:border-gray-800",
                  ].join(" ")}
                >
                  <img
                    src={study.image}
                    alt={`${study.name} portrait`}
                    className="aspect-[29/35] h-auto w-full max-w-60 rounded-2xl object-cover ring-1 ring-border hover:scale-105 transition-all duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                  <figure className="flex flex-col justify-between gap-8 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {study.service}
                      </span>
                    </div>
                    <blockquote className="text-lg sm:text-xl text-foreground leading-relaxed text-left">
                      <h3 className="text-lg sm:text-xl lg:text-xl font-normal text-gray-900 dark:text-white leading-relaxed text-left">
                        <study.icon className="h-6 w-6 mb-2 text-primary" />
                        <span className="block text-gray-500 dark:text-gray-400 text-sm sm:text-base lg:text-lg mt-2">
                          {study.quote}
                        </span>
                      </h3>
                    </blockquote>
                    <figcaption className="flex items-center gap-6 mt-4 text-left">
                      <div className="flex flex-col gap-1">
                        <span className="text-md font-medium text-foreground">
                          {study.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {study.role}
                        </span>
                      </div>
                    </figcaption>
                  </figure>
                </div>

                {/* Right: Metrics */}
                <div
                  className={[
                    "grid grid-cols-1 gap-10 self-center text-left",
                    reversed ? "lg:order-1" : "",
                  ].join(" ")}
                >
                  {study.metrics.map((metric, i) => (
                    <MetricStat
                      key={`${study.id}-${i}`}
                      value={metric.value}
                      label={metric.label}
                      sub={metric.sub}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
