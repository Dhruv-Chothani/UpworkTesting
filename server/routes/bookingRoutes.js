import { Router } from 'express';
import { createBooking, listBookings, updateBookingStatus } from '../controllers/bookingController.js';
import { requireAuth } from '../middlewares/auth.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.post('/', catchAsync(createBooking));
router.get('/', requireAuth, catchAsync(listBookings));
router.patch('/:id/status', requireAuth, catchAsync(updateBookingStatus));

export default router;

