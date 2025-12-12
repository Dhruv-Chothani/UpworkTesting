import mongoose from 'mongoose';
import { toJSON } from './plugins.js';

const contentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    data: { type: Object, default: {} },
  },
  { timestamps: true }
);

toJSON(contentSchema);

export const Content = mongoose.model('Content', contentSchema);

