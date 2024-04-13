/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");

const {
  Schema,
  Types: { ObjectId },
} = mongoose;

class Comment {
  constructor() {
    this.schema = new Schema({
      post_id: {
        type: ObjectId,
      },
      user_id: {
        type: ObjectId,
      },
      text: {
        type: String,
        required: true,
        trim: true,
      },
      upvotes: {
        type: Number,
        default: 0,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    });
  }
}

const comment = new Comment();
const CommentModel = mongoose.model("comments", comment.schema);
module.exports = CommentModel;
