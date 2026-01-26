'use client';
import React from 'react';
import { BGPattern } from '@/components/ui/bg-pattern';
import { cn } from '@/lib/utils';

export default function BGPatternCustom() {
	return (
		<div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-16">
			<div className="space-y-8">
				{/* Hero Section with Grid Pattern */}
				<div className="relative flex aspect-video flex-col items-center justify-center rounded-2xl border-2 border-dashed">
					<BGPattern variant="grid" mask="fade-edges" size={32} fill="hsl(var(--muted-foreground) / 0.15)" />
					<div className="text-center space-y-4 z-10">
						<h2 className="text-3xl font-bold tracking-tight">Hero Background</h2>
						<p className="text-muted-foreground font-mono">Grid pattern with fade-edges mask</p>
						<p className="text-sm text-muted-foreground">Perfect for hero sections and landing pages</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Services Section */}
					<div className="relative flex aspect-video flex-col items-center justify-center rounded-2xl border-2 border-dashed">
						<BGPattern variant="dots" mask="fade-center" size={20} fill="hsl(var(--primary) / 0.2)" />
						<div className="text-center space-y-2 z-10">
							<h3 className="text-xl font-bold">Services</h3>
							<p className="text-muted-foreground font-mono text-sm">Dots with fade-center</p>
						</div>
					</div>

					{/* Portfolio Section */}
					<div className="relative flex aspect-video flex-col items-center justify-center rounded-2xl border-2 border-dashed">
						<BGPattern variant="diagonal-stripes" mask="fade-y" size={16} fill="hsl(var(--secondary) / 0.25)" />
						<div className="text-center space-y-2 z-10">
							<h3 className="text-xl font-bold">Portfolio</h3>
							<p className="text-muted-foreground font-mono text-sm">Diagonal stripes with fade-y</p>
						</div>
					</div>

					{/* About Section */}
					<div className="relative flex aspect-video flex-col items-center justify-center rounded-2xl border-2 border-dashed">
						<BGPattern variant="horizontal-lines" mask="fade-right" size={12} fill="hsl(var(--accent) / 0.2)" />
						<div className="text-center space-y-2 z-10">
							<h3 className="text-xl font-bold">About</h3>
							<p className="text-muted-foreground font-mono text-sm">Horizontal lines with fade-right</p>
						</div>
					</div>

					{/* Contact Section */}
					<div className="relative flex aspect-video flex-col items-center justify-center rounded-2xl border-2 border-dashed">
						<BGPattern variant="vertical-lines" mask="fade-bottom" size={8} fill="hsl(var(--muted-foreground) / 0.15)" />
						<div className="text-center space-y-2 z-10">
							<h3 className="text-xl font-bold">Contact</h3>
							<p className="text-muted-foreground font-mono text-sm">Vertical lines with fade-bottom</p>
						</div>
					</div>
				</div>

				{/* Full Width Example */}
				<div className="relative flex aspect-video flex-col items-center justify-center rounded-2xl border-2 border-dashed">
					<BGPattern variant="checkerboard" mask="fade-top" size={24} fill="hsl(var(--border) / 0.5)" />
					<div className="text-center space-y-4 z-10">
						<h2 className="text-2xl font-bold tracking-tight">Full Width Background</h2>
						<p className="text-muted-foreground font-mono">Checkerboard with fade-top mask</p>
						<p className="text-sm text-muted-foreground">Great for section dividers and backgrounds</p>
					</div>
				</div>
			</div>
		</div>
	);
}
