/*const mongoose =require('mongoose');
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
        type: mongoose.Schema.Types.ObjectId,
        ref: User, // Reference the User model
        required: true,
      },
      date: {
        type: Date,
        default: Date.now
      }
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Post", PostSchema);*/
  const mongoose = require('mongoose');
const User = require('../Models/userModel');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true,
  },
});

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
    image:{
      type:String,
      default:"https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference the User model
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    //comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
