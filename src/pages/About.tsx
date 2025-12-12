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
      <main className="pt-32">
        {/* Hero */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">About Us</span>
              </div>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                28 Years of <span className="text-primary">Classical Homeopathy</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Since 1998, Manu Homeopathy Clinic & Research Center has been a beacon of natural 
                healing in Karnataka, practicing authentic classical homeopathy influenced by 
                the profound teachings of Dr. Prafful Vijaykar.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Story & Philosophy
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    {content.aboutDescription}
                  </p>
                  <p>
                    Our clinic stands out as one of the few in Karnataka where classical homeopathy is 
                    practiced in its purest form. We don't just treat symptoms; we seek to understand 
                    the person as a whole, recognizing that every physical ailment has a mental and 
                    emotional component.
                  </p>
                  <p>
                    We strongly believe that true healing comes from boosting the patient's immunity 
                    and inner strength. Our success in treating conditions ranging from common colds 
                    to complex diseases over 28 years is a testament to the power of this approach.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src={content.aboutImage || medicineBottles}
                  alt="Homeopathic medicine"
                  className="rounded-2xl shadow-elevated"
                />
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-xl p-6">
                  <p className="font-heading text-4xl font-bold">28+</p>
                  <p className="text-sm">Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our <span className="text-primary">Journey</span>
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {item.year.slice(2)}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="bg-card rounded-xl p-6 shadow-card flex-1">
                    <p className="font-heading text-lg font-semibold text-foreground">{item.year}</p>
                    <p className="text-muted-foreground">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Our Values</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                What Guides Our Practice
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dr. Vijaykar */}
        <section className="py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Inspired by <span className="text-primary">Dr. Prafful Vijaykar</span>
                </h2>
              </div>
              <div className="bg-card rounded-2xl p-8 shadow-elevated">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Dr. Prafful Vijaykar, a renowned homeopathic physician and teacher, revolutionized 
                  the understanding of homeopathy through his concept of "Predictive Homeopathy." 
                  His teachings on understanding disease at a deeper level and the seven levels of 
                  suppression have profoundly influenced our approach to patient care.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We are proud to carry forward his legacy by practicing classical homeopathy with 
                  the same rigor and dedication to understanding each patient as a complete individual.
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
