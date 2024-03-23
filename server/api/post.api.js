const Post = require("../models/post.models.js");

exports.postForm = async (req, res, next) => {
  try {
    const { title, text, picture, user_id, community_id } = req.body;

    // Create a new contact instance
    const newPost = new Post({
      title: title,
      text: text,
      picture: picture,
      user_id: user_id,
      community_id: community_id,
    });

    // Save the contact to the database
    await newPost.save();

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
