import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useSlots } from "@/hooks/useSlots";
import { useState } from "react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { CalendarDays, Clock, User, Phone, Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Book = () => {
  const { toast } = useToast();
  const { slots, getAvailableSlots, createBooking, isSlotBooked } = useSlots();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 30);

  const dateString = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const availableSlots = selectedDate ? getAvailableSlots(dateString) : [];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    if (date) setStep(2);
  };

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) return;

    setIsSubmitting(true);
    
    const slot = slots.find(s => s.id === selectedSlot);
    if (!slot) return;

    try {
      await createBooking({
        date: dateString,
        slotId: selectedSlot,
        slotTime: slot.time,
        patientName: formData.name,
        patientPhone: formData.phone,
        patientEmail: formData.email,
        concern: "",
      });

      setBookingComplete(true);
      toast({
        title: "Appointment Booked!",
        description: `Your appointment is scheduled for ${format(selectedDate, "MMMM d, yyyy")} at ${slot.label}`,
      });
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingComplete) {
    const slot = slots.find(s => s.id === selectedSlot);
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 sm:pt-32 pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Appointment Confirmed!
              </h1>
              <div className="bg-card rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-card mb-4 sm:mb-6">
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">Your appointment details:</p>
                <div className="space-y-2 text-left text-sm sm:text-base">
                  <p><strong>Date:</strong> {selectedDate && format(selectedDate, "MMMM d, yyyy")}</p>
                  <p><strong>Time:</strong> {slot?.label}</p>
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                We'll send a confirmation to your email. Please arrive 10 minutes before your scheduled time.
              </p>
              <Button variant="hero" onClick={() => window.location.href = "/"} className="w-full sm:w-auto">
                Back to Home
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 sm:pt-32">
        {/* Hero */}
        <section className="py-8 sm:py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
                <CalendarDays className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-primary">Book Appointment</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Schedule Your <span className="text-primary">Consultation</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Choose a convenient date and time for your appointment
              </p>
            </div>
          </div>
        </section>

        {/* Progress */}
        <section className="py-6 sm:py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-2 sm:gap-4 overflow-x-auto">
              {[
                { num: 1, label: "Select Date" },
                { num: 2, label: "Choose Time" },
                { num: 3, label: "Your Details" },
              ].map((s) => (
                <div key={s.num} className="flex items-center gap-2 flex-shrink-0">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                      step >= s.num
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s.num}
                  </div>
                  <span className={`hidden xs:block text-xs sm:text-sm ${step >= s.num ? "text-foreground" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                  {s.num < 3 && <div className="w-4 sm:w-8 h-0.5 bg-border" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking */}
        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Calendar */}
                <div className="bg-card rounded-lg lg:rounded-xl p-4 sm:p-6 shadow-card">
                  <h2 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Select Date
                  </h2>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={(date) => 
                        isBefore(date, today) || 
                        isBefore(maxDate, date) ||
                        date.getDay() === 0 // Sunday
                      }
                      className="rounded-md border w-full max-w-sm"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-4">
                    * Appointments available Monday to Saturday
                  </p>
                </div>

                {/* Slots & Form */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Time Slots */}
                  {selectedDate && (
                    <div className="bg-card rounded-lg lg:rounded-xl p-4 sm:p-6 shadow-card">
                      <h2 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        Available Slots for {format(selectedDate, "MMM d")}
                      </h2>
                      {availableSlots.length === 0 ? (
                        <p className="text-muted-foreground text-sm sm:text-base">
                          No slots available for this date. Please select another date.
                        </p>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {slots.filter(s => s.isActive).map((slot) => {
                            const isBooked = isSlotBooked(dateString, slot.id);
                            const isSelected = selectedSlot === slot.id;
                            return (
                              <button
                                key={slot.id}
                                onClick={() => !isBooked && handleSlotSelect(slot.id)}
                                disabled={isBooked}
                                className={`py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                                  isBooked
                                    ? "bg-muted text-muted-foreground cursor-not-allowed line-through"
                                    : isSelected
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary hover:bg-primary/20 text-foreground"
                                }`}
                              >
                                {slot.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Patient Form */}
                  {selectedSlot && (
                    <div className="bg-card rounded-lg lg:rounded-xl p-4 sm:p-6 shadow-card">
                      <h2 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        Your Details
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-foreground mb-1">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg border border-border bg-background text-sm"
                              placeholder="Your name"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-foreground mb-1">
                            Phone Number *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg border border-border bg-background text-sm"
                              placeholder="+91 98765 43210"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-foreground mb-1">
                            Email
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg border border-border bg-background text-sm"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>
                        <Button
                          type="submit"
                          variant="hero"
                          size="lg"
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Booking..." : "Confirm Appointment"}
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Book;
