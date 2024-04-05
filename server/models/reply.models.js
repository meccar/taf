/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");

const {
  Schema,
  Types: { ObjectId },
} = mongoose;

class Reply {
  constructor() {
    this.schema = new Schema({
      comment_id: {
        type: ObjectId,
      },
      user_id: {
        type: ObjectId,
      },
      text: {
        type: String,
        trim: true,
        required: true,
      },
      upvotes: {
        type: Number,
        default: 0,
      },
      timestamp: {
        type: Date,
        default: Date.now, // Set timestamp on creation
      },
    });
  }
}

const reply = new Reply();
const ReplyModel = mongoose.model("replies", reply.schema);
module.exports = ReplyModel;
