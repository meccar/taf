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
    ref: "accounts",
  },
  community_id: {
    type: ObjectId,
    ref: "communities",
  },
  comment_id: [
    {
      type: ObjectId,
      ref: "comments",
      default: [],
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user_id community_id comment_id",
    select: "-__v",
  });
  next();
});

const Post = mongoose.model("posts", PostSchema);
module.exports = Post;
