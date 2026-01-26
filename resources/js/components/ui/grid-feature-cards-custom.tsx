'use client';
import { Code, Database, Globe, Smartphone, Camera, Briefcase, PenTool, Users, Shield, Zap, Target } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { FeatureCard } from '@/components/ui/grid-feature-cards';
import { useState } from 'react';

const softwareFeatures = [
	{
		title: 'Web Development',
		icon: Globe,
		description: 'Modern web applications built with Vue.js, Laravel, and TypeScript.',
	},
	{
		title: 'Mobile Apps',
		icon: Smartphone,
		description: 'Native and cross-platform mobile applications for iOS and Android.',
	},
	{
		title: 'Database Design',
		icon: Database,
		description: 'Scalable database architecture with performance optimization.',
	},
	{
		title: 'API Development',
		icon: Code,
		description: 'RESTful APIs and real-time integrations with modern frameworks.',
	},
	{
		title: 'System Architecture',
		icon: Target,
		description: 'Enterprise-grade system design and cloud architecture.',
	},
	{
		title: 'Performance',
		icon: Zap,
		description: 'Lightning-fast applications with optimized performance.',
	},
];

const photographyFeatures = [
	{
		title: 'Event Coverage',
		icon: Camera,
		description: 'Professional event photography with comprehensive coverage.',
	},
	{
		title: 'Commercial Photography',
		icon: Briefcase,
		description: 'Brand photography and commercial imaging solutions.',
	},
	{
		title: 'Portrait Sessions',
		icon: Users,
		description: 'Professional portraits for individuals and corporate teams.',
	},
	{
		title: 'Creative Direction',
		icon: PenTool,
		description: 'Artistic direction and creative concept development.',
	},
	{
		title: 'Post-Production',
		icon: Shield,
		description: 'Professional editing and retouching services.',
	},
	{
		title: 'Quick Delivery',
		icon: Zap,
		description: 'Fast turnaround with same-day editing options.',
	},
];

export default function GridFeatureCardsCustom() {
	const [activeTab, setActiveTab] = useState<'software' | 'photography'>('software');
	const currentFeatures = activeTab === 'software' ? softwareFeatures : photographyFeatures;

	return (
		<section className="py-16 md:py-32">
			<div className="mx-auto w-full max-w-5xl space-y-8 px-4">
				<AnimatedContainer className="mx-auto max-w-3xl text-center">
					<h2 className="text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl xl:font-extrabold">
						Professional Services
					</h2>
					<p className="text-muted-foreground mt-4 text-sm tracking-wide text-balance md:text-base">
						Comprehensive solutions for software development and professional photography.
					</p>
				</AnimatedContainer>

				{/* Tab Toggle */}
				<AnimatedContainer
					delay={0.2}
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
				</AnimatedContainer>

				<AnimatedContainer
					delay={0.4}
					className="mx-auto max-w-3xl text-center"
				>
					<h3 className="text-xl font-semibold tracking-wide text-balance md:text-2xl">
						{activeTab === 'software' ? 'Software Development' : 'Photography Services'}
					</h3>
					<p className="text-muted-foreground mt-2 text-sm tracking-wide text-balance">
						{activeTab === 'software' 
							? 'Building modern applications with cutting-edge technologies'
							: 'Capturing moments with professional photography and creative direction'
						}
					</p>
				</AnimatedContainer>

				<AnimatedContainer
					delay={0.6}
					className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 md:grid-cols-3"
				>
					{currentFeatures.map((feature, i) => (
						<FeatureCard key={`${activeTab}-${i}`} feature={feature} />
					))}
				</AnimatedContainer>
			</div>
		</section>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: React.ComponentProps<typeof motion.div>['className'];
	children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

// Add cn utility function
function cn(...inputs: (string | undefined)[]) {
	return inputs.filter(Boolean).join(' ');
}
