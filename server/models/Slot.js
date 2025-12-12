import mongoose from 'mongoose';
import { toJSON } from './plugins.js';

const slotSchema = new mongoose.Schema(
  {
    time: { type: String, required: true },
    label: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

toJSON(slotSchema);

export const Slot = mongoose.model('Slot', slotSchema);

