const mongoose = require("mongoose");

const {
  Types: { ObjectId },
} = mongoose;

const CommunitySchema = new mongoose.Schema({
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
  user_id: [
    {
      type: ObjectId,
      ref: "accounts",
      default: [],
    },
  ],
  rule_id: [
    {
      type: ObjectId,
      ref: "rules",
      default: [],
    },
  ],
  online: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Set timestamp on creation
  },
});

CommunitySchema.pre(/^find/, function (next) {
  this.populate({
    path: "user_id rule_id",
    select: "-__v",
  });
  next();
});

const Community = mongoose.model("communities", CommunitySchema);
module.exports = Community;
