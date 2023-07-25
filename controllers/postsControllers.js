// server/controllers/blogPostController.js

const BlogPost = require('../Models/postModel');

// Create a new blog post

exports.createBlogPost = async (req, res) => {
  try {
    const { title, content, image,author } = req.body;
    console.log(req.body);
    // Create the new BlogPost without the 'author' field
    const newBlogPost = new BlogPost({ title, content,image,author });
    // Save the new BlogPost
    const savedBlogPost = await newBlogPost.save();
    // Populate the 'author' field with user details
    await savedBlogPost.populate("author");
    res.json(savedBlogPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all blog posts
exports.getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().populate("author");
    //code here
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific blog post by ID
exports.getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    await blogPost.populate("author");
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

exports.likePost =async (req, res) => {
  const {userId} = req.body; // Replace with the actual user ID (you can get it from the user session or JWT)
    
  const postId = req.params.id;
  try {
    // Find the blog post by ID
    const blogPost = await BlogPost.findById(postId);

    // Check if the user already liked the post
    const isLiked = blogPost.likedBy.includes(userId);

    // Update the likes count and the user's like status
    if (isLiked) {
      blogPost.likesCount -= 1;
      blogPost.likedBy.pull(userId);
    } else {
      blogPost.likesCount += 1;
      blogPost.likedBy.push(userId);
    }

    // Save the updated blog post
    const updatedPost = await blogPost.save();

    res.status(200).json({
      likesCount: updatedPost.likesCount,
      isLiked: updatedPost.likedBy.includes(userId),
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};