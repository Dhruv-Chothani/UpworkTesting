import { useState, useEffect } from 'react';
import { defaultBlogs } from '@/data/defaultBlogs';
import { Blog } from './useBlogs';

const STORAGE_KEY = 'mh_blogs';

const normalizeBlog = (blog: Partial<Blog>, fallbackId?: string): Blog => {
  const createdDate =
    blog.createdAt ||
    (blog as any)?.date ||
    new Date().toISOString().split('T')[0];

  return {
    id: blog.id || blog._id || fallbackId || crypto.randomUUID(),
    _id: blog._id,
    title: blog.title || '',
    slug: blog.slug || '',
    excerpt: blog.excerpt || '',
    content: blog.content || '',
    image: blog.image || '',
    author: blog.author || 'Dr. Manohara MC',
    createdAt: createdDate,
    date: createdDate,
    category: blog.category || 'General',
    published: typeof blog.published === 'boolean' ? blog.published : false,
  };
};

const seededBlogs: Blog[] = defaultBlogs.map((blog, index) =>
  normalizeBlog(blog, `seed-${index + 1}`)
);

export const usePublicBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBlogs = () => {
    try {
      setLoading(true);
      setError(null);
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Blog[];
        setBlogs(parsed.map((b, idx) => normalizeBlog(b, `local-${idx}`)).filter(b => b.published));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seededBlogs));
        setBlogs(seededBlogs.filter(b => b.published));
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      setBlogs(seededBlogs.filter(b => b.published));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();

    const handleStorage = () => loadBlogs();
    window.addEventListener('storage', handleStorage);
    window.addEventListener('mh_blogs_updated', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('mh_blogs_updated', handleStorage);
    };
  }, []);

  const getBlogBySlug = (slug: string) => blogs.find(b => b.slug === slug);

  return { 
    blogs, 
    loading, 
    error, 
    getBlogBySlug,
  };
};

