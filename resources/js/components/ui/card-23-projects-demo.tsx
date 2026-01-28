import { ArticleCard, ArticleCardProps } from "@/components/ui/card-23";
import { useEffect, useState } from "react";

const ArticleCardProjectsDemo = ({ projects }: { projects?: any[] }) => {
  const [currentProjects, setCurrentProjects] = useState(projects || []);

  // Update projects when prop changes
  useEffect(() => {
    setCurrentProjects(projects || []);
  }, [projects]);

  // Transform database projects to ArticleCard format
  const transformProjectToCard = (project: any): ArticleCardProps => ({
    tag: project.category || 'Project',
    date: {
      month: project.created_at ? new Date(project.created_at).toLocaleDateString('en-US', { month: 'short' }).toUpperCase() : 'JAN',
      day: project.created_at ? new Date(project.created_at).getDate() : 1,
    },
    title: project.title,
    description: project.summary || 'Explore this amazing project and discover the technical details and creative solutions implemented.',
    imageUrl: project.hero_image_url || 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800',
    imageAlt: project.title || 'Project cover image',
    location: {
      city: project.client ? `${project.client} Client` : 'Nairobi',
      country: project.year ? `${project.year}` : 'Kenya',
    },
    githubUrl: project.meta?.github_url || project.github_url,
    liveUrl: project.meta?.live_url || project.live_url,
  });

  const projectCards = currentProjects.map(transformProjectToCard);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Our Projects
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto">
            Explore our portfolio of innovative projects. From web applications to mobile solutions, discover how we bring ideas to life with cutting-edge technology.
          </p>
        </div>

        {projectCards.length > 0 ? (
          <div className="grid gap-12 md:grid-cols-5">
            {projectCards.map((project) => (
              <ArticleCard key={`project-${project.id}`} {...project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-foreground">No projects available</h3>
            <p className="mt-2 text-muted-foreground">
              Check back later for new project showcases.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleCardProjectsDemo;
