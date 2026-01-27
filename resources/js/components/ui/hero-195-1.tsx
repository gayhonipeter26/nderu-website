"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BorderBeam } from "./border-beam";
import { TracingBeam } from "./tracing-beam";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Input } from "./input";
import { Label } from "./label";

const softwareServices = [
  {
    title: "Web Development",
    description: "Custom web applications built with modern frameworks and best practices",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&h=400&q=80",
    features: ["React/Vue/Angular", "Node.js/Python", "REST/GraphQL APIs", "Cloud Deployment"],
    price: "Starting at $5,000"
  },
  {
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android",
    image: "https://images.unsplash.com/photo-1512941937667-106a646d3a8a?auto=format&fit=crop&w=600&h=400&q=80",
    features: ["React Native", "Flutter", "iOS/Android Native", "App Store Deployment"],
    price: "Starting at $8,000"
  },
  {
    title: "E-commerce Solutions",
    description: "Complete online stores with payment processing and inventory management",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=600&h=400&q=80",
    features: ["Shopify/Custom", "Payment Integration", "Inventory Management", "Analytics Dashboard"],
    price: "Starting at $7,000"
  },
  {
    title: "API Development",
    description: "RESTful APIs and microservices for seamless data integration",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&h=400&q=80",
    features: ["REST/GraphQL", "Authentication", "Documentation", "Testing Suite"],
    price: "Starting at $3,000"
  },
  {
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and deployment solutions",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&h=400&q=80",
    features: ["AWS/Azure/GCP", "DevOps", "Monitoring", "Auto-scaling"],
    price: "Starting at $4,000"
  },
  {
    title: "Database Design",
    description: "Optimized database architecture and data management solutions",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&h=400&q=80",
    features: ["SQL/NoSQL", "Performance Optimization", "Migration", "Backup Solutions"],
    price: "Starting at $2,500"
  }
];

const Hero195 = () => {
  const [selectedService, setSelectedService] = useState(softwareServices[0]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Software Development Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your business with custom software solutions tailored to your needs
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Service Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs value={selectedService.title} onValueChange={(value: string) => {
              const service = softwareServices.find(s => s.title === value);
              if (service) setSelectedService(service);
            }}>
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 mb-6">
                {softwareServices.slice(0, 6).map((service) => (
                  <TabsTrigger key={service.title} value={service.title} className="text-xs">
                    {service.title.split(' ')[0]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {softwareServices.map((service) => (
                <TabsContent key={service.title} value={service.title} className="mt-0">
                  <Card className="relative overflow-hidden">
                    <BorderBeam />
                    <CardHeader>
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="aspect-video relative overflow-hidden rounded-lg">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold">Key Features:</h4>
                          <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                            {service.features.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-4 border-t">
                          <p className="text-lg font-semibold text-primary">{service.price}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <TracingBeam>
              <Card>
                <CardHeader>
                  <CardTitle>Get Started</CardTitle>
                  <CardDescription>
                    Tell us about your project and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Service</Label>
                    <Input
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      placeholder={selectedService.title}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Project Details</Label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project..."
                      className="w-full min-h-[120px] px-3 py-2 text-sm ring-offset-background border border-input bg-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <Button className="w-full" size="lg">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </TracingBeam>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Card className="relative overflow-hidden">
            <BorderBeam colorFrom="#3b82f6" colorTo="#8b5cf6" />
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to start your project?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join hundreds of businesses that have transformed their operations with our custom software solutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="relative">
                  Start Your Project
                  <BorderBeam size={300} />
                </Button>
                <Button variant="outline" size="lg">
                  View Portfolio
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero195;
