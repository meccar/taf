const Community = require("../models/community.models.js");

class CommunityController {
  async CreateCommunity(req, res, next) {
    try {
      const { name, description, picture, member, online } = req.body;

      // Create a new community instance
      const newCommunity = new Community({
        name: name,
        description: description,
        picture: picture,
        member: member,
        online: online,
      });

      // Save the community to the database
      await newCommunity.save();

      res.status(201).json({ message: "Community created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new CommunityController();
