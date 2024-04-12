/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");

const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const RuleSchema = new Schema({
  community_id: {
    type: ObjectId,
  },
  title: {
    type: String,
    trim: true,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Description is required"],
  },
  timestamp: {
    type: Date,
    default: Date.now, // Set timestamp on creation
  },
});

const Rule = mongoose.model("rules", RuleSchema);
module.exports = Rule;
