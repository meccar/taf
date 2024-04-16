/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");

const {
  Types: { ObjectId },
} = mongoose;

const ReplySchema = new mongoose.Schema({
  comment_id: {
    type: ObjectId,
    ref: "comments",
  },
  user_id: {
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
});

// ReplySchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "user_id comment_id",
//     select: "-__v",
//   });
//   next();
// });

const Reply = mongoose.model("replies", ReplySchema);
module.exports = Reply;
