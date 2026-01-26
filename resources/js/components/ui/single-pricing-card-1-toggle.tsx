'use client';
import React, { useState } from 'react';
import { PlusIcon, ShieldCheckIcon, Code, Camera, Briefcase, PenTool, Database, Globe, Smartphone, Palette, Video, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './badge';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { BorderTrail } from './border-trail';

export function PricingToggle() {
  const [activeTab, setActiveTab] = useState<'software' | 'photography'>('software');
  const [softwareService, setSoftwareService] = useState<'web' | 'mobile' | 'database'>('web');
  const [photographyService, setPhotographyService] = useState<'events' | 'commercial' | 'portraits'>('events');

  const softwareServices = {
    web: {
      icon: Globe,
      pricing: [
        {
          title: 'Web Development Project',
          originalPrice: '$3,499',
          price: '2,999',
          period: '/project',
          discount: '14% off',
          discountVariant: 'secondary' as const,
          description: 'Complete web application development with modern frameworks!',
          features: ['Custom web apps', 'Responsive design', 'API integration', 'Performance optimization'],
          cta: 'Start Web Project',
          isPremium: false
        },
        {
          title: 'Web Development Retainer',
          originalPrice: '$4,499',
          price: '3,499',
          period: '/month',
          discount: '22% off',
          discountVariant: 'default' as const,
          description: 'Ongoing web development support and maintenance!',
          features: ['Continuous development', 'Priority support', 'Code reviews', 'Performance monitoring'],
          cta: 'Get Web Support',
          isPremium: true
        }
      ]
    },
    mobile: {
      icon: Smartphone,
      pricing: [
        {
          title: 'Mobile App Project',
          originalPrice: '$4,999',
          price: '3,999',
          period: '/project',
          discount: '20% off',
          discountVariant: 'secondary' as const,
          description: 'Native and cross-platform mobile application development!',
          features: ['iOS/Android apps', 'Cross-platform', 'App store deployment', 'Push notifications'],
          cta: 'Start Mobile Project',
          isPremium: false
        },
        {
          title: 'Mobile App Retainer',
          originalPrice: '$5,999',
          price: '4,499',
          period: '/month',
          discount: '25% off',
          discountVariant: 'default' as const,
          description: 'Continuous mobile app development and updates!',
          features: ['Feature updates', 'Bug fixes', 'Platform updates', 'Performance optimization'],
          cta: 'Get Mobile Support',
          isPremium: true
        }
      ]
    },
    database: {
      icon: Database,
      pricing: [
        {
          title: 'Database Design Project',
          originalPrice: '$2,999',
          price: '2,499',
          period: '/project',
          discount: '17% off',
          discountVariant: 'secondary' as const,
          description: 'Database architecture and optimization services!',
          features: ['Database design', 'Performance tuning', 'Data migration', 'Security setup'],
          cta: 'Start Database Project',
          isPremium: false
        },
        {
          title: 'Database Management Retainer',
          originalPrice: '$3,999',
          price: '2,999',
          period: '/month',
          discount: '25% off',
          discountVariant: 'default' as const,
          description: 'Ongoing database management and optimization!',
          features: ['24/7 monitoring', 'Backup management', 'Performance optimization', 'Security updates'],
          cta: 'Get Database Support',
          isPremium: true
        }
      ]
    }
  };

  const photographyServices = {
    events: {
      icon: Video,
      pricing: [
        {
          title: 'Event Photography',
          originalPrice: '$1,499',
          price: '1,249',
          period: '/event',
          discount: '17% off',
          discountVariant: 'secondary' as const,
          description: 'Comprehensive event coverage with professional editing!',
          features: ['Full event coverage', 'Professional editing', 'Online gallery', 'Print rights'],
          cta: 'Book Your Event',
          isPremium: false
        },
        {
          title: 'Premium Event Package',
          originalPrice: '$2,499',
          price: '1,999',
          period: '/event',
          discount: '20% off',
          discountVariant: 'default' as const,
          description: 'Complete event photography with premium features!',
          features: ['Multiple photographers', 'Video coverage', 'Same-day edits', 'Album design'],
          cta: 'Book Premium Event',
          isPremium: true
        }
      ]
    },
    commercial: {
      icon: Briefcase,
      pricing: [
        {
          title: 'Commercial Photography',
          originalPrice: '$2,499',
          price: '1,999',
          period: '/package',
          discount: '20% off',
          discountVariant: 'secondary' as const,
          description: 'Professional commercial photography for your brand!',
          features: ['Brand photography', 'Product shots', 'Studio sessions', 'Retouching included'],
          cta: 'Book Commercial',
          isPremium: false
        },
        {
          title: 'Enterprise Commercial',
          originalPrice: '$3,999',
          price: '2,999',
          period: '/package',
          discount: '25% off',
          discountVariant: 'default' as const,
          description: 'Complete commercial photography solution for enterprises!',
          features: ['Multiple locations', 'Video integration', 'Marketing assets', 'Brand consulting'],
          cta: 'Book Enterprise',
          isPremium: true
        }
      ]
    },
    portraits: {
      icon: Users,
      pricing: [
        {
          title: 'Portrait Session',
          originalPrice: '$999',
          price: '799',
          period: '/session',
          discount: '20% off',
          discountVariant: 'secondary' as const,
          description: 'Professional portrait photography for individuals and teams!',
          features: ['Studio session', 'Wardrobe changes', 'Professional editing', 'Digital gallery'],
          cta: 'Book Portrait',
          isPremium: false
        },
        {
          title: 'Premium Portrait Package',
          originalPrice: '$1,799',
          price: '1,399',
          period: '/session',
          discount: '22% off',
          discountVariant: 'default' as const,
          description: 'Complete portrait experience with premium features!',
          features: ['Multiple locations', 'Hair/makeup artist', 'Print package', 'Album design'],
          cta: 'Book Premium Portrait',
          isPremium: true
        }
      ]
    }
  };

  const currentPricing = activeTab === 'software' 
    ? softwareServices[softwareService].pricing 
    : photographyServices[photographyService].pricing;
  
  const currentIcon = activeTab === 'software' ? Code : Camera;
  const currentSubIcon = activeTab === 'software' 
    ? softwareServices[softwareService].icon 
    : photographyServices[photographyService].icon;

  return (
    <section className="relative overflow-hidden py-24">
      <div id="pricing" className="mx-auto w-full max-w-6xl space-y-5 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl space-y-5"
        >
          <div className="flex justify-center">
            <div className="rounded-lg border px-4 py-1 font-mono">Pricing</div>
          </div>
          <h2 className="mt-5 text-center text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl">
            Professional Services Pricing
          </h2>
          <p className="text-muted-foreground mt-5 text-center text-sm md:text-base">
            Transparent pricing for {activeTab === 'software' ? 'software development' : 'professional photography'} services. No hidden fees, just quality work.
          </p>
        </motion.div>

        {/* Main Tab Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto max-w-md"
        >
          <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
            <button
              onClick={() => setActiveTab('software')}
              className={cn(
                "flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                activeTab === 'software'
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Code className="h-4 w-4" />
              Software
            </button>
            <button
              onClick={() => setActiveTab('photography')}
              className={cn(
                "flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                activeTab === 'photography'
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Camera className="h-4 w-4" />
              Photography
            </button>
          </div>
        </motion.div>

        {/* Sub-Service Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto max-w-lg"
        >
          <div className="grid grid-cols-3 gap-2 p-1 bg-muted rounded-lg">
            {activeTab === 'software' ? (
              <>
                <button
                  onClick={() => setSoftwareService('web')}
                  className={cn(
                    "flex items-center justify-center gap-1 px-3 py-2 rounded-md text-xs font-medium transition-all",
                    softwareService === 'web'
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Globe className="h-3 w-3" />
                  Web
                </button>
                <button
                  onClick={() => setSoftwareService('mobile')}
                  className={cn(
                    "flex items-center justify-center gap-1 px-3 py-2 rounded-md text-xs font-medium transition-all",
                    softwareService === 'mobile'
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Smartphone className="h-3 w-3" />
                  Mobile
                </button>
                <button
                  onClick={() => setSoftwareService('database')}
                  className={cn(
                    "flex items-center justify-center gap-1 px-3 py-2 rounded-md text-xs font-medium transition-all",
                    softwareService === 'database'
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Database className="h-3 w-3" />
                  Database
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setPhotographyService('events')}
                  className={cn(
                    "flex items-center justify-center gap-1 px-3 py-2 rounded-md text-xs font-medium transition-all",
                    photographyService === 'events'
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Video className="h-3 w-3" />
                  Events
                </button>
                <button
                  onClick={() => setPhotographyService('commercial')}
                  className={cn(
                    "flex items-center justify-center gap-1 px-3 py-2 rounded-md text-xs font-medium transition-all",
                    photographyService === 'commercial'
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Briefcase className="h-3 w-3" />
                  Commercial
                </button>
                <button
                  onClick={() => setPhotographyService('portraits')}
                  className={cn(
                    "flex items-center justify-center gap-1 px-3 py-2 rounded-md text-xs font-medium transition-all",
                    photographyService === 'portraits'
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Users className="h-3 w-3" />
                  Portraits
                </button>
              </>
            )}
          </div>
        </motion.div>

        <div className="relative">
          <div
            className={cn(
              'z--10 pointer-events-none absolute inset-0 size-full',
              'bg-[linear-gradient(to_right,--theme(--color-foreground/.2)_1px,transparent_1px),linear-gradient(to_bottom,--theme(--color-foreground/.2)_1px,transparent_1px)]',
              'bg-[size:32px_32px]',
              '[mask-image:radial-gradient(ellipse_at_center,var(--background)_10%,transparent)]',
            )}
          />

          <motion.div
            key={`${activeTab}-${activeTab === 'software' ? softwareService : photographyService}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-2xl space-y-2"
          >	
            <div className="grid md:grid-cols-2 bg-background relative border p-4">
              <PlusIcon className="absolute -top-3 -left-3  size-5.5" />
              <PlusIcon className="absolute -top-3 -right-3 size-5.5" />
              <PlusIcon className="absolute -bottom-3 -left-3 size-5.5" />
              <PlusIcon className="absolute -right-3 -bottom-3 size-5.5" />

              {currentPricing.map((plan, index) => (
                <div key={`${activeTab}-${activeTab === 'software' ? softwareService : photographyService}-${index}`} className={cn("w-full px-4 pt-5 pb-4", plan.isPremium && "relative")}>
                  {plan.isPremium && (
                    <BorderTrail
                      style={{
                        boxShadow:
                          '0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
                      }}
                      size={100}
                    />
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="leading-none font-semibold">{plan.title}</h3>
                      <div className="flex items-center gap-x-1">
                        <span className="text-muted-foreground text-sm line-through">{plan.originalPrice}</span>
                        <Badge variant={plan.discountVariant}>{plan.discount}</Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>
                  <div className="mt-10 space-y-4">
                    <div className="text-muted-foreground flex items-end gap-0.5 text-xl">
                      <span>$</span>
                      <span className="text-foreground -mb-0.5 text-4xl font-extrabold tracking-tighter md:text-5xl">
                        {plan.price}
                      </span>
                      <span>{plan.period}</span>
                    </div>
                    <Button className="w-full" variant={plan.isPremium ? "default" : "outline"} asChild>
                      <a href="/contact">{plan.cta}</a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-muted-foreground flex items-center justify-center gap-x-2 text-sm">
              <ShieldCheckIcon className="size-4" />
              <span>Full service delivery with transparent pricing and no hidden fees</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
