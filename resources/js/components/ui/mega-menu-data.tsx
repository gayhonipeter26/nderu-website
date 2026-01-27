import type { MegaMenuItem } from './mega-menu';
import {
  Code,
  Camera,
  Briefcase,
  FileText,
  Image,
  Users,
  Settings,
  Palette,
  Database,
  Globe,
  Shield,
  Smartphone,
  Monitor,
  Wrench,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Clock,
  Star,
  Award,
  Target,
  Zap,
  Cpu,
  Layers,
  Lightbulb,
} from 'lucide-react';

export const megaMenuData: MegaMenuItem[] = [
  {
    id: 0,
    label: 'Home',
    link: '/',
  },
  {
    id: 1,
    label: 'Services',
    link: '/services',
    subMenus: [
      {
        title: 'Development',
        items: [
          {
            label: 'Web Development',
            description: 'Full-stack web applications with modern frameworks',
            icon: Code,
            link: '/services#web-development',
          },
          {
            label: 'Mobile Apps',
            description: 'Native and cross-platform mobile solutions',
            icon: Smartphone,
            link: '/services#mobile-apps',
          },
          {
            label: 'Database Design',
            description: 'Scalable database architecture and optimization',
            icon: Database,
            link: '/services#database-design',
          },
          {
            label: 'Cloud Solutions',
            description: 'AWS deployment and infrastructure management',
            icon: Globe,
            link: '/services#cloud-solutions',
          },
        ],
      },
      {
        title: 'Photography',
        items: [
          {
            label: 'Commercial Photography',
            description: 'Professional product and brand photography',
            icon: Camera,
            link: '/services#commercial-photography',
          },
          {
            label: 'Event Coverage',
            description: 'Corporate events and special occasions',
            icon: Users,
            link: '/services#event-coverage',
          },
          {
            label: 'Portrait Sessions',
            description: 'Professional headshots and portraits',
            icon: Image,
            link: '/services#portrait-sessions',
          },
          {
            label: 'Photo Editing',
            description: 'Professional post-processing and retouching',
            icon: Palette,
            link: '/services#photo-editing',
          },
        ],
      },
      {
        title: 'Consulting',
        items: [
          {
            label: 'Technical Consulting',
            description: 'Architecture planning and technical guidance',
            icon: Lightbulb,
            link: '/services#technical-consulting',
          },
          {
            label: 'Process Optimization',
            description: 'Workflow improvement and efficiency',
            icon: Zap,
            link: '/services#process-optimization',
          },
          {
            label: 'Team Training',
            description: 'Technical skill development programs',
            icon: BookOpen,
            link: '/services#team-training',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Portfolio',
    link: '/projects',
    subMenus: [
      {
        title: 'Featured Projects',
        items: [
          {
            label: 'Web Applications',
            description: 'Recent web development projects',
            icon: Monitor,
            link: '/projects#web-applications',
          },
          {
            label: 'Mobile Solutions',
            description: 'Cross-platform mobile applications',
            icon: Smartphone,
            link: '/projects#mobile-solutions',
          },
          {
            label: 'System Architecture',
            description: 'Large-scale system designs',
            icon: Layers,
            link: '/projects#system-architecture',
          },
          {
            label: 'API Development',
            description: 'RESTful and GraphQL APIs',
            icon: Cpu,
            link: '/projects#api-development',
          },
        ],
      },
      {
        title: 'Photography Work',
        items: [
          {
            label: 'Corporate Events',
            description: 'Professional event photography',
            icon: Users,
            link: '/photography#corporate-events',
          },
          {
            label: 'Product Photography',
            description: 'Commercial product shoots',
            icon: Camera,
            link: '/photography#product-photography',
          },
          {
            label: 'Portrait Gallery',
            description: 'Professional portrait sessions',
            icon: Image,
            link: '/photography#portrait-gallery',
          },
        ],
      },
      {
        title: 'Case Studies',
        items: [
          {
            label: 'Success Stories',
            description: 'Client success stories and testimonials',
            icon: Award,
            link: '/about#success-stories',
          },
          {
            label: 'Technical Challenges',
            description: 'Complex problem-solving examples',
            icon: Target,
            link: '/about#technical-challenges',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: 'About',
    link: '/about',
    subMenus: [
      {
        title: 'Company',
        items: [
          {
            label: 'Our Story',
            description: 'Learn about our journey and mission',
            icon: BookOpen,
            link: '/about#our-story',
          },
          {
            label: 'Team',
            description: 'Meet the talented team behind Nderu.Ke',
            icon: Users,
            link: '/about#team',
          },
          {
            label: 'Values & Vision',
            description: 'Our core values and future goals',
            icon: Target,
            link: '/about#values-vision',
          },
        ],
      },
      {
        title: 'Expertise',
        items: [
          {
            label: 'Technical Skills',
            description: 'Our technical capabilities and stack',
            icon: Code,
            link: '/about#technical-skills',
          },
          {
            label: 'Creative Skills',
            description: 'Photography and design expertise',
            icon: Palette,
            link: '/about#creative-skills',
          },
          {
            label: 'Certifications',
            description: 'Professional certifications and achievements',
            icon: Award,
            link: '/about#certifications',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    label: 'Resources',
    link: '/blog',
    subMenus: [
      {
        title: 'Content',
        items: [
          {
            label: 'Blog',
            description: 'Latest articles and insights',
            icon: FileText,
            link: '/blog#blog',
          },
          {
            label: 'Tutorials',
            description: 'Step-by-step guides and tutorials',
            icon: BookOpen,
            link: '/blog#tutorials',
          },
          {
            label: 'Case Studies',
            description: 'Detailed project breakdowns',
            icon: Briefcase,
            link: '/blog#case-studies',
          },
        ],
      },
      {
        title: 'Tools & Resources',
        items: [
          {
            label: 'Development Tools',
            description: 'Recommended tools and software',
            icon: Wrench,
            link: '/blog#development-tools',
          },
          {
            label: 'Best Practices',
            description: 'Industry best practices and standards',
            icon: Shield,
            link: '/blog#best-practices',
          },
          {
            label: 'Templates',
            description: 'Free templates and resources',
            icon: Layers,
            link: '/blog#templates',
          },
        ],
      },
    ],
  },
  {
    id: 5,
    label: 'Contact',
    link: '/contact',
    subMenus: [
      {
        title: 'Get in Touch',
        items: [
          {
            label: 'Send Message',
            description: 'Contact us through our form',
            icon: Mail,
            link: '/contact#send-message',
          },
          {
            label: 'Schedule Call',
            description: 'Book a consultation call',
            icon: Phone,
            link: '/contact#schedule-call',
          },
          {
            label: 'Visit Office',
            description: 'Our physical location and hours',
            icon: MapPin,
            link: '/contact#visit-office',
          },
        ],
      },
      {
        title: 'Support',
        items: [
          {
            label: 'Customer Support',
            description: 'Get help with our services',
            icon: Users,
            link: '/contact#customer-support',
          },
          {
            label: 'Technical Support',
            description: 'Technical assistance and troubleshooting',
            icon: Settings,
            link: '/contact#technical-support',
          },
          {
            label: 'Business Hours',
            description: 'Our availability and response times',
            icon: Clock,
            link: '/contact#business-hours',
          },
        ],
      },
    ],
  },
];
