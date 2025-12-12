import { useState, useEffect } from 'react';
import { Blog } from './useBlogs';
import { apiFetch } from '@/lib/api';

export type { Blog };

const normalizeBlog = (blog: Partial<Blog>): Blog => ({
  id: blog._id || blog.id || '',
  _id: blog._id,
  title: blog.title || '',
  slug: blog.slug || '',
  excerpt: blog.excerpt || '',
  content: blog.content || '',
  image: blog.image || '',
  author: blog.author || 'Dr. Manohara MC',
  createdAt: blog.createdAt || new Date().toISOString(),
  date: blog.date || blog.createdAt || new Date().toISOString(),
  category: blog.category || 'General',
  published: blog.published || false,
});

export const usePublicBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch published blogs from the backend
      const data = await apiFetch<Blog[]>('/api/blogs');
      
      // Normalize the blog data
      const normalizedBlogs = data.map(blog => normalizeBlog(blog));
      setBlogs(normalizedBlogs);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const getBlogBySlug = (slug: string) => {
    return blogs.find(b => b.slug === slug);
  };

  // Function to refetch blogs (useful after updates)
  const refetch = () => loadBlogs();

  return { 
    blogs, 
    loading, 
    error, 
    getBlogBySlug,
    refetch
  };
};

