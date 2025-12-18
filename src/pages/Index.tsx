import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import DoctorsSection from "@/components/DoctorsSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BlogPreviewSection from "@/components/BlogPreviewSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <DoctorsSection />
        <ServicesSection />
        <BlogPreviewSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
