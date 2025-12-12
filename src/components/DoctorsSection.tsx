import { GraduationCap, Award, Users } from "lucide-react";

const doctors = [
  {
    name: "Dr. M. C Manohara",
    role: "Founder & Senior Consultant",
    description: "With over 28 years of experience in classical homeopathy, Dr. Manohara has dedicated his life to healing through natural medicine.",
    specialties: ["Constitutional Treatment", "Chronic Diseases", "Research"],
    image: "/doctors/dr-manohara.jpg",
  },
  {
    name: "Dr. Snehal Bobde",
    role: "Consultant Homeopath",
    description: "Specializing in women's health and pediatric care, Dr. Snehal brings compassionate expertise to every consultation.",
    specialties: ["Women's Health", "Pediatrics", "Skin Disorders"],
    image: "/doctors/dr-snehal.jpg",
  },
  {
    name: "Dr. Sujatha G Kankarne",
    role: "Consultant Homeopath",
    description: "Expert in treating lifestyle disorders and mental health conditions with a gentle, understanding approach.",
    specialties: ["Mental Health", "Lifestyle Disorders", "Allergies"],
    image: "/doctors/dr-sujatha.jpg",
  },
];

const DoctorsSection = () => {
  return (
    <section id="doctors" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Meet Our Experts</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-primary">Experienced</span> Doctors
          </h2>
          <p className="text-lg text-muted-foreground">
            Our team of dedicated homeopathic physicians combines decades of experience 
            with a deep commitment to classical homeopathic principles.
          </p>
        </div>

        {/* Doctors grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2"
            >
              {/* Doctor Image */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 overflow-hidden border-4 border-primary/20 shadow-lg bg-primary/10">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Use avatar API as fallback
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&size=160&background=6366f1&color=fff&bold=true`;
                    target.onerror = null; // Prevent infinite loop
                  }}
                />
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  {doctor.name}
                </h3>
                <p className="text-primary font-medium mb-4">{doctor.role}</p>
                <p className="text-muted-foreground text-sm mb-6">{doctor.description}</p>

                {/* Specialties */}
                <div className="flex flex-wrap justify-center gap-2">
                  {doctor.specialties.map((specialty, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-xs">BHMS</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="w-4 h-4" />
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
