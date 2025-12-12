import { useContent } from "@/hooks/useContent";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminHome = () => {
  const { content, updateContent, loading } = useContent();
  const { toast } = useToast();
  const [form, setForm] = useState(content);

  // Update form when content loads from backend
  useEffect(() => {
    if (content) {
      setForm(content);
    }
  }, [content]);

  const handleSave = async () => {
    try {
      await updateContent(form);
      toast({ title: "Saved!", description: "Home page content updated." });
    } catch (error) {
      toast({ 
        title: "Error", 
        description: error instanceof Error ? error.message : "Failed to save content",
        variant: "destructive" 
      });
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Edit Home Page</h1>
        <div className="bg-card rounded-xl p-6 shadow-card">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Edit Home Page</h1>
      <div className="bg-card rounded-xl p-6 shadow-card space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-2">Hero Badge Text</label>
          <input value={form.heroBadgeText} onChange={e => setForm({...form, heroBadgeText: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Hero Title</label>
          <input value={form.heroTitle} onChange={e => setForm({...form, heroTitle: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
          <textarea value={form.heroSubtitle} onChange={e => setForm({...form, heroSubtitle: e.target.value})} rows={3} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Hero Image URL</label>
          <input value={form.heroImage} onChange={e => setForm({...form, heroImage: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Leave empty for default" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">About Title</label>
          <input value={form.aboutTitle} onChange={e => setForm({...form, aboutTitle: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">About Description</label>
          <textarea value={form.aboutDescription} onChange={e => setForm({...form, aboutDescription: e.target.value})} rows={4} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">About Image URL</label>
          <input value={form.aboutImage} onChange={e => setForm({...form, aboutImage: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Leave empty for default" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-4">Stats</label>
          <div className="space-y-4">
            {form.stats.map((stat, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Value</label>
                  <input
                    value={stat.value}
                    onChange={e => {
                      const newStats = [...form.stats];
                      newStats[index] = { ...stat, value: e.target.value };
                      setForm({ ...form, stats: newStats });
                    }}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="28+"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Label</label>
                  <input
                    value={stat.label}
                    onChange={e => {
                      const newStats = [...form.stats];
                      newStats[index] = { ...stat, label: e.target.value };
                      setForm({ ...form, stats: newStats });
                    }}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Years Experience"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button variant="hero" onClick={handleSave} className="w-full">Save Changes</Button>
      </div>
    </div>
  );
};

export default AdminHome;
