import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';

export interface TimeSlot {
  id?: string;
  _id?: string;
  time: string; // e.g., "09:00", "09:30"
  label: string; // e.g., "9:00 AM"
  isActive: boolean;
}

export interface Booking {
  id?: string;
  _id?: string;
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

export const useSlots = (options?: { admin?: boolean }) => {
  const isAdmin = options?.admin ?? false;
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSlots = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiFetch<TimeSlot[]>('/api/slots');
      setSlots(
        data.map((s) => ({
          id: s._id || s.id,
          time: s.time,
          label: s.label || s.time,
          isActive: s.isActive,
        }))
      );
    } catch (err) {
      console.error('Failed to fetch slots:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch slots');
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadBookings = useCallback(async () => {
    if (!isAdmin) return; // only admins can fetch bookings (protected route)
    try {
      const data = await apiFetch<Booking[]>('/api/bookings', {
        credentials: 'include',
      });
      setBookings(
        data.map((b) => ({
          ...b,
          id: b._id || b.id,
        }))
      );
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  }, []);

  useEffect(() => {
    loadSlots();
    loadBookings();
  }, [loadSlots, loadBookings]);

  const addSlot = (time: string, label: string) => {
    return apiFetch<TimeSlot>('/api/slots', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ time, label, isActive: true }),
    }).then((slot) => {
      const normalized = {
        id: slot._id || slot.id,
        time: slot.time,
        label: slot.label || slot.time,
        isActive: slot.isActive,
      };
      setSlots([...slots, normalized].sort((a, b) => a.time.localeCompare(b.time)));
      return normalized;
    });
  };

  const updateSlot = (id: string, updates: Partial<TimeSlot>) => {
    return apiFetch<TimeSlot>(`/api/slots/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(updates),
    }).then((slot) => {
      const normalized = {
        id: slot._id || slot.id,
        time: slot.time,
        label: slot.label || slot.time,
        isActive: slot.isActive,
      };
      setSlots(slots.map((s) => (s.id === id ? normalized : s)));
    });
  };

  const deleteSlot = (id: string) => {
    return apiFetch(`/api/slots/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(() => {
      setSlots(slots.filter((s) => s.id !== id));
    });
  };

  const toggleSlotActive = (id: string) => {
    const slot = slots.find((s) => s.id === id);
    if (!slot) return;
    return updateSlot(id, { isActive: !slot.isActive });
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

  const createBooking = (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> => {
    return apiFetch<Booking>('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
    }).then((created) => {
      const normalized: Booking = {
        ...created,
        id: (created as any)._id || created.id,
      };
      setBookings([normalized, ...bookings]);
      return normalized;
    });
  };

  const deleteBooking = (id: string) => {
    return apiFetch(`/api/bookings/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(() => {
      setBookings(bookings.filter((b) => b.id !== id));
    });
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    return apiFetch<Booking>(`/api/bookings/${id}/status`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({ status }),
    }).then((updated) => {
      const normalized: Booking = { ...updated, id: (updated as any)._id || updated.id };
      setBookings(bookings.map((b) => (b.id === id ? normalized : b)));
    });
  };

  const getBookingsForDate = (date: string): Booking[] => {
    return bookings.filter(b => b.date === date);
  };

  return {
    slots,
    bookings,
    loading,
    error,
    addSlot,
    updateSlot,
    deleteSlot,
    deleteBooking,
    toggleSlotActive,
    getAvailableSlots,
    isSlotBooked,
    createBooking,
    updateBookingStatus,
    getBookingsForDate,
    reload: () => {
      loadSlots();
      loadBookings();
    },
  };
};
