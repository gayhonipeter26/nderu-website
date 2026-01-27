import { ArticleCard, ArticleCardProps } from "@/components/ui/card-23";

const ArticleCardPortfolioDemo = () => {
  // Portfolio-related card data
  const portfolioCards: ArticleCardProps[] = [
    {
      tag: "Web Development",
      date: {
        month: "JAN",
        day: 15,
      },
      title: "Healthcare Platform",
      description:
        "Full-stack healthcare management system with patient records, appointment scheduling, and telemedicine capabilities built with Laravel and Vue.js.",
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800",
      imageAlt: "Healthcare platform interface on tablet and desktop",
      location: {
        city: "Nairobi",
        country: "Kenya",
      },
    },
    {
      tag: "Photography",
      date: {
        month: "JAN",
        day: 22,
      },
      title: "Tech Conference 2024",
      description:
        "Comprehensive photography coverage for the annual tech conference, capturing keynote speeches, networking sessions, and product launches.",
      imageUrl: "https://images.unsplash.com/photo-1540575167068-54877b29f944?auto=format&fit=crop&w=800",
      imageAlt: "Tech conference photography with speakers and audience",
      location: {
        city: "Nairobi",
        country: "Kenya",
      },
    },
    {
      tag: "Mobile Development",
      date: {
        month: "JAN",
        day: 28,
      },
      title: "E-commerce Mobile App",
      description:
        "Cross-platform mobile application for online shopping with real-time inventory, payment integration, and order tracking built with React Native.",
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800",
      imageAlt: "Mobile e-commerce app interface on smartphone",
      location: {
        city: "Mombasa",
        country: "Kenya",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Featured Projects
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto">
            Explore our latest software development projects and photography work. Each project represents our commitment to excellence and innovation.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolioCards.map((card, index) => (
            <ArticleCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleCardPortfolioDemo;
