const mongoose = require("mongoose");

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
    picture: [String],
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
    // comment_id: [
    //   {
    //     type: ObjectId,
    //     ref: "comments",
    //     default: [],
    //   },
    // ],
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

PostSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user_id",
    select: "username email picture",
  }).populate({
    path: "community_id",
    select: "name picture -user_id",
  });
  // .populate({
  //   path: "comment_id",
  //   select: "text vote",
  // });
  next();
});

const Post = mongoose.model("posts", PostSchema);
module.exports = Post;
