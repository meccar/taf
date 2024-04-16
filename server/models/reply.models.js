/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");

const {
  Types: { ObjectId },
} = mongoose;

const ReplySchema = new mongoose.Schema({
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
  vote: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Set timestamp on creation
  },
});

const Reply = mongoose.model("replies", ReplySchema);
module.exports = Reply;
