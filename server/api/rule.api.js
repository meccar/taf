const Rule = require("../models/rule.models.js");

class RuleController {
  async CreateRule(req, res, next) {
    try {
      const { community_id, title, description } = req.body;

      // Create a new rule instance
      const newRule = new Rule({
        community_id: community_id,
        title: title,
        description: description,
      });

      // Save the rule to the database
      await newRule.save();

      res.status(201).json({ status: "success", message: "Rule created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "fail", message: error.message });
    }
  }

  async GetRuleByID(id) {
    try{
      const rule = await Promise.all([
        Rule.findOne({community_id: id}),
      ]);
      return rule  
    } catch(error) {
      throw error
    }
  }
}

module.exports = new RuleController();
