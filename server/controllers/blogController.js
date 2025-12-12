import { Blog } from '../models/Blog.js';

export const listPublicBlogs = async (_req, res) => {
  const blogs = await Blog.find({ published: true }).sort({ publishedAt: -1 });
  res.json(blogs);
};

export const listAllBlogs = async (_req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};

export const getBySlug = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json(blog);
};

export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Slug must be unique' });
    }
    throw err;
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Slug must be unique' });
    }
    throw err;
  }
};

export const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};

