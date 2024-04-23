/* eslint-disable prettier/prettier */
// const JWT = require("../token/jwt");
const Reply = require("../models/reply.models");
// const catchAsync = require("../util/catchAsync");
const handler = require("./handler.controller");

exports.GetReplier = (req, res, next) => {
  req.body.user = req.user.id;
  next();
};

exports.CreateReply = handler.createOne(Reply);
exports.GetAllReply = handler.getAll(Reply);
exports.GetReply = handler.getOne(Reply);
exports.UpdateReply = handler.updateOne(Reply);
exports.DeleteReply = handler.deleteOne(Reply);

// exports.CreateReply = catchAsync(async (req, res, next) => {
//   const { text, communityId } = req.body;
//   const [decoded] = await Promise.all([JWT.decodedToken(req.cookies.token)]);
//   // Create a new reply instance
//   const newReply = await Reply.create({
//     comment_id: communityId,
//     user_id: decoded.user_id,
//     text: text,
//   });

//   res.status(201).json({
//     status: "success",
//     message: "Reply successful",
//     data: { newReply },
//   });
// });

// exports.getReplyByComment = async (id) => {
//   const [replies] = await Promise.all([Reply.findOne({ comment_id: id })]);
//   return replies;
// };
