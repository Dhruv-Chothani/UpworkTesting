import { GraduationCap, Award, Users } from "lucide-react";
import manohara from "@/pages/doctors/dr-manohara.jpg";
import deepa from "@/pages/doctors/Dr. Deepa Joshi .jpg";
import umme from "@/pages/doctors/Dr. Umme Hafeefa.jpg";

const doctors = [
  {
    name: "Dr. Manohara MC",
    role: "Founder & Senior Consultant",
    description:
      "With over 28 years of experience in classical homeopathy, Dr. Manohara has dedicated his life to healing through natural medicine.",
    specialties: ["Constitutional Treatment", "Chronic Diseases", "Research"],
    image: manohara,
  },
  {
    name: "Dr. Deepa Joshi",
    role: "Consultant Homeopath",
    description:
      "Specializing in women's health and pediatric care, Dr. Deepa brings compassionate expertise to every consultation.",
    specialties: ["Women's Health", "Pediatrics", "Skin Disorders"],
    image: deepa,
  },
  {
    name: "Dr. Umme Hafeefa",
    role: "Consultant Homeopath",
    description:
      "Expert in treating lifestyle disorders and mental health conditions with a gentle, understanding approach.",
    specialties: ["Mental Health", "Lifestyle Disorders", "Allergies"],
    image: umme,
  },
];

const DoctorsSection = () => {
  return (
    <section id="doctors" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">
              Meet Our Experts
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Our <span className="text-primary">Experienced</span> Doctors
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground">
            Our team of dedicated homeopathic physicians combines decades of
            experience with a deep commitment to classical homeopathic
            principles.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2"
            >
              {/* Doctor Image */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full mx-auto mb-4 sm:mb-6 overflow-hidden border-4 border-primary/20 shadow-lg bg-primary/10">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      doctor.name
                    )}&size=160&background=6366f1&color=fff&bold=true`;
                    target.onerror = null;
                  }}
                />
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-2">
                  {doctor.name}
                </h3>

                <p className="text-primary font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                  {doctor.role}
                </p>

                <p className="text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                  {doctor.description}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                  {doctor.specialties.map((specialty, i) => (
                    <span
                      key={i}
                      className="px-2 sm:px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs">BHMS</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs">Certified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
