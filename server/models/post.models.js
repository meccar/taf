const mongoose = require("mongoose");

const {
  Types: { ObjectId },
} = mongoose;

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Title is required"],
    unique: true,
  },
  text: {
    type: String,
    trim: true,
    required: [true, "Article is required"],
  },
  picture: {
    type: String,
  },
  vote: {
    type: Number,
    default: 0,
  },
  user_id: {
    type: ObjectId,
    ref: "Account",
  },
  community_id: {
    type: ObjectId,
    ref: "Community",
  },
  comment_id: [
    {
      type: ObjectId,
      ref: "Comment",
      default: [],
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now, // Set timestamp on creation
  },
});

const Post = mongoose.model("posts", PostSchema);
module.exports = Post;
