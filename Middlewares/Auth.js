const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ error: 'Access Denied...' });
    }
 
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Retrieve the user with populated savedBlogs field
    const user = await User.findById(verified.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { verifyToken };
