const mongoose = require("mongoose");

const {
  Types: { ObjectId },
} = mongoose;

const CommentSchema = new mongoose.Schema(
  {
    post: {
      type: ObjectId,
      ref: "posts",
    },
    user: {
      type: ObjectId,
      ref: "accounts",
    },
    text: {
      type: String,
      required: true,
      // trim: true,
    },
    vote: {
      type: Number,
      default: 0,
    },
    reply: [
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// CommentSchema.index
// CommentSchema.virtual("post", {
//   ref: "posts",
//   foreignField: "comment",
//   localField: "_id",
// });

CommentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "reply",
    select: "-__v",
  }).populate({
    path: "user",
    select: "username email picture",
  });
  next();
});

const Comment = mongoose.model("comments", CommentSchema);
module.exports = Comment;
