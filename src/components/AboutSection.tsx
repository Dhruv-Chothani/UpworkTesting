import { Leaf, Brain, Heart, Shield, Sparkles, Activity } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import medicineBottles from "@/assets/medicine-bottles.jpg";

const AboutSection = () => {
  const { content } = useContent();
  
  const principles = [
    {
      icon: Brain,
      title: "Mind-Body Connection",
      description: "We believe there is a mental aspect for every physical complaint, treating both mind and body together."
    },
    {
      icon: Shield,
      title: "Boost Immunity",
      description: "Our approach focuses on strengthening your inner vitality and natural defense mechanisms."
    },
    {
      icon: Leaf,
      title: "Classical Approach",
      description: "Practicing authentic classical homeopathy based on Hahnemann's principles and Dr. Vijaykar's teachings."
    },
    {
      icon: Sparkles,
      title: "Holistic Healing",
      description: "Treating from Cold to Cancer with personalized constitutional remedies for lasting wellness."
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={content.aboutImage || medicineBottles}
                alt="Homeopathic medicine bottles with natural herbs"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 bg-card rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-elevated max-w-xs animate-float">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-primary flex items-center justify-center">
                  <Activity className="w-5 h-5 lg:w-7 lg:h-7 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-heading text-2xl lg:text-3xl font-bold text-foreground">1998</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">Established</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">About Our Clinic</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              {content.aboutTitle.includes('Classical Homeopathy') ? (
                <>
                  {content.aboutTitle.split('Classical Homeopathy')[0]}
                  <span className="text-primary">Classical Homeopathy</span>
                  {content.aboutTitle.split('Classical Homeopathy')[1]}
                </>
              ) : (
                content.aboutTitle
              )}
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              {content.aboutDescription}
            </p>

            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {principles.map((principle, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-lg lg:rounded-xl p-4 lg:p-5 shadow-card hover:shadow-elevated transition-shadow duration-300"
                >
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 lg:mb-4">
                    <principle.icon className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-base lg:text-lg font-semibold text-foreground mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
