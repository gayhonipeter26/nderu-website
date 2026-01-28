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
            link: '/services',
          },
          {
            label: 'Mobile Apps',
            description: 'Native and cross-platform mobile solutions',
            icon: Smartphone,
            link: '/services',
          },
          {
            label: 'Database Design',
            description: 'Scalable database architecture and optimization',
            icon: Database,
            link: '/services',
          },
          {
            label: 'Cloud Solutions',
            description: 'AWS deployment and infrastructure management',
            icon: Globe,
            link: '/services',
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
            link: '/services',
          },
          {
            label: 'Event Coverage',
            description: 'Corporate events and special occasions',
            icon: Users,
            link: '/services',
          },
          {
            label: 'Portrait Sessions',
            description: 'Professional headshots and portraits',
            icon: Image,
            link: '/services',
          },
          {
            label: 'Photo Editing',
            description: 'Professional post-processing and retouching',
            icon: Palette,
            link: '/services',
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
            link: '/projects',
          },
          {
            label: 'Mobile Solutions',
            description: 'Cross-platform mobile applications',
            icon: Smartphone,
            link: '/projects',
          },
          {
            label: 'System Architecture',
            description: 'Large-scale system designs',
            icon: Layers,
            link: '/projects',
          },
          {
            label: 'API Development',
            description: 'RESTful and GraphQL APIs',
            icon: Cpu,
            link: '/projects',
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
            link: '/photography',
          },
          {
            label: 'Product Photography',
            description: 'Commercial product shoots',
            icon: Camera,
            link: '/photography',
          },
          {
            label: 'Portrait Gallery',
            description: 'Professional portrait sessions',
            icon: Image,
            link: '/photography',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: 'About',
    link: '/about',
  },
  {
    id: 4,
    label: 'Blog',
    link: '/blog',
  },
  {
    id: 5,
    label: 'Contact',
    link: '/contact',
  },
];
