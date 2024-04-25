const mongoose = require("mongoose");

const {
  Types: { ObjectId },
} = mongoose;

const ReplySchema = new mongoose.Schema(
  {
    comment: {
      type: ObjectId,
      ref: "comments",
    },
    user: {
      type: ObjectId,
      ref: "accounts",
    },
    text: {
      type: String,
      trim: true,
      required: true,
    },
    vote: {
      type: Number,
      default: 0,
    },
    timestamp: {
      type: Date,
      default: Date.now, // Set timestamp on creation
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ReplySchema.virtual("comment", {
//   ref: "comments",
//   foreignField: "reply",
//   localField: "_id",
// });

ReplySchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "username email picture",
  });
  next();
});

const Reply = mongoose.model("replies", ReplySchema);
module.exports = Reply;
