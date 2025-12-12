import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import slotRoutes from './routes/slotRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { seedIfNeeded } from './seed/seedHelpers.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://dhruv:123@cluster0.us4e5ih.mongodb.net/Up01';

app.use(
  cors({
    origin: FRONTEND_URL.split(','),
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/bookings', bookingRoutes);

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
    await seedIfNeeded();
    app.listen(PORT, () => console.log(`API ready on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
};

start();

