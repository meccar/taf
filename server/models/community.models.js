const mongoose = require("mongoose");
const { Schema } = mongoose;

class Community {
  constructor() {
    this.schema = new Schema({
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
      },
      member: {
        type: Number,
      },
      online: {
        type: Number,
      },
    });
  }
}

const community = new Community();
const CommunityModel = mongoose.model("communitys", community.schema);
module.exports = CommunityModel;
