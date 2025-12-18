import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import { Leaf, Brain, Heart, Shield, Sparkles, Activity, Award, Target, Users } from "lucide-react";
import medicineBottles from "@/assets/medicine-bottles.jpg";

const About = () => {
  const { content } = useContent();

  const timeline = [
    { year: "1998", event: "Clinic established by Dr. Manohara MC" },
    { year: "2005", event: "Expanded to include research center" },
    { year: "2010", event: "Dr. Deepa Joshi joins the team" },
    { year: "2015", event: "Treated 5000+ patients milestone" },
    { year: "2018", event: "Dr. Umme Hafeefa joins the practice" },
    { year: "2024", event: "Celebrating 26+ years of healing" },
  ];

  const values = [
    {
      icon: Target,
      title: "Precision in Treatment",
      description: "Every prescription is based on careful analysis of symptoms, matching the right remedy to your unique constitution."
    },
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We understand that healing requires not just medicine, but also empathy, patience, and genuine care for our patients."
    },
    {
      icon: Brain,
      title: "Holistic Understanding",
      description: "We consider all aspects of your health - physical, mental, and emotional - for comprehensive treatment."
    },
    {
      icon: Award,
      title: "Classical Excellence",
      description: "We adhere to the time-tested principles of classical homeopathy as taught by masters like Dr. Prafful Vijaykar."
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 sm:pt-32">
        {/* Hero */}
        <section className="py-12 sm:py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-primary">About Us</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6">
                28 Years of <span className="text-primary">Classical Homeopathy</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Since 1998, Manu Homeopathy Clinic & Research Center has been a beacon of natural 
                healing in Karnataka, practicing authentic classical homeopathy influenced by 
                profound teachings of Dr. Prafful Vijaykar.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                  Our Story & Philosophy
                </h2>
                <div className="space-y-3 sm:space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                  <p>
                    {content.aboutDescription}
                  </p>
                  <p>
                    Our clinic stands out as one of few in Karnataka where classical homeopathy is 
                    practiced in its purest form. We don't just treat symptoms; we seek to understand 
                    person as a whole, recognizing that every physical ailment has a mental and 
                    emotional component.
                  </p>
                  <p>
                    We strongly believe that true healing comes from boosting patient's immunity 
                    and inner strength. Our success in treating conditions ranging from common colds 
                    to complex diseases over 28 years is a testament to power of this approach.
                  </p>
                </div>
              </div>
              <div className="relative order-1 lg:order-2">
                <img
                  src={content.aboutImage || medicineBottles}
                  alt="Homeopathic medicine"
                  className="w-full h-auto rounded-xl lg:rounded-2xl shadow-elevated"
                />
                <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-primary text-primary-foreground rounded-lg lg:rounded-xl p-3 sm:p-6">
                  <p className="font-heading text-2xl sm:text-4xl font-bold">28+</p>
                  <p className="text-xs sm:text-sm">Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 sm:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our <span className="text-primary">Journey</span>
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-4 sm:gap-6 mb-6 sm:mb-8 last:mb-0">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs sm:text-sm">
                      {item.year.slice(2)}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="bg-card rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-card flex-1">
                    <p className="font-heading text-base sm:text-lg font-semibold text-foreground mb-1">{item.year}</p>
                    <p className="text-muted-foreground text-sm sm:text-base">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-primary">Our Values</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                What Guides Our Practice
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-card hover:shadow-elevated transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                    <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dr. Vijaykar */}
        <section className="py-16 sm:py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Inspired by <span className="text-primary">Dr. Prafful Vijaykar</span>
                </h2>
              </div>
              <div className="bg-card rounded-lg sm:rounded-2xl p-6 sm:p-8 shadow-elevated">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                  Dr. Prafful Vijaykar, a renowned homeopathic physician and teacher, revolutionized 
                  understanding of homeopathy through his concept of "Predictive Homeopathy." 
                  His teachings on understanding disease at a deeper level and seven levels of 
                  suppression have profoundly influenced our approach to patient care.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  We are proud to carry forward his legacy by practicing classical homeopathy with 
                  same rigor and dedication to understanding each patient as a complete individual.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
