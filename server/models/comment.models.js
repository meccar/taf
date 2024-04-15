/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");

const {
  Types: { ObjectId },
} = mongoose;

const CommentSchema = new mongoose.Schema({
  post_id: {
    type: ObjectId,
  },
  user_id: {
    type: ObjectId,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("comments", CommentSchema);
module.exports = Comment;
