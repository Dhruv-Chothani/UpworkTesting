import mongoose from 'mongoose';
import { toJSON } from './plugins.js';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, default: '' },
    content: { type: String, default: '' },
    image: { type: String, default: '' },
    author: { type: String, default: 'Clinic Team' },
    category: { type: String, default: 'General' },
    published: { type: Boolean, default: false },
    date: { type: String },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

toJSON(blogSchema);

export const Blog = mongoose.model('Blog', blogSchema);

