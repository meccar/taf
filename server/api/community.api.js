const Community = require("../models/community.models.js");

class CommunityController {
  async CreateCommunity(req, res) {
    try {
      const { name } = req.body;

      // Create a new community instance
      const newCommunity = new Community({
        name: name,
      });

      // Save the community to the database
      await newCommunity.save();

      res.status(201).json({ status: "success", message: "Community created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "fail", message: error.message });
    }
  }
}

module.exports = new CommunityController();
