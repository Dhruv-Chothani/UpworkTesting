import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, CheckCircle, XCircle, AlertCircle, Heart, Shield, Leaf } from "lucide-react";

const MythsAndFacts = () => {
  const mythsAndFacts = [
    {
      myth: "HOMOEOPATHY IS SLOW ACTING",
      fact: "It is unfortunately a false impression that Homoeopathy is slow acting. The person may be that despite tremendous potential of it in curing common acute ailments, Homoeopaths are approached only for treatment of uncommon, chronic ailments. It is considered good only when common ailments becomes uncommonly troublesome and chronic, or when there is difficult condition which is not relieved by allopathic treatment or there is a proposed surgical treatment of which the patient is afraid of. Naturally, these conditions will take some time to be cured. Even then, by its effectiveness and remote success, it has earned good reputation and patronage."
    },
    {
      myth: "ALL MEDICINES (POWDERS) ARE SAME, SMALL AND WHITE",
      fact: "These white sugar pills or powders have no medical property. They are simple pills used as vehicles to dispense alcohol based bitter medicines so that they can be taken easily. Otherwise medicine can be dispensed directly on tongue or dissolved in water also."
    },
    {
      myth: "HOMOEOPATHY FIRST AGGRAVATES THE DISEASE AND THEN IMPROVES",
      fact: "It is a myth. It does not happen to all cases and always, if the chosen remedy matches the patient's need. But if repeated more than the need, often increases the complaints, but it would subside in its own as soon as medicine is withdrawn, sometimes a patient who is dependent on some other medicines, for example, steroids, painkillers, hormones stops them, then he gets the original disease symptoms, and considers that the disease has aggravated."
    },
    {
      myth: "THERE ARE STRICT DIET RESTRICTIONS IN HOMOEOPATHY",
      fact: "It is a myth regarding restrictions in diet like onion, garlic, perfume, paan and tobacco. These medicines have been used in patients who are habituated to coffee and betel. IT ALWAYS ACTS. But with certain medicines when given, such restrictions are must. Otherwise the action may be nullified. Asking not to chew paan or smoke, on the other hand are safe and healthy restrictions."
    },
    {
      myth: "NO SIDE EFFECTS",
      fact: "It is a FACT that homoeopathic medicines have no side effects. The term 'side effects' of a medicine comes from modern pharmaceutics. These drugs are aimed at one area of the body such as the cardiovascular system, the gut, the kidneys, etc. Though they have a primary area of action, they also effect other areas of the body. Homoeopathic medicines are not employed against one particular area or organ of the body. The homoeopathic remedy is chosen because it matches as closely as possible the totality of symptoms of the patient. Side effects of any type do not occur under homoeopathy."
    },
    {
      myth: "WHETHER OTHER MEDICINES CAN BE TAKEN IN ENERGY?",
      fact: "NO, because this will confuse the physician in assessing which medicine is helpful and which is not. Sometimes YES, because patient who is dependent on some drugs will not be able to leave them at once. They can be allowed of initially homoeopathic medicines do not help. As the diseases is controlled gradually the patient himself will leave."
    },
    {
      myth: "HOMOEOPATHY CAN TREAT ANYTHING AND EVERYTHING",
      fact: "NO, Like any other system of medicine, homoeopathy has its own limitations. By homoeopathy any ailment acute or chronic, local or general can be treated except diseases where surgery is unavoidable. (Like in accidents and fractures of bones). Furthermore, it may be noted that many surgical diseases are treatable by Homoeopathy to a great extent like enlarged tonsils. Kidney stones, warts, piles, fissure and fistula. In early stages of cancers homoeopathy effectively cures the cancer patients. In terminal cases it gives effective palliation and decreases the sufferings. Homoeopathy cannot cure birth defects whether biochemical or structural. It can, however, improve the level of health of persons born with congenital weakness."
    },
    {
      myth: "ANY ONE CAN GIVE HOMOEOPATHIC MEDICINES WITHOUT UNDERGOING PROPER TRAINING",
      fact: "No, only those who have completed homoeopathic course in college recognised by University or registered in homoeopathic board can practice homoeopathy. Otherwise they will be considered as quack doctors and is dangerous to take medicines from them."
    },
    {
      myth: "CAN DIABETES TAKE THESE PILLS AS IT CONTAINS SUGAR?",
      fact: "Yes, They can take as the amount of sugar is negligible. If necessary, medicines can be given in distilled water also."
    },
    {
      myth: "HOMOEOPATHIC MEDICINES AND STEROIDS",
      fact: "There is a myth that homeopathic medicines contains Steroids. But this false allegation is made to check the popularity of homeopathy. The fact is homeopathic medicines does not contain any steroids. The Usage of steroids is basically against to the fundamental principles of homoeopathy. When in doubt, patients can check the possibility of presence of steroids in homeopathic medicines in private labs also."
    }
  ];

  const scopes = [
    {
      title: "HOMOEOPATHY: A BETTER SUBSTITUTE FOR ANTIBIOTICS",
      description: "Homoeopathy is an effective alternate to infectious diseases, produces no toxic side effects bringing about rapid recovery."
    },
    {
      title: "HOMOEOPATHY OFFERS BEST TREATMENT FOR VIRAL DISEASES",
      description: "Viral infections such as common cold, fever, measles, chickenpox, mumps, viral hepatitis, viral meningitis, herpes simplex, herpes zoster etc.."
    },
    {
      title: "HOMOEOPATHY OFTEN AVOIDS SURGERY",
      description: "Many so called surgical diseases like enlarged tonsils, piles, fissure, fistula, warts, corns, kidney stones, gall bladder stones, prostate enlargement, dysfunctional uterine bleeding, fibroid uterus, disc prolapse can be cured with homoeopathic medicines."
    },
    {
      title: "HOMOEOPATHY: IDEAL FOR CHILDREN",
      description: "Most of the children ailments like cold, cough, fever, fits, vomiting, diarrhoea, dysentery, abdominal pain, tonsillitis, bronchitis, Asthma, measles, chicken pox, mumps, dentition problems etc., Could be very effectively and quickly treated with Homoeopathy."
    },
    {
      title: "HOMOEOPATHY : BEST IN ALLERGIC DISORDERS",
      description: "All types of allergic disorders like repeated cold, cough, Asthma can be permanently cured with Homoeopathy."
    },
    {
      title: "HOMOEOPATHY : BEST IN MENTAL DISEASES",
      description: "Due to unnatural way of living habits in recent times more people are suffering from anxiety, irrational fears, many psychosomatic illness, sleeplessness, neurosis, suicidal tendency, weakness of memory, irritable bowel syndrome (loose stools), migraine headache and other mental diseases. These can be effectively treated in homoeopathy without the fear of becoming an addiction."
    },
    {
      title: "HOMOEOPATHY: CURES SKIN DISEASES",
      description: "Various Skin Diseases like allergic dermatitis, pigmentations, warts, allergy, fungal infections, psoriasis can be cured with internal homoeopathic medicines only."
    }
  ];

  const doctors = [
    {
      name: "Dr. M. C Manohara, BHMS",
      clinic: "MANU HOMOEOPATHY CLINIC",
      address: "165, E & F block, Near Saibaba temple, Ramakrishnanagara, Mysuru – 570022",
      phone: "0821-2463482"
    },
    {
      name: "Dr Snehal Bobde BHMS",
      clinic: "VAIBHAVI HOMOEOPATHY CLINIC",
      address: "#23, MIG 2, group-3, 1st floor, Opposite to Mansarovar Cloth Store, KHB colony, Hootagalli, Mysuru - 570018"
    },
    {
      name: "Dr Sujatha G Kankarne, BHMS",
      clinic: "SHARADA HOMOEOPATHY CLINIC",
      address: "#386, 5th main, 1st stage, vijaynagar, Mysuru -570017",
      phone: "9481239854"
    },
    {
      name: "Dr Supraj Koulagi, BHMS",
      clinic: "KOULAGI HOMOEOPATHY CLINIC",
      address: "3584, Kabini Road, 18th cross, Nanjanagudu – 571301",
      phone: "9739097616"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-32">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-secondary/30 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Educational</span>
              </div>
              <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Myths and Facts About <span className="text-primary">Homoeopathy</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                It is more than a century and a half now that homoeopathy is being practiced in India. 
                Yet, the common man is frequently misled by various myths regarding its use, application and efficacy.
              </p>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-12 md:py-16 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-primary/5 rounded-2xl p-6 md:p-8 border border-primary/20">
                <p className="text-lg md:text-xl italic text-foreground leading-relaxed text-center">
                  "Homoeopathy cures a larger percentage of cases than any other method of treatment and is beyond doubt 
                  safer and more economical and is the most complete medical science."
                </p>
                <p className="text-right mt-4 text-muted-foreground font-semibold">— Mahatma Gandhi</p>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  Homoeopathy is a scientific system of medicine based on the discovery that a substance can cure the same 
                  problems it can cause, usually by varying the dosage of that substance.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  Any herb, mineral or animal product given to a healthy person in a suitable dose often enough will cause 
                  that person to become ill in a specific pattern unlike any other. That is, each substance produces on the 
                  healthy individual unique symptoms. The same substance, in an extremely minute dose, will remove just those 
                  symptoms it is capable of evoking. 'let like be treated by likes' is the homoeopathic principle.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Homoeopathy is a system of medicine of comparatively recent origin. It was in 1805 and later in 1810 that 
                  Dr. Samuel Hahnemann presented the Law of Similia which is the basis of homoeopathic treatment. Homoeopathy 
                  came to India during Hahnemann's life, in 1839, when Dr. Honigberger treated Maharaja Ranjit Singh of Punjab.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Myths and Facts */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Myths and Facts
              </h2>
              <div className="space-y-6">
                {mythsAndFacts.map((item, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl p-6 md:p-8 shadow-card hover:shadow-elevated transition-shadow"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                        <XCircle className="w-5 h-5 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-2">
                          MYTH: {item.myth}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">FACT:</h4>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                          {item.fact}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Scope Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Scope of Homoeopathy
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {scopes.map((scope, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                          {scope.title}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {scope.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Efficacy Section */}
        <section className="py-12 md:py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Efficacy
              </h2>
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-card">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  Homoeopathy is not only a therapy which can effectively cure acute or chronic diseases, but it is a method 
                  of stimulating the <strong className="text-foreground">DEFENCE MECHANISM</strong> and balancing the constitution 
                  of patients. It is capable of enhancing the degree of productivity, creativity and serenity of people by 
                  removing the susceptibility to disturbing influences. More and more people are being successfully treated. 
                  Homoeopathy is becoming more popular and accepted, and also becoming part of establishments, and of an holistic 
                  approach to health.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  With a track record proved over 200 years, homoeopathy is a natural medicine which is safe, and has no side 
                  effects, non-addictive, it is relatively inexpensive and treats the <strong className="text-foreground">WHOLE PERSON</strong>.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  The range of problems to which Homoeopathy can be effectively directed is extensive and includes first aid, 
                  acute illnesses and all manner of chronic conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-card border-2 border-primary/20">
                <div className="flex items-start gap-4 mb-6">
                  <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                    Important Notice
                  </h2>
                </div>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  Please explain all the problems both mental and physical in detail to the doctor. In homoeopathy the medicine 
                  is selected after considering all your physical and mental pattern. The information which you give is absolutely 
                  be kept confidential.
                </p>
                <div className="mt-8">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                    What to Avoid During Homoeopathic Treatment?
                  </h3>
                  <div className="bg-destructive/5 rounded-lg p-4 border border-destructive/20">
                    <p className="font-semibold text-foreground mb-2">AVOID:</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>ANTIBIOTICS, HORMONAL (Postponal) TABLETS</li>
                      <li>STRONG PERFUMES</li>
                      <li>ANY FOOD MATERIAL WHICH CONTAINS CAMPHOR, MENTHOL</li>
                      <li>Do not apply any OINTMENTS, SPRAYS, PAIN BALMS LIKE AMRUTHANJAN, VICKS etc.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                For More Information: Contact
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {doctors.map((doctor, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow"
                  >
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                      {doctor.name}
                    </h3>
                    <p className="text-primary font-semibold mb-3">{doctor.clinic}</p>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {doctor.address}
                    </p>
                    {doctor.phone && (
                      <p className="text-sm font-medium text-foreground">
                        Ph: {doctor.phone}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MythsAndFacts;

