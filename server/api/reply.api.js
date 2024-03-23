const Reply = require("../models/reply.models.js");

exports.replyForm = async (req, res, next) => {
  try {
    const { comment_id, user_id, text, upvotes } = req.body;

    // // Create a new contact instance
    const newReply = new Reply({
      comment_id: comment_id,
      user_id: user_id,
      text: text,
      upvotes: upvotes,
    });

    // Save the contact to the database
    await newReply.save();

    res.status(201).json({ message: "Comment successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
