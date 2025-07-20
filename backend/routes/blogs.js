import express from 'express';
const router = express.Router();
import Blog from '../models/Blogs.js';


// Get all blogs
router.get('/blogs', async (req, res) => {
  const blogs = await Blog.find().sort({ date: -1 });
  res.json(blogs);
});

// Create a new blog
router.post('/blogs', async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.status(201).json(blog);
});

// In routes/blogs.js
router.get('/blogs/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});


export default router;
