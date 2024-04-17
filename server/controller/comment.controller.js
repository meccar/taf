/* eslint-disable no-useless-catch */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
const JWT = require("../token/jwt");
const catchAsync = require("../util/catchAsync");

const Comment = require("../models/comment.models");

exports.CreateComment = catchAsync(async (req, res, next) => {
  const decoded = await JWT.decodedToken(req.cookies.token);

  if (!req.body.post_id) req.body.post_id = req.params.postID;

  // Create a new comment instance
  const newComment = await Comment.create({
    post_id: req.body.post_id,
    user_id: decoded.user_id,
    text: req.body.text,
  });

  res.status(201).json({
    status: "success",
    data: { comment: newComment },
  });
});

exports.getAllComment = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.postID) filter = { post: req.params.postID };

  const comment = await Comment.find(filter);

  res.status(200).json({
    status: "success",
    results: comment.length,
    data: {
      comment,
    },
  });
});
