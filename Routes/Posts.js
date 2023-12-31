// server/routes/blogPostRoutes.js

const express = require('express');
const router = express.Router();
const blogPostController = require('../controllers/postsControllers');
const {verifyToken} = require('../Middlewares/Auth')
// Create a new blog post
router.post('/', blogPostController.createBlogPost);
 
// Get all blog posts
router.get('/', blogPostController.getAllBlogPosts);

// Get a specific blog post by ID
router.get('/:id', blogPostController.getBlogPostById);

// Update a specific blog post by ID
router.put('/:id', blogPostController.updateBlogPost);
router.post('/like/:id', blogPostController.likePost);

// Delete a specific blog post by ID
router.delete('/:id', blogPostController.deleteBlogPost);

module.exports = router;
