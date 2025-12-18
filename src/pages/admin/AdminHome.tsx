import { useContent } from "@/hooks/useContent";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const AdminHome = () => {
  const { content, updateContent, loading, defaultContent } = useContent();
  const { toast } = useToast();
  const [form, setForm] = useState(content);

  useEffect(() => {
    setForm(content);
  }, [content]);

  const handleSave = async () => {
    try {
      await updateContent(form);
      toast({ title: "Saved!", description: "Home page content updated." });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save content",
        variant: "destructive",
      });
    }
  };

  const handleAddStat = () => {
    setForm({ ...form, stats: [...form.stats, { value: "", label: "" }] });
  };

  const handleAddAboutUsStat = () => {
    setForm({ 
      ...form, 
      aboutUs: {
        ...form.aboutUs,
        stats: [...(form.aboutUs?.stats || []), { value: "", label: "" }] 
      }
    });
  };

  const handleReset = () => {
    setForm(defaultContent);
    updateContent(defaultContent);
    toast({ title: "Reset", description: "Home content restored to default." });
  };

  if (loading) {
    return (
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">Edit Home Page</h1>
        <div className="bg-card rounded-xl p-4 sm:p-6 shadow-card">
          <p className="text-muted-foreground text-sm sm:text-base">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">Edit Home Page</h1>
      <div className="bg-card rounded-xl p-4 sm:p-6 shadow-card space-y-4 sm:space-y-6 max-w-2xl">
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-2">Hero Badge Text</label>
          <input
            value={form.heroBadgeText}
            onChange={(e) => setForm({ ...form, heroBadgeText: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-2">Hero Title</label>
          <input
            value={form.heroTitle}
            onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-2">Hero Subtitle</label>
          <textarea
            value={form.heroSubtitle}
            onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
            rows={3}
            className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-2">Hero Image URL</label>
          <input
            value={form.heroImage}
            onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
            placeholder="Leave empty for default"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-2">About Title</label>
          <input
            value={form.aboutTitle}
            onChange={(e) => setForm({ ...form, aboutTitle: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-2">About Description</label>
          <textarea
            value={form.aboutDescription}
            onChange={(e) => setForm({ ...form, aboutDescription: e.target.value })}
            rows={4}
            className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-2">About Image URL</label>
          <input
            value={form.aboutImage}
            onChange={(e) => setForm({ ...form, aboutImage: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
            placeholder="Leave empty for default"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs sm:text-sm font-medium">Stats</label>
            <Button size="sm" variant="outline" onClick={handleAddStat} className="text-xs sm:text-sm">
              Add Stat
            </Button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {form.stats.map((stat, index) => (
              <div key={index} className="grid grid-cols-2 gap-2 sm:gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Value</label>
                  <input
                    value={stat.value}
                    onChange={(e) => {
                      const next = [...form.stats];
                      next[index] = { ...stat, value: e.target.value };
                      setForm({ ...form, stats: next });
                    }}
                    className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                    placeholder="28+"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Label</label>
                  <input
                    value={stat.label}
                    onChange={(e) => {
                      const next = [...form.stats];
                      next[index] = { ...stat, label: e.target.value };
                      setForm({ ...form, stats: next });
                    }}
                    className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                    placeholder="Years Experience"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Separator className="my-6" />
        
        {/* About Us Section */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold">About Us Section</h2>
          
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2">Established Text</label>
            <input
              value={form.aboutUs?.establishedYear || ""}
              onChange={(e) => setForm({ 
                ...form, 
                aboutUs: { 
                  ...form.aboutUs, 
                  establishedYear: e.target.value 
                } 
              })}
              className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
              placeholder="Established 1998 • 28 Years of Healing"
            />
          </div>
          
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2">Tagline</label>
            <input
              value={form.aboutUs?.tagline || ""}
              onChange={(e) => setForm({ 
                ...form, 
                aboutUs: { 
                  ...form.aboutUs, 
                  tagline: e.target.value 
                } 
              })}
              className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
              placeholder="Classical Homeopathy for Mind & Body"
            />
          </div>
          
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2">Description</label>
            <textarea
              value={form.aboutUs?.description || ""}
              onChange={(e) => setForm({ 
                ...form, 
                aboutUs: { 
                  ...form.aboutUs, 
                  description: e.target.value 
                } 
              })}
              rows={4}
              className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
              placeholder="One of Karnataka's premier homeopathic clinics..."
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs sm:text-sm font-medium">About Us Stats</label>
              <Button size="sm" variant="outline" onClick={handleAddAboutUsStat} className="text-xs sm:text-sm">
                Add Stat
              </Button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {form.aboutUs?.stats?.map((stat, index) => (
                <div key={index} className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Value</label>
                    <input
                      value={stat.value}
                      onChange={(e) => {
                        const nextStats = [...form.aboutUs.stats];
                        nextStats[index] = { ...stat, value: e.target.value };
                        setForm({ 
                          ...form, 
                          aboutUs: { 
                            ...form.aboutUs, 
                            stats: nextStats 
                          } 
                        });
                      }}
                      className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                      placeholder="28+"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Label</label>
                    <input
                      value={stat.label}
                      onChange={(e) => {
                        const nextStats = [...form.aboutUs.stats];
                        nextStats[index] = { ...stat, label: e.target.value };
                        setForm({ 
                          ...form, 
                          aboutUs: { 
                            ...form.aboutUs, 
                            stats: nextStats 
                          } 
                        });
                      }}
                      className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
                      placeholder="Years Experience"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 sm:pt-6">
          <Button variant="hero" onClick={handleSave} className="flex-1 text-sm sm:text-base">
            Save Changes
          </Button>
          <Button variant="outline" onClick={handleReset} className="text-sm sm:text-base">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
