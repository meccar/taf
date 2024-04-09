/* eslint-disable node/no-unsupported-features/es-syntax */
const ReplyController = require("../controller/reply.controller");

async function commentProcess(comments) {
  return await Promise.all(
    comments.filter(Boolean).map(async (comment) => {
      const replies = await ReplyController.getReplyByComment(comment._id);
      return { ...comment.toJSON(), Replies: replies };
    }),
  );
}

module.exports = commentProcess;
