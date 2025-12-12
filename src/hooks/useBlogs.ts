import { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '@/lib/api';

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
  date?: string;
  category: string;
  published: boolean;
}

const normalizeBlog = (blog: Partial<Blog>): Blog => ({
  id: (blog._id as string) || blog.id || crypto.randomUUID(),
  _id: blog._id,
  title: blog.title || '',
  slug: blog.slug || '',
  excerpt: blog.excerpt || '',
  content: blog.content || '',
  image: blog.image || '',
  author: blog.author || 'Admin',
  createdAt:
    blog.createdAt ||
    (blog as any)?.date ||
    new Date().toISOString().split('T')[0],
  date:
    blog.createdAt ||
    (blog as any)?.date ||
    new Date().toISOString().split('T')[0],
  category: blog.category || 'General',
  published:
    typeof blog.published === 'boolean' ? blog.published : false,
});

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBlogs = useCallback(async (adminView = false) => {
    try {
      setLoading(true);
      setError(null);
      const endpoint = adminView ? '/api/blogs/all' : '/api/blogs';
      const data = await apiFetch<Blog[]>(endpoint, { credentials: 'include' });
      setBlogs(data.map(normalizeBlog));
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const addBlog = async (blog: Omit<Blog, 'id' | 'createdAt' | '_id'>) => {
    const created = await apiFetch<Blog>('/api/blogs', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(blog),
    });
    const normalized = normalizeBlog(created);
    setBlogs([normalized, ...blogs]);
    return normalized;
  };

  const updateBlog = async (id: string, updates: Partial<Blog>) => {
    const updated = await apiFetch<Blog>(`/api/blogs/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(updates),
    });
    const normalized = normalizeBlog(updated);
    setBlogs(blogs.map((b) => (b.id === id || b._id === id ? normalized : b)));
    return normalized;
  };

  const deleteBlog = async (id: string) => {
    await apiFetch(`/api/blogs/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    setBlogs(blogs.filter((b) => b.id !== id && b._id !== id));
  };

  const getBlogBySlug = (slug: string) => blogs.find((b) => b.slug === slug);

  return {
    blogs,
    loading,
    error,
    addBlog,
    updateBlog,
    deleteBlog,
    getBlogBySlug,
    reload: () => loadBlogs(true),
  };
};
