import { useBlogs, Blog } from "@/hooks/useBlogs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const AdminBlogs = () => {
  const { blogs, addBlog, updateBlog, deleteBlog, loading } = useBlogs();
  const { toast } = useToast();

  const [editing, setEditing] = useState<Blog | null>(null);
  const [isNew, setIsNew] = useState(false);

  const emptyBlog: Blog = {
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    author: "Dr. Manohara MC",
    category: "Education",
    published: false,
    date: new Date().toISOString().split("T")[0],
  };

  const handleSave = async () => {
    if (!editing) return;

    if (!editing.title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }

    if (!editing.slug.trim()) {
      toast({ title: "Slug is required", variant: "destructive" });
      return;
    }

    try {
      if (isNew) {
        await addBlog(editing);
        toast({ title: "Blog created successfully!" });
      } else {
        await updateBlog(editing.id, editing);
        toast({ title: "Blog updated successfully!" });
      }
      setEditing(null);
      setIsNew(false);
    } catch (error) {
      toast({ 
        title: "Error", 
        description: error instanceof Error ? error.message : "Failed to save blog",
        variant: "destructive" 
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id);
        toast({ title: "Blog deleted" });
      } catch (error) {
        toast({ 
          title: "Error", 
          description: error instanceof Error ? error.message : "Failed to delete blog",
          variant: "destructive" 
        });
      }
    }
  };

  const handlePublishToggle = async (blog: Blog) => {
    try {
      await updateBlog(blog.id, { ...blog, published: !blog.published });
      toast({ title: blog.published ? "Unpublished" : "Published" });
    } catch (error) {
      toast({ 
        title: "Error", 
        description: error instanceof Error ? error.message : "Failed to update blog",
        variant: "destructive" 
      });
    }
  };

  // ---------------------------------------------
  // EDIT MODE
  // ---------------------------------------------
  if (editing) {
    return (
      <div>
        <h1 className="font-heading text-3xl font-bold mb-8">
          {isNew ? "Create New Blog" : "Edit Blog"}
        </h1>

        <div className="bg-card rounded-xl p-6 shadow-card space-y-4 max-w-3xl">

          {/* Title */}
          <div>
            <label className="font-medium">Title</label>
            <input
              value={editing.title}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  title: e.target.value,

                  // ✅ ONLY CHANGE HERE
                  slug: isNew
                    ? e.target.value.toLowerCase().replace(/\s+/g, "-")
                    : editing.slug,
                })
              }
              placeholder="Enter blog title"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="font-medium">Slug (URL)</label>
            <input
              value={editing.slug}
              onChange={(e) =>
                setEditing({ ...editing, slug: e.target.value })
              }
              placeholder="blog-title-here"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <p className="text-xs text-muted-foreground">
              URL will be: /blog/{editing.slug || "example"}
            </p>
          </div>

          {/* Category + Author */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Category</label>
              <input
                value={editing.category}
                onChange={(e) =>
                  setEditing({ ...editing, category: e.target.value })
                }
                placeholder="Education, Treatment, Philosophy..."
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Author</label>
              <input
                value={editing.author}
                onChange={(e) =>
                  setEditing({ ...editing, author: e.target.value })
                }
                placeholder="Author name"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="font-medium">Image URL</label>
            <input
              value={editing.image}
              onChange={(e) =>
                setEditing({ ...editing, image: e.target.value })
              }
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border rounded-lg"
            />
            {editing.image && (
              <img
                src={editing.image}
                className="w-40 h-28 object-cover mt-2 rounded"
              />
            )}
          </div>

          {/* Excerpt */}
          <div>
            <label className="font-medium">Short Excerpt</label>
            <textarea
              value={editing.excerpt}
              onChange={(e) =>
                setEditing({ ...editing, excerpt: e.target.value })
              }
              placeholder="Short summary shown on blog list..."
              rows={2}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Content */}
          <div>
            <label className="font-medium">Full Content (HTML)</label>
            <textarea
              value={editing.content}
              onChange={(e) =>
                setEditing({ ...editing, content: e.target.value })
              }
              placeholder="<p>Your blog content here...</p>"
              rows={10}
              className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
            />
          </div>

          {/* Published Toggle */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={editing.published}
              onChange={(e) =>
                setEditing({ ...editing, published: e.target.checked })
              }
            />
            Published
          </label>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button variant="hero" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setEditing(null);
                setIsNew(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------
  // LIST MODE
  // ---------------------------------------------
  if (loading) {
    return (
      <div>
        <h1 className="font-heading text-3xl font-bold mb-8">Manage Blogs</h1>
        <div className="bg-card rounded-xl p-6 shadow-card">
          <p className="text-muted-foreground">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl font-bold">Manage Blogs</h1>
        <Button
          variant="hero"
          onClick={() => {
            setEditing(emptyBlog);
            setIsNew(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Blog
        </Button>
      </div>

      <div className="space-y-4">
        {blogs.length === 0 ? (
          <div className="bg-card rounded-xl p-6 shadow-card text-center">
            <p className="text-muted-foreground">No blogs yet. Create your first blog!</p>
          </div>
        ) : (
          blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-card rounded-xl p-4 shadow-card flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              {blog.image && (
                <img
                  src={blog.image}
                  alt=""
                  className="w-16 h-16 rounded object-cover"
                />
              )}
              <div>
                <p className="font-semibold">{blog.title}</p>
                <p className="text-sm text-muted-foreground">
                  {blog.category} • {blog.author}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">

              {blog.published && (
                <Link
                  to={`/blog/${blog.slug}`}
                  target="_blank"
                  className="text-blue-600"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePublishToggle(blog)}
              >
                {blog.published ? (
                  <Eye className="w-4 h-4 text-green-600" />
                ) : (
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>

              <Button variant="ghost" size="sm" onClick={() => setEditing(blog)}>
                <Edit className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(blog.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))
        )}
      </div>
    </div>
  );
};

export default AdminBlogs;
