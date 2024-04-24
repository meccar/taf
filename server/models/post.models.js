const mongoose = require("mongoose");
// const Comment = requite("./comment.models");

const {
  Types: { ObjectId },
} = mongoose;

const PostSchema = new mongoose.Schema(
  {
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
      type: [String],
      default: [],
    },
    vote: {
      type: Number,
      default: 0,
    },
    user: {
      type: ObjectId,
      ref: "accounts",
    },
    community: {
      type: ObjectId,
      ref: "communities",
    },
    comment: [
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

PostSchema.virtual("comments", {
  ref: "comments",
  foreignField: "post",
  localField: "_id",
});

// PostSchema.virtual("comments", {
//   ref: "comments",
//   localField: "_id",
//   foreignField: "post",
//   get: function () {
//     return this.populate("comments").comments;
//   },
// });

// PostSchema.virtual("comments").get(async function () {
//   return await Comment.find({ post: this._id });
// });

PostSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "username email picture",
  })
    .populate({
      path: "community",
      select: "name",
    })
    .populate({
      path: "comment",
      select: "text vote",
    });
  next();
});

const Post = mongoose.model("posts", PostSchema);
module.exports = Post;
