const mongoose = require("mongoose");

const {
  Schema,
  Types: { ObjectId },
} = mongoose;

class Post {
  constructor() {
    this.schema = new Schema({
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
        type: String,
      },
      upvotes: {
        type: Number,
        default: 0,
      },
      user_id: {
        type: ObjectId,
      },
      community_id: {
        type: ObjectId,
      },
      timestamp: {
        type: Date,
        default: Date.now, // Set timestamp on creation
      },
    });
  }
}

const post = new Post();
const PostModel = mongoose.model("posts", post.schema);
module.exports = PostModel;
