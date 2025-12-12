import { useState, useEffect } from 'react';
import { apiFetch } from '../lib/api';

export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  heroBadgeText: string;
  heroImage: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutImage: string;
  stats: { value: string; label: string }[];
}

const defaultContent: HomeContent = {
  heroTitle: 'Classical Homeopathy for Mind & Body',
  heroSubtitle: "One of Karnataka's premier homeopathic clinics practicing classical homeopathy influenced by the teachings of Dr. Prafful Vijaykar. We treat the whole person — boosting immunity and inner strength while addressing both mental and physical aspects.",
  heroBadgeText: 'Established 1998 • 28 Years of Healing',
  heroImage: '',
  aboutTitle: 'Healing Through Classical Homeopathy',
  aboutDescription: 'Established in 1998, Manu Homeopathy Clinic & Research Center is one of the few homeopathic clinics in Karnataka where classical homeopathy is practiced. Influenced by the profound teachings of Dr. Prafful Vijaykar, we have been successfully treating patients with ailments ranging from common colds to complex diseases for over 28 years.',
  aboutImage: '',
  stats: [
    { value: '28+', label: 'Years Experience' },
    { value: '10K+', label: 'Patients Treated' },
    { value: '100%', label: 'Natural Remedies' },
  ],
};

export const useContent = () => {
  const [content, setContent] = useState<HomeContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiFetch<HomeContent>('/api/content/home');
      setContent(data);
    } catch (err) {
      console.error('Failed to fetch content:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
      // Use default content on error
      setContent(defaultContent);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const updateContent = async (newContent: Partial<HomeContent>) => {
    try {
      const updated = { ...content, ...newContent };
      const saved = await apiFetch<HomeContent>('/api/content/home', {
        method: 'PUT',
        body: JSON.stringify(updated),
      });
      setContent(saved);
      return saved;
    } catch (err) {
      console.error('Failed to update content:', err);
      throw err;
    }
  };

  return { 
    content, 
    loading, 
    error, 
    updateContent, 
    defaultContent,
    reload: fetchContent,
  };
};
