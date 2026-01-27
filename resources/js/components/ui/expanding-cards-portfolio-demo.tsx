// expanding-cards-portfolio-demo.tsx
import {
  Code,
  Camera,
  Smartphone,
  Database,
  Globe,
  Palette,
  Zap,
  Users,
} from "lucide-react";
import { ExpandingCards, CardItem } from "@/components/ui/expanding-cards";

const portfolioProjects: CardItem[] = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Full-stack web applications built with modern frameworks like Vue.js, React, Laravel, and Node.js. Responsive design and optimal performance.",
    imgSrc:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200",
    icon: <Code size={24} />,
    linkHref: "/services#web-development",
  },
  {
    id: "mobile-apps",
    title: "Mobile Applications",
    description:
      "Cross-platform mobile solutions using React Native and modern development practices. Native performance with single codebase.",
    imgSrc:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200",
    icon: <Smartphone size={24} />,
    linkHref: "/services#mobile-apps",
  },
  {
    id: "database-design",
    title: "Database Design",
    description:
      "Scalable database architecture with PostgreSQL, MySQL, and optimization strategies. Efficient data modeling and performance tuning.",
    imgSrc:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200",
    icon: <Database size={24} />,
    linkHref: "/services#database-design",
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    description:
      "AWS deployment, infrastructure management, and cloud-native application development. Scalable and reliable cloud architecture.",
    imgSrc:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200",
    icon: <Globe size={24} />,
    linkHref: "/services#cloud-solutions",
  },
  {
    id: "photography",
    title: "Photography",
    description:
      "Professional photography services including commercial shoots, event coverage, and portrait sessions. Creative visual storytelling.",
    imgSrc:
      "https://images.unsplash.com/photo-1542038784456-6678ad4650c?auto=format&fit=crop&w=1200",
    icon: <Camera size={24} />,
    linkHref: "/photography",
  },
  {
    id: "ui-design",
    title: "UI/UX Design",
    description:
      "Modern user interface design with focus on user experience. Beautiful, intuitive designs that convert and engage users.",
    imgSrc:
      "https://images.unsplash.com/photo-1559028006-44a27f925c88?auto=format&fit=crop&w=1200",
    icon: <Palette size={24} />,
    linkHref: "/services#ui-design",
  },
  {
    id: "consulting",
    title: "Technical Consulting",
    description:
      "Architecture planning, technical guidance, and strategic technology decisions. Expert advice for your digital transformation.",
    imgSrc:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200",
    icon: <Zap size={24} />,
    linkHref: "/services#technical-consulting",
  },
];

export default function ExpandingCardsPortfolioDemo() {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-8 bg-background p-4 md:p-8">
      <div className="text-center w-full max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Our Portfolio
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto">
          Explore our diverse range of services and projects. Hover or click on a card to discover what we can create together.
        </p>
      </div>
      <ExpandingCards items={portfolioProjects} defaultActiveIndex={0} />
    </div>
  );
}
