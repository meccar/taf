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
        required: [true, "Title is required"],
      },
      text: {
        type: String,
        required: [true, "Article is required"],
      },
      picture: {
        type: String,
      },
      user_id: {
        type: ObjectId,
      },
      community_id: {
        type: ObjectId,
      },
    });
  }
}

const post = new Post();
const PostModel = mongoose.model("posts", post.schema);
module.exports = PostModel;
