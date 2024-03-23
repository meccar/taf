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
        required: true,
      },
      upvotes: {
        type: Number,
        default: 0,
      },
    });
  }
}

const reply = new Reply();
const ReplyModel = mongoose.model("replies", reply.schema);
module.exports = ReplyModel;
