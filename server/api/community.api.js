const Community = require("../models/community.models.js");

exports.communityForm = async (req, res, next) => {
  try {
    const { name, description, picture, member, online } = req.body;

    const community_id = await Community.findOne({ community_name });
    // if (!community_id) {
    //   return res.status(404).json({ message: "Invalid usrename" });
    // }

    // Create a new contact instance
    const newCommunity = new Community({
      name: name,
      description: description,
      picture: picture,
      member: member,
      online: online,
    });

    // Save the contact to the database
    await newCommunity.save();

    res.status(201).json({ message: "Community created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
