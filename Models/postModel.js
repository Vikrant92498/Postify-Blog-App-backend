const mongoose =require('mongoose');
const User = require('../Models/userModel')
const PostSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        unique: true,
      },
      content: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now
      }
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Post", PostSchema);