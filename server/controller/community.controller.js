/* eslint-disable no-useless-catch */
const Community = require("../models/community.models");

class CommunityController {
  async CreateCommunity(req, res) {
    try {
      const { name } = req.body;

      // Create a new community instance
      const newCommunity = await Community.create({ name: name });

      res.status(201).json({
        status: "success",
        message: "Community created successfully",
        data: newCommunity,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "fail", message: error.message });
    }
  }

  async GetCommunityByID(id) {
    try {
      const community = await Promise.all([Community.findOne({ _id: id })]);
      return community;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CommunityController();
