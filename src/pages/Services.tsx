import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Thermometer, 
  Brain, 
  Heart, 
  Baby, 
  Leaf, 
  Pill,
  Sparkles,
  Activity,
  Eye,
  Bone,
  Stethoscope,
  Apple
} from "lucide-react";

const services = [
  {
    icon: Thermometer,
    title: "Chronic Disease Management",
    description: "Long-term treatment for conditions like arthritis, asthma, diabetes, and autoimmune disorders.",
    details: "Our comprehensive approach addresses the root cause of chronic conditions, not just symptoms. Through careful case-taking and constitutional prescribing, we work to restore your body's natural balance and reduce dependence on conventional medications."
  },
  {
    icon: Brain,
    title: "Mental & Emotional Health",
    description: "Addressing anxiety, depression, stress, and emotional imbalances through constitutional treatment.",
    details: "Mental health is integral to physical wellbeing. Our treatments address conditions like anxiety, depression, ADHD, insomnia, and emotional trauma with gentle remedies that work on all levels of your being."
  },
  {
    icon: Heart,
    title: "Cardiovascular Care",
    description: "Support for heart health, blood pressure management, and circulatory system disorders.",
    details: "Homeopathy offers supportive care for cardiovascular conditions, helping to manage blood pressure, cholesterol, and circulatory issues alongside conventional treatments when needed."
  },
  {
    icon: Baby,
    title: "Pediatric Homeopathy",
    description: "Gentle, safe treatments for children's health issues from infancy through adolescence.",
    details: "Children respond beautifully to homeopathy. We treat common childhood ailments like recurrent infections, behavioral issues, developmental concerns, and allergies with safe, natural remedies."
  },
  {
    icon: Leaf,
    title: "Skin Disorders",
    description: "Natural healing for eczema, psoriasis, acne, and other dermatological conditions.",
    details: "Skin conditions often reflect internal imbalances. Our treatment goes beyond surface symptoms to address the underlying causes, leading to lasting improvement without suppressing symptoms."
  },
  {
    icon: Pill,
    title: "Allergies & Immunity",
    description: "Building natural immunity and providing relief from allergies and recurrent infections.",
    details: "Rather than suppressing allergic reactions, we work to reduce your overall sensitivity and build stronger immunity, leading to lasting relief from seasonal and chronic allergies."
  },
  {
    icon: Sparkles,
    title: "Women's Health",
    description: "Comprehensive care for hormonal imbalances, PCOS, menstrual issues, and menopause.",
    details: "From puberty through menopause, we address the full spectrum of women's health concerns including PCOS, endometriosis, fertility issues, and menopausal symptoms naturally."
  },
  {
    icon: Activity,
    title: "Cancer Support",
    description: "Complementary homeopathic support alongside conventional cancer treatments.",
    details: "Homeopathy can provide valuable supportive care during cancer treatment, helping manage side effects, boost immunity, and improve quality of life."
  },
  {
    icon: Eye,
    title: "Eye & ENT Conditions",
    description: "Treatment for recurring eye infections, sinusitis, tonsillitis, and ear problems.",
    details: "Chronic ENT issues and eye problems respond well to constitutional treatment. We address recurring infections, allergic conditions, and other ear, nose, throat, and eye concerns."
  },
  {
    icon: Bone,
    title: "Musculoskeletal Health",
    description: "Relief from joint pain, arthritis, back problems, and sports injuries.",
    details: "Our treatments address both acute and chronic musculoskeletal conditions, helping reduce pain and inflammation while promoting natural healing."
  },
  {
    icon: Stethoscope,
    title: "Respiratory Conditions",
    description: "Treatment for asthma, bronchitis, COPD, and recurring respiratory infections.",
    details: "We help manage both acute and chronic respiratory conditions, reducing the frequency of episodes and dependence on inhalers and steroids."
  },
  {
    icon: Apple,
    title: "Digestive Disorders",
    description: "Addressing IBS, acid reflux, gastritis, and other gastrointestinal issues.",
    details: "Digestive health is fundamental to overall wellbeing. We treat conditions like IBS, GERD, ulcers, and food intolerances by restoring healthy digestive function."
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 sm:pt-32">
        {/* Hero */}
        <section className="py-12 sm:py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-primary">Our Services</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6">
                Comprehensive <span className="text-primary">Homeopathic</span> Care
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                From common colds to complex conditions, we provide personalized homeopathic 
                treatment that addresses root cause, not just symptoms. Our treatments are 
                safe, gentle, and effective for all ages.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group bg-card rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary transition-colors duration-300">
                    <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                    {service.description}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                    {service.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 sm:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Treatment <span className="text-primary">Process</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Every patient receives individualized care through our comprehensive consultation process.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[
                { step: "01", title: "Initial Consultation", desc: "Detailed case-taking understanding your complete health history and current symptoms" },
                { step: "02", title: "Analysis", desc: "Thorough analysis of your case to find remedy that matches your unique constitution" },
                { step: "03", title: "Treatment", desc: "Prescription of appropriate remedy with clear dosing instructions" },
                { step: "04", title: "Follow-up", desc: "Regular follow-ups to monitor progress and adjust treatment as needed" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <span className="font-heading text-lg sm:text-xl font-bold">{item.step}</span>
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Ready to Experience Natural Healing?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Book a consultation today and discover how classical homeopathy can help 
              you achieve lasting health and wellness.
            </p>
            <Link to="/book">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Book Your Consultation
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
