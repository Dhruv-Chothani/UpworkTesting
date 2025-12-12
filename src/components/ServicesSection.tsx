import { 
  Thermometer, 
  Brain, 
  Heart, 
  Baby, 
  Leaf, 
  Pill,
  Sparkles,
  Activity
} from "lucide-react";

const services = [
  {
    icon: Thermometer,
    title: "Chronic Disease Management",
    description: "Long-term treatment for conditions like arthritis, asthma, diabetes, and autoimmune disorders."
  },
  {
    icon: Brain,
    title: "Mental & Emotional Health",
    description: "Addressing anxiety, depression, stress, and emotional imbalances through constitutional treatment."
  },
  {
    icon: Heart,
    title: "Cardiovascular Care",
    description: "Support for heart health, blood pressure management, and circulatory system disorders."
  },
  {
    icon: Baby,
    title: "Pediatric Homeopathy",
    description: "Gentle, safe treatments for children's health issues from infancy through adolescence."
  },
  {
    icon: Leaf,
    title: "Skin Disorders",
    description: "Natural healing for eczema, psoriasis, acne, and other dermatological conditions."
  },
  {
    icon: Pill,
    title: "Allergies & Immunity",
    description: "Building natural immunity and providing relief from allergies and recurrent infections."
  },
  {
    icon: Sparkles,
    title: "Women's Health",
    description: "Comprehensive care for hormonal imbalances, PCOS, menstrual issues, and menopause."
  },
  {
    icon: Activity,
    title: "Cancer Support",
    description: "Complementary homeopathic support alongside conventional cancer treatments."
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">What We Treat</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Comprehensive <span className="text-primary">Homeopathic</span> Care
          </h2>
          <p className="text-lg text-muted-foreground">
            From common colds to complex conditions, we provide personalized homeopathic 
            treatment that addresses the root cause, not just symptoms.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-primary/20"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
