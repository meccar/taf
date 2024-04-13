/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");

const {
  Schema,
  Types: { ObjectId },
} = mongoose;

class Rule {
  constructor() {
    this.schema = new Schema({
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
  }
}

const rule = new Rule();
const RuleModel = mongoose.model("rules", rule.schema);
module.exports = RuleModel;
