import { Router } from 'express';
import { createSlot, listSlots, removeSlot, toggleSlot, updateSlot } from '../controllers/slotController.js';
import { requireAuth } from '../middlewares/auth.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.get('/', catchAsync(listSlots));
router.post('/', requireAuth, catchAsync(createSlot));
router.delete('/:id', requireAuth, catchAsync(removeSlot));
router.patch('/:id/toggle', requireAuth, catchAsync(toggleSlot));
router.patch('/:id', requireAuth, catchAsync(updateSlot));

export default router;

