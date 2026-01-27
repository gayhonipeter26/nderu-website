import { ArticleCard, ArticleCardProps } from "@/components/ui/card-23";

const ArticleCardBlogDemo = ({ posts }: { posts?: any[] }) => {
  // Transform database posts to ArticleCard format
  const transformPostToCard = (post: any): ArticleCardProps => ({
    tag: post.category || 'Article',
    date: {
      month: post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short' }).toUpperCase() : 'JAN',
      day: post.published_at ? new Date(post.published_at).getDate() : 1,
    },
    title: post.title,
    description: post.summary || 'Read more about this article.',
    imageUrl: post.cover_image_url || 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800&auto=format&fit=crop',
    imageAlt: post.title || 'Blog post cover image',
    location: {
      city: 'Nairobi',
      country: 'Kenya',
    },
  });

  const blogPosts = posts ? posts.map(transformPostToCard) : [];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Blog & Insights
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto">
            Technical insights, photography tips, and industry trends. Explore our latest articles on web development, mobile apps, and creative photography.
          </p>
        </div>
        
        {blogPosts.length > 0 ? (
          <div className="grid gap-12 md:grid-cols-5">
            {blogPosts.map((post) => (
              <ArticleCard key={`post-${post.id}`} {...post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-foreground">No blog posts available</h3>
            <p className="mt-2 text-muted-foreground">
              Check back later for new articles and insights.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleCardBlogDemo;
