import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, ExternalLink, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Manu Homeopathy Clinic & Research Center",
      subContent: "Karnataka, India",
      link: "https://maps.google.com/?q=Manu+Homeopathy+Clinic+Research+Center",
      linkText: "Get Directions"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 98765 43210",
      subContent: "For appointments and enquiries",
      link: "tel:+919876543210"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "contact@manuhomeopathy.com",
      subContent: "We respond within 24 hours",
      link: "mailto:contact@manuhomeopathy.com"
    },
    {
      icon: Clock,
      title: "Clinic Hours",
      content: "Monday - Saturday",
      subContent: "10:00 AM - 7:00 PM | Sunday: Closed"
    }
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
                <Send className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Get In Touch</span>
              </div>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Contact <span className="text-primary">Us</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Have questions about homeopathy or want to schedule an appointment? 
                We're here to help you on your journey to natural wellness.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact info */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
                  Get in Touch
                </h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-12">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                        {info.title}
                      </h3>
                      <p className="text-foreground font-medium mb-1">{info.content}</p>
                      <p className="text-muted-foreground text-sm">{info.subContent}</p>
                      {info.link && (
                        <a
                          href={info.link}
                          target={info.link.startsWith("http") ? "_blank" : undefined}
                          rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-3 hover:underline"
                        >
                          {info.linkText || "Contact"}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                {/* Map placeholder */}
                <div className="bg-card rounded-xl overflow-hidden shadow-card h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.6309395!3d12.9539974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Clinic Location"
                  />
                </div>
              </div>

              {/* Contact form */}
              <div className="bg-card rounded-2xl p-8 shadow-elevated h-fit">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      placeholder="Tell us more about your enquiry..."
                      required
                    />
                  </div>
                  <Button type="submit" variant="hero" size="xl" className="w-full">
                    Send Message
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
