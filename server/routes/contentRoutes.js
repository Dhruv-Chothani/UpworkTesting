import { Router } from 'express';
import { getContent, updateContent } from '../controllers/contentController.js';
import { requireAuth } from '../middlewares/auth.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.get('/', catchAsync(getContent));
router.put('/', requireAuth, catchAsync(updateContent));

export default router;

