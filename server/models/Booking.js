import mongoose from 'mongoose';
import { toJSON } from './plugins.js';

const bookingSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
    slotTime: { type: String, required: true },
    patientName: { type: String, required: true },
    patientPhone: { type: String, required: true },
    patientEmail: { type: String, default: '' },
    concern: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  },
  { timestamps: true }
);

toJSON(bookingSchema);

export const Booking = mongoose.model('Booking', bookingSchema);

