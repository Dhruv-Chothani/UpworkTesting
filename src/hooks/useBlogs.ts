import { useState, useEffect } from 'react';
import { apiFetch } from '../lib/api';

export interface Blog {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  createdAt: string;
  category: string;
  published: boolean;
}

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiFetch<Blog[]>('/api/blogs/all');
      // Normalize IDs - backend uses _id, frontend expects id
      const normalized = data.map(blog => ({
        ...blog,
        id: blog._id || blog.id,
      }));
      setBlogs(normalized);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const addBlog = async (blog: Omit<Blog, 'id' | 'createdAt' | '_id'>) => {
    try {
      const newBlog = await apiFetch<Blog>('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({
          ...blog,
          createdAt: new Date().toISOString().split('T')[0],
        }),
      });
      const normalized = { ...newBlog, id: newBlog._id || newBlog.id };
      setBlogs(prev => [normalized, ...prev]);
      return normalized;
    } catch (err) {
      console.error('Failed to create blog:', err);
      throw err;
    }
  };

  const updateBlog = async (id: string, updates: Partial<Blog>) => {
    try {
      const updated = await apiFetch<Blog>(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      const normalized = { ...updated, id: updated._id || updated.id };
      setBlogs(prev => prev.map(b => b.id === id ? normalized : b));
      return normalized;
    } catch (err) {
      console.error('Failed to update blog:', err);
      throw err;
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      await apiFetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error('Failed to delete blog:', err);
      throw err;
    }
  };

  const getBlogBySlug = (slug: string) => blogs.find(b => b.slug === slug);

  return { 
    blogs, 
    loading, 
    error, 
    addBlog, 
    updateBlog, 
    deleteBlog, 
    getBlogBySlug,
    reload: fetchBlogs,
  };
};
