import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useContent } from "@/hooks/useContent";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const { content } = useContent();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 sm:pt-32 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={content.heroImage || heroBg}
          alt="Natural homeopathic medicine with herbs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 animate-fade-in">
            <Leaf className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">{content.heroBadgeText}</span>
          </div>

          {/* Main heading */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-4 sm:mb-6 animate-fade-in-up">
            {content.heroTitle.includes('Homeopathy') ? (
              <>
                {content.heroTitle.split('Homeopathy')[0]}
                <span className="text-primary">Homeopathy</span>
                {content.heroTitle.split('Homeopathy')[1]}
              </>
            ) : (
              content.heroTitle
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 animate-fade-in-delay leading-relaxed">
            {content.heroSubtitle}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12 animate-fade-in-delay">
            <Link to="/book">
              <Button variant="hero" size="lg" className="w-full sm:w-auto group">
                Book Consultation
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 animate-fade-in-delay">
            {content.stats.map((stat, index) => {
              const icons = [Heart, Shield, Leaf];
              const Icon = icons[index % icons.length];
              return (
                <div key={index} className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
