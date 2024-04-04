/* eslint-disable prettier/prettier */

const Rule = require("../models/rule.models");

class RuleController {
  async CreateRule(req, res, next) {
    try {
      const { communityId, title, description } = req.body;

      // Create a new rule instance
      const newRule = new Rule({
        community_id: communityId,
        title: title,
        description: description,
      });

      // Save the rule to the database
      await newRule.save();

      res
        .status(201)
        .json({ status: "success", message: "Rule created successfully" });
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
