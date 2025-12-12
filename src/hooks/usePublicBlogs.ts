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

export const usePublicBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        // Public endpoint - only returns published blogs
        const data = await apiFetch<Blog[]>('/api/blogs');
        // Normalize IDs
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

    fetchBlogs();
  }, []);

  const getBlogBySlug = (slug: string) => blogs.find(b => b.slug === slug);

  return { 
    blogs, 
    loading, 
    error, 
    getBlogBySlug,
  };
};

