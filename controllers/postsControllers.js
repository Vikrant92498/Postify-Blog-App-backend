// server/controllers/blogPostController.js

const BlogPost = require('../Models/postModel');

// Create a new blog post
exports.createBlogPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newBlogPost = new BlogPost({ title, content, author });
    const savedBlogPost = await newBlogPost.save();
    res.json(savedBlogPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all blog posts
exports.getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific blog post by ID
exports.getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific blog post by ID
exports.updateBlogPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(req.params.id, { title, content, author }, { new: true });
    res.json(updatedBlogPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific blog post by ID
exports.deleteBlogPost = async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
