import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";
import { usePublicBlogs } from "@/hooks/usePublicBlogs";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { Blog } from "@/hooks/usePublicBlogs";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { blogs } = usePublicBlogs();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await apiFetch<Blog>(`/api/blogs/${slug}`);
        setBlog({ ...data, id: data._id || data.id });
      } catch (err) {
        console.error('Failed to fetch blog:', err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);
  
  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
              Article Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/blog">
              <Button variant="hero">Back to Blog</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-24">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">Loading article...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
              Article Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/blog">
              <Button variant="hero">Back to Blog</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get related posts
  const relatedPosts = blogs
    .filter(b => b.id !== blog.id && b.published && b.category === blog.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32">
        {/* Back button */}
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Hero */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {blog.category}
                </span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{blog.createdAt}</span>
                </div>
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-elevated mb-12">
                <img
                  src={blog.image || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200'}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:font-heading prose-headings:text-foreground
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground
                  prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                  prose-li:marker:text-primary"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              Have Questions About This Topic?
            </h2>
            <p className="text-muted-foreground mb-6">
              Book a consultation with our doctors to discuss how homeopathy can help you.
            </p>
            <Link to="/book">
              <Button variant="hero" size="lg">
                Book Consultation
              </Button>
            </Link>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map(post => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400'}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
