/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");

const {
  Types: { ObjectId },
} = mongoose;

const CommentSchema = new mongoose.Schema({
  post_id: {
    type: ObjectId,
    ref: "posts",
  },
  user_id: {
    type: ObjectId,
    ref: "accounts",
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
      ref: "replies",
      default: [],
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

CommentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "reply_id",
    select: "-__v",
  });
  next();
});

const Comment = mongoose.model("comments", CommentSchema);
module.exports = Comment;
