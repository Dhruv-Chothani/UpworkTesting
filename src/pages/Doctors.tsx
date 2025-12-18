import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GraduationCap, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// ✅ Doctor Images (rename files to avoid spaces)
import manohara from "@/pages/doctors/dr-manohara.jpg";
import deepa from "@/pages/doctors/Dr. Deepa Joshi .jpg";
import umme from "@/pages/doctors/Dr. Umme Hafeefa.jpg";

const doctors = [
  {
    name: "Dr. Manohara MC",
    role: "Founder & Senior Consultant",
    description:
      "With over 28 years of experience in classical homeopathy, Dr. Manohara has dedicated his life to healing through natural medicine. A pioneer in applying Dr. Prafful Vijaykar's predictive homeopathy techniques, he has successfully treated thousands of patients with conditions ranging from common ailments to complex chronic diseases.",
    specialties: [
      "Constitutional Treatment",
      "Chronic Diseases",
      "Research",
      "Cancer Support",
    ],
    education: "BHMS",
    experience: "28+ Years",
    image: manohara,
    clinic: "MANU HOMOEOPATHY CLINIC",
    address:
      "165, E & F block, Near Saibaba temple, Ramakrishnanagara, Mysuru – 570022",
    phone: "0821-2463482",
  },
  {
    name: "Dr. Deepa Joshi",
    role: "Consultant Homeopath",
    description:
      "Specializing in women's health and pediatric care, Dr. Deepa brings compassionate expertise to every consultation. Her gentle approach and deep understanding of child psychology make her especially effective in treating young patients and addressing women's unique health concerns.",
    specialties: [
      "Women's Health",
      "Pediatrics",
      "Skin Disorders",
      "Hormonal Imbalances",
    ],
    education: "BHMS",
    experience: "15+ Years",
    image: deepa,
    clinic: "MANU HOMOEOPATHY CLINIC",
    address:
      "165, E & F block, Near Saibaba temple, Ramakrishnanagara, Mysuru – 570022",
    phone: "0821-2463482",
  },
  {
    name: "Dr. Umme Hafeefa",
    role: "Consultant Homeopath",
    description:
      "Expert in treating lifestyle disorders and mental health conditions with a gentle, understanding approach. Dr. Umme's holistic approach complements her homeopathic practice, enabling her to address the mental-emotional aspects of disease with particular insight.",
    specialties: [
      "Mental Health",
      "Lifestyle Disorders",
      "Allergies",
      "Anxiety & Depression",
    ],
    education: "BHMS",
    experience: "12+ Years",
    image: umme,
    clinic: "MANU HOMOEOPATHY CLINIC",
    address:
      "165, E & F block, Near Saibaba temple, Ramakrishnanagara, Mysuru – 570022",
    phone: "0821-2463482",
  },
];

const Doctors = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32">
        {/* ===== Hero Section ===== */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Our Team</span>
            </div>

            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              Meet Our <span className="text-primary">Expert Doctors</span>
            </h1>

            <p className="text-lg text-muted-foreground">
              Our team of dedicated homeopathic physicians combines decades of
              experience with compassionate, classical homeopathic care.
            </p>
          </div>
        </section>

        {/* ===== Doctors Section ===== */}
        <section className="py-24">
          <div className="container mx-auto px-4 space-y-20">
            {doctors.map((doctor, index) => (
              <div
                key={index}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                {/* Image */}
                <div
                  className={index % 2 === 1 ? "lg:order-2" : ""}
                >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    loading="lazy"
                    className="
                      w-full
                      max-w-sm
                      mx-auto
                      h-[420px]
                      object-cover
                      object-top
                      rounded-2xl
                      shadow-elevated
                    "
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        doctor.name
                      )}&size=420&background=6366f1&color=fff&bold=true`;
                      target.onerror = null;
                    }}
                  />
                  <div className="absolute mt-4 mx-auto w-fit bg-primary text-primary-foreground rounded-xl px-6 py-3 shadow-lg">
                    <p className="font-bold">{doctor.experience}</p>
                    <p className="text-xs text-center">Experience</p>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={index % 2 === 1 ? "lg:order-1" : ""}
                >
                  <h2 className="font-heading text-3xl font-bold mb-2">
                    {doctor.name}
                  </h2>
                  <p className="text-primary font-semibold mb-4">
                    {doctor.role}
                  </p>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {doctor.description}
                  </p>

                  <h4 className="font-semibold mb-3">Specializations</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {doctor.specialties.map((specialty, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-6 text-sm text-muted-foreground mb-8">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      {doctor.education}
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary" />
                      Certified Homeopath
                    </div>
                  </div>

                  <Link to="/book">
                    <Button variant="hero" size="lg">
                      Book Appointment
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-24 bg-primary/5 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Healing Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Schedule a consultation with one of our experienced doctors and
            begin your path to holistic wellness.
          </p>
          <Link to="/book">
            <Button variant="hero" size="xl">
              Book Your Consultation
            </Button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Doctors;
