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
  vote: {
    type: Number,
    default: 0,
  },
  reply_id: [
    {
      type: ObjectId,
      ref: "Reply",
      default: [],
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("comments", CommentSchema);
module.exports = Comment;
