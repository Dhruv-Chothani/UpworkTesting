import { Booking } from '../models/Booking.js';
import { Slot } from '../models/Slot.js';

export const createBooking = async (req, res) => {
  const { date, slotId, patientName, patientPhone, patientEmail, concern } = req.body;
  if (!date || !slotId || !patientName || !patientPhone) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const slot = await Slot.findById(slotId);
  if (!slot) return res.status(404).json({ message: 'Slot not found' });
  if (!slot.isActive) return res.status(400).json({ message: 'Slot is inactive' });

  const existing = await Booking.findOne({ date, slotId, status: { $ne: 'cancelled' } });
  if (existing) return res.status(409).json({ message: 'Slot already booked' });

  const booking = await Booking.create({
    date,
    slotId,
    slotTime: slot.time,
    patientName,
    patientPhone,
    patientEmail,
    concern,
  });

  res.status(201).json(booking);
};

export const listBookings = async (req, res) => {
  const { date } = req.query;
  const filter = date ? { date } : {};
  const bookings = await Booking.find(filter).sort({ createdAt: -1 });
  res.json(bookings);
};

export const updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json(booking);
};

