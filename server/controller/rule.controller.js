/* eslint-disable prettier/prettier */

const Rule = require("../models/rule.models");

class RuleController {
  async CreateRule(req, res, next) {
    try {
      const { communityId, title, description } = req.body;

      // Create a new rule instance
      const newRule = await Rule.create({
        community_id: communityId,
        title: title,
        description: description,
      });

      res
        .status(201)
        .json({ status: "success", message: "Rule created successfully", data: { newRule }});
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "fail", message: error.message });
    }
  }
  
  async GetRuleByID(id) {
    const [rule] = await Promise.all([Rule.findOne({ community_id: id })]);
    return rule;
  }
}

module.exports = new RuleController();
