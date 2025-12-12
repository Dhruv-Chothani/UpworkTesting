import mongoose from 'mongoose';
import { toJSON } from './plugins.js';

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

toJSON(adminSchema);

export const Admin = mongoose.model('Admin', adminSchema);

