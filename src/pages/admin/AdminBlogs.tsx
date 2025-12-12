import { useBlogs, Blog } from "@/hooks/useBlogs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const AdminBlogs = () => {
  const { blogs, addBlog, updateBlog, deleteBlog, loading } = useBlogs();
  const { toast } = useToast();

  const [editing, setEditing] = useState<Partial<Blog> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleNewBlog = () => {
    setEditing({
      id: '',
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image: '',
      author: 'Dr. Manohara MC',
      category: 'Education',
      published: false,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    });
    setIsNew(true);
  };

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
    createdAt: new Date().toISOString(),
  };

  const handleImageUpload = async (file: File) => {
    try {
      const reader = new FileReader();
      return new Promise<string>((resolve, reject) => {
        reader.onloadend = async () => {
          try {
            // Create a preview URL
            const previewUrl = URL.createObjectURL(file);
            
            // Update the form with the preview URL immediately
            if (editing) {
              setEditing({
                ...editing,
                image: previewUrl,
                // Store the file object for upload when saving
                _imageFile: file,
              });
            }
            
            resolve(previewUrl);
          } catch (error) {
            console.error('Error processing image:', error);
            reject(error);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
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
      // Create a copy of the editing state without the _imageFile property
      const blogToSave = { ...editing };
      
      // If there's a new image file, it will be handled by the useBlogs hook
      if (blogToSave._imageFile) {
        // The image will be uploaded by the useBlogs hook
        blogToSave.image = blogToSave._imageFile as any;
      }
      
      // Remove the _imageFile property before saving
      delete blogToSave._imageFile;

      if (isNew) {
        await addBlog(blogToSave);
        toast({ title: "Blog created successfully!" });
      } else {
        await updateBlog(editing.id, blogToSave);
        toast({ title: "Blog updated successfully!" });
      }
      
      setEditing(null);
      setIsNew(false);
    } catch (error) {
      console.error('Save error:', error);
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

          {/* Image Upload */}
          <div>
            <label className="font-medium">Blog Image</label>
            <div className="mt-1 flex items-center">
              <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg border border-gray-300 transition-colors">
                <span>Choose Image</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        await handleImageUpload(file);
                      } catch (error) {
                        console.error('Error handling image upload:', error);
                        toast({
                          title: 'Error',
                          description: 'Failed to process image',
                          variant: 'destructive',
                        });
                      }
                    }
                  }}
                />
              </label>
              {editing.image && (
                <button
                  type="button"
                  onClick={() => setEditing({ ...editing, image: '' })}
                  className="ml-2 text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            {editing.image && (
              <div className="mt-2">
                <img
                  src={editing.image}
                  alt="Blog preview"
                  className="max-h-48 rounded-lg border object-cover"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {editing._imageFile ? 'New image selected' : 'Current image'}
                </p>
              </div>
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
