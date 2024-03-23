const Rule = require("../models/rule.models.js");

exports.ruleForm = async (req, res, next) => {
  try {
    const { community_id, title, description } = req.body;

    // // Create a new contact instance
    const newRule = new Rule({
      community_id: community_id,
      title: title,
      description: description,
    });

    // Save the contact to the database
    await newRule.save();

    res.status(201).json({ message: "Rule created successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
