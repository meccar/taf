const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommunitySchema = new Schema({
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

const Community = mongoose.model("communities", CommunitySchema);
module.exports = Community;
