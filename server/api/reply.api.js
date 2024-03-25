const Reply = require("../models/reply.models.js");

class ReplyController {
  async reply(req, res, next) {
    try {
      const { comment_id, user_id, text, upvotes } = req.body;

      // Create a new reply instance
      const newReply = new Reply({
        comment_id: comment_id,
        user_id: user_id,
        text: text,
        upvotes: upvotes,
      });

      // Save the reply to the database
      await newReply.save();

      res.status(201).json({ message: "Reply successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ReplyController();
