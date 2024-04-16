const catchAsync = require("../util/catchAsync");
const Vote = require("../models/vote.models");
const Post = require("../models/post.models");
const Comment = require("../models/comment.models");
const Reply = require("../models/reply.models");

exports.AddVote = catchAsync(async (req, res, next) => {
  // Find existing vote
  const existingVote = await Vote.findOne({
    post_id: req.body.post_id,
    user_id: req.body.user_id,
  });

  // Determine vote change
  let voteChange = 0;
  if (existingVote) {
    // User has already voted
    if (existingVote.value !== req.body.value) {
      // Change existing vote
      existingVote.value = req.body.value;
      await existingVote.save();
      // Calculate vote change
      voteChange = req.body.value - existingVote.value;
    } else {
      // Delete existing vote
      await existingVote.deleteOne();
      // Calculate vote change
      voteChange = existingVote.value === 1 ? -1 : 1;
    }
  } else {
    // Create new vote
    await Vote.create({
      post_id: req.body.post_id,
      user_id: req.body.user_id,
      value: req.body.value,
    });
    // Calculate vote change
    voteChange = req.body.value;
  }

  // Update post's vote count
  if (req.body.post_id) {
    await Post.findByIdAndUpdate(
      req.body.post_id,
      { $inc: { vote: voteChange } },
      { new: true, runValidators: true },
    );
  }
  if (req.body.comment_id) {
    await Comment.findByIdAndUpdate(
      req.body.comment_id,
      { $inc: { vote: voteChange } },
      { new: true, runValidators: true },
    );
  }
  if (req.body.reply_id) {
    await Reply.findByIdAndUpdate(
      req.body.reply_id,
      { $inc: { vote: voteChange } },
      { new: true, runValidators: true },
    );
  }

  return res.status(200).json({
    status: "success",
    data: { Vote: voteChange },
  });
});
