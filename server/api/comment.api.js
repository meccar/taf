const JWT = require("../token/jwt.js");

const Comment = require("../models/comment.models.js");

class CommentController {
  async comment(req, res) {
    try {
      const { text, post_id } = req.body;
      // const { post_id } = req.params.post_id

      const [decoded] = await Promise.all([
        JWT.decodedToken(req.cookies.token)
      ]);

      // Create a new comment instance
      const newComment = new Comment({
        post_id: post_id,
        user_id: decoded.user_id,
        text: text,
      });

      // Save the comment to the database
      await newComment.save();

      res.status(201).json({ status: "success", message: "Comment successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "fail", message: error.message });
    }
  }

  async getCommentByPost(post_id) {
    try{
      const comments = await Promise.all([
        Comment.findOne({ post_id: post_id }),
      ]);
      return comments  
    } catch(error) {
      throw error
    }
  }
}

module.exports = new CommentController();
