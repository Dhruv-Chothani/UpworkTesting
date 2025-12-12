import { useState, useEffect } from 'react';

export interface TimeSlot {
  id: string;
  time: string; // e.g., "09:00", "09:30"
  label: string; // e.g., "9:00 AM"
  isActive: boolean;
}

export interface Booking {
  id: string;
  date: string; // YYYY-MM-DD
  slotId: string;
  slotTime: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  concern: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const defaultSlots: TimeSlot[] = [
  { id: '1', time: '09:00', label: '9:00 AM', isActive: true },
  { id: '2', time: '09:30', label: '9:30 AM', isActive: true },
  { id: '3', time: '10:00', label: '10:00 AM', isActive: true },
  { id: '4', time: '10:30', label: '10:30 AM', isActive: true },
  { id: '5', time: '11:00', label: '11:00 AM', isActive: true },
  { id: '6', time: '11:30', label: '11:30 AM', isActive: true },
  { id: '7', time: '12:00', label: '12:00 PM', isActive: true },
  { id: '8', time: '12:30', label: '12:30 PM', isActive: true },
  { id: '9', time: '14:00', label: '2:00 PM', isActive: true },
  { id: '10', time: '14:30', label: '2:30 PM', isActive: true },
  { id: '11', time: '15:00', label: '3:00 PM', isActive: true },
  { id: '12', time: '15:30', label: '3:30 PM', isActive: true },
  { id: '13', time: '16:00', label: '4:00 PM', isActive: true },
  { id: '14', time: '16:30', label: '4:30 PM', isActive: true },
  { id: '15', time: '17:00', label: '5:00 PM', isActive: true },
  { id: '16', time: '17:30', label: '5:30 PM', isActive: true },
  { id: '17', time: '18:00', label: '6:00 PM', isActive: true },
  { id: '18', time: '18:30', label: '6:30 PM', isActive: true },
];

export const useSlots = () => {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const savedSlots = localStorage.getItem('clinic_slots');
    if (savedSlots) {
      setSlots(JSON.parse(savedSlots));
    } else {
      setSlots(defaultSlots);
      localStorage.setItem('clinic_slots', JSON.stringify(defaultSlots));
    }

    const savedBookings = localStorage.getItem('clinic_bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  const saveSlots = (newSlots: TimeSlot[]) => {
    setSlots(newSlots);
    localStorage.setItem('clinic_slots', JSON.stringify(newSlots));
  };

  const addSlot = (time: string, label: string) => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      time,
      label,
      isActive: true,
    };
    const updated = [...slots, newSlot].sort((a, b) => a.time.localeCompare(b.time));
    saveSlots(updated);
    return newSlot;
  };

  const updateSlot = (id: string, updates: Partial<TimeSlot>) => {
    const updated = slots.map(s => s.id === id ? { ...s, ...updates } : s);
    saveSlots(updated);
  };

  const deleteSlot = (id: string) => {
    const updated = slots.filter(s => s.id !== id);
    saveSlots(updated);
  };

  const toggleSlotActive = (id: string) => {
    const updated = slots.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s);
    saveSlots(updated);
  };

  const getAvailableSlots = (date: string): TimeSlot[] => {
    const bookedSlotIds = bookings
      .filter(b => b.date === date && b.status !== 'cancelled')
      .map(b => b.slotId);
    
    return slots.filter(s => s.isActive && !bookedSlotIds.includes(s.id));
  };

  const isSlotBooked = (date: string, slotId: string): boolean => {
    return bookings.some(b => 
      b.date === date && 
      b.slotId === slotId && 
      b.status !== 'cancelled'
    );
  };

  const createBooking = (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    const updated = [...bookings, newBooking];
    setBookings(updated);
    localStorage.setItem('clinic_bookings', JSON.stringify(updated));
    
    // Send to Google Sheets (placeholder - will be implemented later)
    sendToGoogleSheets(newBooking);
    
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    setBookings(updated);
    localStorage.setItem('clinic_bookings', JSON.stringify(updated));
  };

  const getBookingsForDate = (date: string): Booking[] => {
    return bookings.filter(b => b.date === date);
  };

  return {
    slots,
    bookings,
    addSlot,
    updateSlot,
    deleteSlot,
    toggleSlotActive,
    getAvailableSlots,
    isSlotBooked,
    createBooking,
    updateBookingStatus,
    getBookingsForDate,
  };
};
// Placeholder function for Google Sheets integration
async function sendToGoogleSheets(booking: Booking) {
  // This will be implemented when Google Sheets API is set up
  console.log('Booking to send to Google Sheets:', booking);
  
  // Future implementation:
  // const GOOGLE_SHEETS_API_URL = import.meta.env.VITE_GOOGLE_SHEETS_API_URL;
  // if (GOOGLE_SHEETS_API_URL) {
  //   await fetch(GOOGLE_SHEETS_API_URL, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(booking),
  //   });
  // }
}

