import { Router } from 'express';
import {
  listPublicBlogs,
  listAllBlogs,
  getBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { requireAuth } from '../middlewares/auth.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.get('/', catchAsync(listPublicBlogs));
router.get('/all', requireAuth, catchAsync(listAllBlogs));
router.get('/:slug', catchAsync(getBySlug));
router.post('/', requireAuth, catchAsync(createBlog));
router.put('/:id', requireAuth, catchAsync(updateBlog));
router.delete('/:id', requireAuth, catchAsync(deleteBlog));

export default router;

