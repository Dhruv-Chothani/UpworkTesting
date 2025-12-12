import { Router } from 'express';
import { login, logout, me } from '../controllers/authController.js';
import { requireAuth } from '../middlewares/auth.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.post('/login', catchAsync(login));
router.post('/logout', catchAsync(logout));
router.get('/me', requireAuth, catchAsync(me));

export default router;

