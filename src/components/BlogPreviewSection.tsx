import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { usePublicBlogs } from "@/hooks/usePublicBlogs";

const BlogPreviewSection = () => {
  const { blogs } = usePublicBlogs();
  // Public blogs are already filtered to published only
  const publishedBlogs = blogs.slice(0, 3);

  if (publishedBlogs.length === 0) return null;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Health Insights</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Latest from Our <span className="text-primary">Blog</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Stay informed with articles on homeopathy, wellness tips, and natural healing approaches.
          </p>
        </div>

        {/* Blog grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {publishedBlogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.slug}`}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={blog.image || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800'}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {blog.category}
                  </span>
                  <span className="text-sm text-muted-foreground">{blog.createdAt}</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {blog.excerpt}
                </p>
                <div className="flex items-center text-primary font-medium text-sm">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/blog">
            <Button variant="outline" size="lg" className="group">
              View All Articles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
