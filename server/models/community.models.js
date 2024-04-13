const mongoose = require("mongoose");

const { Schema } = mongoose;

class Community {
  constructor() {
    this.schema = new Schema({
      name: {
        type: String,
        trim: true,
        required: [true, "Community name is required"],
      },
      description: {
        type: String,
        trim: true,
      },
      picture: {
        type: String,
        default:
          "https://tafviet.com/wp-content/uploads/2024/03/community-picture.jpg",
      },
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
