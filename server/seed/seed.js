import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin.js';
import { Slot } from '../models/Slot.js';
import { Blog } from '../models/Blog.js';
import { Content } from '../models/Content.js';
import { defaultSlots, defaultBlogs, defaultContent } from './defaultData.js';

dotenv.config({ path: new URL('../.env', import.meta.url).pathname });

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Mongo connected for seeding');

    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL.toLowerCase() });
      if (!existing) {
        const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        await Admin.create({ email: process.env.ADMIN_EMAIL, passwordHash });
        console.log('Admin user created');
      }
    }

    if ((await Slot.countDocuments()) === 0) {
      await Slot.insertMany(defaultSlots);
      console.log('Default slots added');
    }

    if ((await Blog.countDocuments()) === 0) {
      await Blog.insertMany(defaultBlogs);
      console.log('Default blogs added');
    }

    const hasContent = await Content.findOne({ key: 'home' });
    if (!hasContent) {
      await Content.create({ key: 'home', data: defaultContent });
      console.log('Default home content added');
    }
  } catch (err) {
    console.error('Seed error', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seed();

