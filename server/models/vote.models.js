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
    post: {
      type: ObjectId,
      ref: "posts",
    },
    commnet: {
      type: ObjectId,
      ref: "comments",
    },
    reply: {
      type: ObjectId,
      ref: "replies",
    },
    user: {
      type: ObjectId,
      ref: "accounts",
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
  // {
  //   unique: [
  //     { post: 1, user: 1 },
  //     { commnet: 1, user: 1 },
  //     { reply: 1, user: 1 },
  //   ],
  // },
);

VoteSchema.index(      
  { post: 1, user: 1 },
  { commnet: 1, user: 1 },
  { reply: 1, user: 1 },
  { unique: true })

// VoteSchema.index(
//   [
//     { post_id: 1, user_id: 1 },
//     { commnet_id: 1, user_id: 1 },
//     { reply_id: 1, user_id: 1 },
//   ],
//   { unique: true },
// );

// VoteSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "user_id post_id comment_id reply_id",
//     select: "-__v",
//   });
//   next();
// });

const Vote = mongoose.model("votes", VoteSchema);
module.exports = Vote;
