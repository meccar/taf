const mongoose = require("mongoose");
const { Schema } = mongoose;
const postSchema = require("./post.models.js")

class Community {
  constructor() {
    this.schema = new Schema({
      name: {
        type: String,
        required: [true, "Community name is required"],
      },
      description: {
        type: String,
        // required: [true, "Description is required"],
      },
      picture: {
        type: String,
        default:
          "https://tafviet.com/wp-content/uploads/2024/03/community-picture.jpg",
      },
      posts: [{
        type: Schema.Types.ObjectId,
        ref: 'posts' // Reference to your Post model
      }],
      member: {
        type: Number,
        default: 0,
      },
      online: {
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

const community = new Community();
const CommunityModel = mongoose.model("communities", community.schema);
module.exports = CommunityModel;
