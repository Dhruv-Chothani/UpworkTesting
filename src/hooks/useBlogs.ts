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
  category: string;
  published: boolean;
  createdAt?: string;
  date?: string;
  // For file uploads during editing
  _imageFile?: File;
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
      const data = await apiFetch<Blog[]>(`/api/blogs${adminView ? '/admin' : ''}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });
      setBlogs(Array.isArray(data) ? data.map(normalizeBlog) : []);
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

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    
    const { imageUrl } = await apiFetch<{ imageUrl: string }>('/api/blogs/upload', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    
    if (!imageUrl) {
      throw new Error('Failed to upload image');
    }
    
    return imageUrl;
  };

  const addBlog = async (blogData: Omit<Blog, 'id' | 'createdAt' | '_id'>) => {
    try {
      // If there's an image file, upload it first
      let imageUrl = blogData.image;
      if (blogData.image && typeof blogData.image !== 'string') {
        imageUrl = await uploadImage(blogData.image as unknown as File);
      }
      
      const blogToCreate = {
        ...blogData,
        image: imageUrl,
      };
      
      const created = await apiFetch<Blog>('/api/blogs', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogToCreate),
      });
      
      const normalized = normalizeBlog(created);
      setBlogs(prev => [normalized, ...prev]);
      return normalized;
    } catch (error) {
      console.error('Error adding blog:', error);
      throw error;
    }
  };

  const updateBlog = async (id: string, updates: Partial<Blog>) => {
    try {
      // If there's a new image file, upload it first
      let imageUrl = updates.image;
      if (updates.image && typeof updates.image !== 'string') {
        imageUrl = await uploadImage(updates.image as unknown as File);
      }
      
      const blogToUpdate = {
        ...updates,
        ...(imageUrl ? { image: imageUrl } : {}),
      };
      
      const updated = await apiFetch<Blog>(`/api/blogs/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogToUpdate),
      });
      
      const normalized = normalizeBlog(updated);
      setBlogs(prev => prev.map(b => (b.id === id || b._id === id ? normalized : b)));
      return normalized;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
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
