const Comment = require("../models/comment.models.js");

class CommentController {
  async comment(req, res, next) {
    try {
      const { post_id, user_id, text, upvotes } = req.body;

      // Create a new comment instance
      const newComment = new Comment({
        post_id: post_id,
        user_id: user_id,
        text: text,
        upvotes: upvotes,
      });

      // Save the comment to the database
      await newComment.save();

      res.status(201).json({ message: "Comment successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new CommentController();
