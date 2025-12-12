import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { usePublicBlogs } from "@/hooks/usePublicBlogs";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Blog = () => {
  const { blogs, loading } = usePublicBlogs();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Public blogs are already filtered to published only
  const publishedBlogs = blogs;
  const categories = ["All", ...new Set(publishedBlogs.map(b => b.category))];

  const filteredBlogs = publishedBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32">
        {/* Hero */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Health Insights</span>
              </div>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Our <span className="text-primary">Blog</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stay informed with articles on homeopathy, wellness tips, treatment guides, 
                and natural healing approaches from our expert doctors.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex gap-2 flex-wrap justify-center">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">Loading articles...</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog) => (
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
                      <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">By {blog.author}</span>
                        <div className="flex items-center text-primary font-medium text-sm">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
