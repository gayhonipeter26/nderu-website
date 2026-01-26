'use client'

import { useTimeout } from "@/hooks/use-timeout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { Timer, RefreshCw, Clock, AlertCircle, Activity, Users, Building, FileText, Code, Camera, Globe } from "lucide-react"

export function UseTimeoutDemo() {
  const [activeProject, setActiveProject] = useState<'hms' | 'portfolio' | 'photography' | null>(null)
  const [delay, setDelay] = useState(3000)
  const [timeoutCount, setTimeoutCount] = useState(0)

  useTimeout(
    () => {
      if (activeProject) {
        setActiveProject(null)
        setTimeoutCount(prev => prev + 1)
      }
    },
    activeProject ? delay : null
  )

  const projects = [
    {
      id: 'hms',
      title: 'Hospital Management System',
      icon: Building,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50/50',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
      description: 'Modular HMS with consultation workflows',
      features: ['Patient Queue', 'Clinical Notes', 'Pharmacy Integration', 'Disease Classification']
    },
    {
      id: 'portfolio',
      title: 'Portfolio Website',
      icon: Code,
      color: 'text-green-500',
      bgColor: 'bg-green-50/50',
      image: 'https://images.unsplash.com/photo-1467232004584-a241e8ee4ebd?w=600&h=400&fit=crop',
      description: 'Full-stack portfolio with React/Vue integration',
      features: ['React Components', 'Vue Integration', 'TypeScript', 'Tailwind CSS']
    },
    {
      id: 'photography',
      title: 'Photography Platform',
      icon: Camera,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50/50',
      image: 'https://images.unsplash.com/photo-1542038784886-63cc5b2c5b5c?w=600&h=400&fit=crop',
      description: 'Digital photography workflow management',
      features: ['Gallery Management', 'Client Portals', 'Image Processing', 'Delivery Systems']
    }
  ]

  const currentProject = projects.find(p => p.id === activeProject)

  return (
    <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
      {/* Left Column - Current Projects Demo */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Current Projects</h3>
            <p className="text-sm text-muted-foreground">
              Click projects to see active development status and workflows
            </p>
          </div>

          {/* Project Display */}
          <div className="min-h-[200px] flex items-center justify-center p-6 rounded-lg border-2 border-dashed bg-gray-50/50">
            {currentProject ? (
              <div className="text-center space-y-3 w-full">
                <div className="relative w-full h-32 rounded-lg overflow-hidden">
                  <img 
                    src={currentProject.image} 
                    alt={currentProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-2">
                    <div className="flex items-center gap-2">
                      <currentProject.icon className="h-5 w-5 text-white animate-pulse" />
                      <span className="text-sm font-medium text-white">Active Development</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">{currentProject.title}</h4>
                  <p className="text-xs text-muted-foreground">{currentProject.description}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {currentProject.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Auto-hide in <span className="font-mono">{delay}ms</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <Globe className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Select a project to view details</p>
              </div>
            )}
          </div>

          {/* Project Toggles */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              {projects.map((project) => (
                <Button
                  key={project.id}
                  variant={activeProject === project.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveProject(project.id as any)}
                  disabled={activeProject !== null}
                >
                  <project.icon className="h-4 w-4 mr-2" />
                  {project.title}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4" />
                <span>Display Duration:</span>
              </div>
              <span className="font-mono">{delay}ms</span>
            </div>

            <Slider
              value={[delay]}
              onValueChange={([newDelay]: number[]) => setDelay(newDelay)}
              min={2000}
              max={8000}
              step={500}
              className="py-2"
            />
          </div>

          <div className="flex items-center justify-between text-sm bg-muted p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              <span>Projects viewed:</span>
            </div>
            <span className="font-mono">{timeoutCount}</span>
          </div>
        </div>
      </Card>

      {/* Right Column - Current Work Details */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">What I'm Currently Working On</h3>
            <p className="text-sm font-medium text-blue-600 mb-1">Active Development Projects</p>
            <p className="text-sm text-muted-foreground">
              Full-stack engineer and photographer delivering dependable software, systems, and visual storytelling
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Current Focus Areas</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Healthcare Management Systems (HMS) - Modular architecture</li>
                <li>Portfolio Website Development - React/Vue integration</li>
                <li>Photography Platform - Digital workflow management</li>
                <li>Modern Web Technologies - TypeScript, Tailwind CSS</li>
                <li>Full-stack Architecture - Scalable system design</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Technical Implementation</h4>
              <pre className="bg-muted p-3 rounded-md text-xs">
{`// Project Workflow Timer
useTimeout(
  () => {
    setActiveProject(null);
    updateProgress();
  },
  activeProject ? duration : null
)`}
              </pre>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Development Approach</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Modular and scalable architecture design</li>
                <li>Multi-tenant solutions for diverse clients</li>
                <li>Interactive timeout-based workflows</li>
                <li>Cross-platform compatibility (React/Vue)</li>
                <li>User-focused design and usability</li>
              </ul>
            </div>

            <div className="text-sm text-muted-foreground p-3 bg-blue-50/50 rounded-lg border border-blue-200">
              <p className="font-medium mb-1 text-blue-700">Development Philosophy:</p>
              <p className="text-xs">Building reliable, innovative solutions that bridge technology and creative industries</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
