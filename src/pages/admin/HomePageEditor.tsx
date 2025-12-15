import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { apiFetch } from '../../lib/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';

type HomePageData = {
  heroBadgeText: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutImage: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
};

export default function HomePageEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<HomePageData>({
    defaultValues: {
      heroBadgeText: 'Established 1998 • 28 Years of Healing',
      heroTitle: 'Classical Homeopathy for Mind & Body',
      heroSubtitle: 'One of Karnataka\'s premier homeopathic clinics practicing classical homeopathy influenced by the teachings of Dr. Prafful Vijaykar. We treat the whole person — boosting immunity and inner strength while addressing both mental and physical aspects.',
      heroImage: '',
      aboutTitle: 'Healing Through Classical Homeopathy',
      aboutDescription: 'Established in 1998, Manu Homeopathy Clinic & Research Center is one of the few homeopathic clinics in Karnataka where classical homeopathy is practiced. Influenced by the profound teachings of Dr. Prafful Vijaykar, we have been successfully treating patients with ailments ranging from common colds to complex diseases for over 28 years.',
      aboutImage: '',
      stats: [
        { value: '28+', label: 'Years Experience' },
        { value: '10K+', label: 'Patients Treated' },
        { value: '100%', label: 'Natural Remedies' }
      ]
    }
  });

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        const data = await apiFetch<HomePageData>('/api/homepage');
        console.log('Fetched homepage data:', data);
        
        if (!data.stats || data.stats.length === 0) {
          data.stats = [
            { value: '28+', label: 'Years Experience' },
            { value: '10K+', label: 'Patients Treated' },
            { value: '100%', label: 'Natural Remedies' }
          ];
        }
        
        reset(data);
      } catch (error) {
        console.error('Error fetching homepage:', error);
        toast.error('Failed to load homepage content');
        
        reset({
          heroBadgeText: 'Established 1998 • 28 Years of Healing',
          heroTitle: 'Classical Homeopathy for Mind & Body',
          heroSubtitle: 'One of Karnataka\'s premier homeopathic clinics practicing classical homeopathy influenced by the teachings of Dr. Prafful Vijaykar. We treat the whole person — boosting immunity and inner strength while addressing both mental and physical aspects.',
          heroImage: '',
          aboutTitle: 'Healing Through Classical Homeopathy',
          aboutDescription: 'Established in 1998, Manu Homeopathy Clinic & Research Center is one of the few homeopathic clinics in Karnataka where classical homeopathy is practiced. Influenced by the profound teachings of Dr. Prafful Vijaykar, we have been successfully treating patients with ailments ranging from common colds to complex diseases for over 28 years.',
          aboutImage: '',
          stats: [
            { value: '28+', label: 'Years Experience' },
            { value: '10K+', label: 'Patients Treated' },
            { value: '100%', label: 'Natural Remedies' }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHomePage();
  }, [reset]);

  const onSubmit = async (data: HomePageData) => {
    try {
      setSaving(true);
      await apiFetch('/api/homepage', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('Homepage updated successfully!');
    } catch (error) {
      console.error('Error updating homepage:', error);
      toast.error('Failed to update homepage');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Home Page</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Hero Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Hero Section</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hero Badge Text
              </label>
              <input
                type="text"
                {...register('heroBadgeText')}
                className="w-full p-2 border rounded"
                placeholder="Established 1998 • 28 Years of Healing"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hero Title *
              </label>
              <input
                type="text"
                {...register('heroTitle', { required: 'Title is required' })}
                className="w-full p-2 border rounded"
                placeholder="Classical Homeopathy for Mind & Body"
              />
              {errors.heroTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.heroTitle.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hero Subtitle
              </label>
              <textarea
                {...register('heroSubtitle')}
                rows={4}
                className="w-full p-2 border rounded"
                placeholder="One of Karnataka's premier homeopathic clinics..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hero Image URL (Leave empty for default)
              </label>
              <input
                type="text"
                {...register('heroImage')}
                className="w-full p-2 border rounded"
                placeholder="https://example.com/hero-image.jpg"
              />
            </div>
          </div>
          
          {/* About Section */}
          <div className="space-y-4 pt-6 border-t">
            <h2 className="text-xl font-semibold">About Section</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                About Title
              </label>
              <input
                type="text"
                {...register('aboutTitle')}
                className="w-full p-2 border rounded"
                placeholder="Healing Through Classical Homeopathy"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                About Description
              </label>
              <textarea
                {...register('aboutDescription')}
                rows={6}
                className="w-full p-2 border rounded"
                placeholder="Established in 1998, Manu Homeopathy Clinic & Research Center is one of the few homeopathic clinics in Karnataka where classical homeopathy is practiced..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                About Image URL (Leave empty for default)
              </label>
              <input
                type="text"
                {...register('aboutImage')}
                className="w-full p-2 border rounded"
                placeholder="https://example.com/about-image.jpg"
              />
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="space-y-4 pt-6 border-t">
            <h2 className="text-xl font-semibold">Statistics</h2>
            
            {[0, 1, 2].map((index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Value {index + 1}
                  </label>
                  <input
                    type="text"
                    {...register(`stats.${index}.value`)}
                    className="w-full p-2 border rounded"
                    placeholder={['28+', '10K+', '100%'][index]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Label {index + 1}
                  </label>
                  <input
                    type="text"
                    {...register(`stats.${index}.label`)}
                    className="w-full p-2 border rounded"
                    placeholder={['Years Experience', 'Patients Treated', 'Natural Remedies'][index]}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}