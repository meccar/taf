/* eslint-disable prettier/prettier */
const JWT = require("../token/jwt");
const Reply = require("../models/reply.models");

class ReplyController {
  async reply(req, res) {
    try {
      const { text, communityId } = req.body;
      const [decoded] = await Promise.all([
        JWT.decodedToken(req.cookies.token),
      ]);
      // Create a new reply instance
      const newReply = await Reply.create({
        comment_id: communityId,
        user_id: decoded.user_id,
        text: text,
      });

      res.status(201).json({ status: "success", message: "Reply successful", data: { newReply } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "fail", message: error.message });
    }
  }
  
  async getReplyByComment(id) { 
    const [replies] = await Promise.all([Reply.findOne({ comment_id: id })]);
    return replies;
  }
}

module.exports = new ReplyController();
