// expanding-cards-recent-work-demo.tsx
import {
  Code,
  Camera,
  Smartphone,
  Database,
  Globe,
  Palette,
  Zap,
  Users,
  Monitor,
  Server,
  Image,
  Video,
  Settings,
  Briefcase,
} from "lucide-react";
import { ExpandingCards, CardItem } from "@/components/ui/expanding-cards";

const recentWorkProjects: CardItem[] = [
  {
    id: "healthcare-platform",
    title: "Healthcare Platform",
    description:
      "Full-stack healthcare management system with patient records, appointment scheduling, and telemedicine capabilities. Built with Laravel, Vue.js, and PostgreSQL.",
    imgSrc:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200",
    icon: <Monitor size={24} />,
    linkHref: "/projects#healthcare-platform",
  },
  {
    id: "ecommerce-mobile",
    title: "E-commerce Mobile App",
    description:
      "Cross-platform mobile application for online shopping with real-time inventory, payment integration, and order tracking. Developed with React Native.",
    imgSrc:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200",
    icon: <Smartphone size={24} />,
    linkHref: "/projects#ecommerce-mobile",
  },
  {
    id: "corporate-photography",
    title: "Corporate Photography",
    description:
      "Professional corporate headshots and team photography for tech companies. Executive portraits and office environment photography.",
    imgSrc:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200",
    icon: <Camera size={24} />,
    linkHref: "/photography#corporate-events",
  },
  {
    id: "cloud-architecture",
    title: "Cloud Architecture",
    description:
      "Scalable cloud infrastructure design and implementation using AWS services. Microservices architecture with CI/CD pipelines and monitoring.",
    imgSrc:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200",
    icon: <Server size={24} />,
    linkHref: "/projects#cloud-architecture",
  },
  {
    id: "event-coverage",
    title: "Tech Event Coverage",
    description:
      "Comprehensive photography and videography for tech conferences and product launches. Professional event documentation and media production.",
    imgSrc:
      "https://images.unsplash.com/photo-1540575167068-54877b29f944?auto=format&fit=crop&w=1200",
    icon: <Video size={24} />,
    linkHref: "/photography#event-coverage",
  },
  {
    id: "api-development",
    title: "API Development",
    description:
      "RESTful API design and development with Node.js and Express. Real-time features with WebSocket integration and comprehensive documentation.",
    imgSrc:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200",
    icon: <Database size={24} />,
    linkHref: "/projects#api-development",
  },
  {
    id: "brand-photography",
    title: "Brand Photography",
    description:
      "Creative brand photography for startups and established companies. Product photography, lifestyle shots, and brand storytelling.",
    imgSrc:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200",
    icon: <Image size={24} />,
    linkHref: "/photography#product-photography",
  },
];

export default function ExpandingCardsRecentWorkDemo() {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-8 bg-background p-4 md:p-8">
      <div className="text-center w-full max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Recent Work
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto">
          Explore our latest software development projects and photography work. From cutting-edge web applications to stunning visual storytelling.
        </p>
      </div>
      <ExpandingCards items={recentWorkProjects} defaultActiveIndex={0} />
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Hover or click on any project to learn more about our work
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/projects" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            View All Projects
          </a>
          <a 
            href="/photography" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Photography Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
