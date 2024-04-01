const JWT = require("../token/jwt.js");

const Reply = require("../models/reply.models.js");

class ReplyController {
  async reply(req, res) {
    try {
      const { text } = req.body;
      const { comment_id } = req.params.comment_id

      const [decoded] = await Promise.all([
        JWT.decodedToken(req.cookies.token)
      ]);

      // Create a new reply instance
      const newReply = new Reply({
        comment_id: comment_id,
        user_id: decoded.user_id,
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

  async getReply(comment_id) {
    try{
      const replies = await Promise.all([
        Reply.findOne(comment_id),
      ]);
      return replies  
    } catch(error) {
      throw error
    }
  }
}

module.exports = new ReplyController();
