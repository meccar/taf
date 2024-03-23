const mongoose = require("mongoose");
// const { Schema } = mongoose;

class Community {
  constructor() {
    this.schema = new mongoose.Schema({
      name: {
        type: String,
        required: [true, "Community name is required"],
      },
      description: {
        type: String,
        required: [true, "Description is required"],
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
    });
  }
}

const community = new Community();
const CommunityModel = mongoose.model("communities", community.schema);
module.exports = CommunityModel;
