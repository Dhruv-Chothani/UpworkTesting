import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin.js';
import { Slot } from '../models/Slot.js';
import { Blog } from '../models/Blog.js';
import { Content } from '../models/Content.js';
import { defaultBlogs, defaultContent, defaultSlots } from './defaultData.js';

export const seedIfNeeded = async () => {
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL.toLowerCase() });
    if (!existing) {
      const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await Admin.create({ email: process.env.ADMIN_EMAIL, passwordHash });
      console.log('Default admin created');
    }
  }

  if ((await Slot.countDocuments()) === 0) {
    await Slot.insertMany(defaultSlots);
    console.log('Default slots seeded');
  }

  if ((await Blog.countDocuments()) === 0) {
    await Blog.insertMany(defaultBlogs);
    console.log('Default blogs seeded');
  }

  const hasContent = await Content.findOne({ key: 'home' });
  if (!hasContent) {
    await Content.create({ key: 'home', data: defaultContent });
    console.log('Default content seeded');
  }
};

