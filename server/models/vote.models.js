// const mongoose = require("mongoose");

// const {
//   Types: { ObjectId },
// } = mongoose;

// const UpvoteSchema = new mongoose.Schema({
//   post_id: {
//     type: ObjectId,
//     ref: "Post",
//   },
//   user_id: {
//     type: ObjectId,
//     ref: "User",
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
// });

// UpvoteSchema.index({ post_id: 1, user_id: 1 }, { unique: true });

// const DownvoteSchema = new mongoose.Schema({
//   post_id: {
//     type: ObjectId,
//     ref: "Post",
//   },
//   user_id: {
//     type: ObjectId,
//     ref: "User",
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
// });

// DownvoteSchema.index({ post_id: 1, user_id: 1 }, { unique: true });

// const Upvote = mongoose.model("upvote", UpvoteSchema);
// const Downvote = mongoose.model("downvote", DownvoteSchema);
// module.exports = { Upvote, Downvote };

const mongoose = require("mongoose");

const {
  Types: { ObjectId },
} = mongoose;

const VoteSchema = new mongoose.Schema(
  {
    post_id: {
      type: ObjectId,
      ref: "Post",
    },
    user_id: {
      type: ObjectId,
      ref: "User",
    },
    value: {
      type: Number,
      enum: [-1, 1],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    unique: [{ post_id: 1, user_id: 1 }],
  },
);

const Vote = mongoose.model("vote", VoteSchema);
module.exports = Vote;
