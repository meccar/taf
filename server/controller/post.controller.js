const Community = require("../models/community.models");
const Post = require("../models/post.models");
const JWT = require("../token/jwt");
const APIFeatures = require("../util/apiFeatures");
const postProcessor = require("../processor/post.processor");
const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

exports.CreatePost = catchAsync(async (req, res, next) => {
  const { title, text, picture, communityName } = req.body;

  const [decoded, communityID] = await Promise.all([
    JWT.decodedToken(req.cookies.token), // Assuming decodedToken verifies the token
    Community.findOne({ name: communityName })
      .lean()
      .then((community) => {
        if (!community) {
          return Community.create({ name: communityName }).then(
            (newCommunity) => newCommunity._id,
          );
        }
        return community._id;
      }),
  ]);

  // Create a new post instance
  const newPost = await Post.create({
    title: title,
    text: text,
    picture: picture,
    user_id: decoded.user_id,
    community_id: communityID,
  });

  return res.status(201).json({
    status: "success",
    message: "Post created successfully",
    data: { newPost },
  });
});

exports.GetAllPost = catchAsync(async (req, res, next) => {
  // const posts = await Post.find();
  const features = new APIFeatures(Post.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const posts = await features.query;

  const postDetails = await postProcessor(posts);

  return res.status(200).json({
    status: "success",
    length: postDetails.length,
    data: { Posts: postDetails },
  });
});

exports.GetPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    // return res
    //   .status(404)
    //   .json({ status: "fail", message: "Post not founded" });

    next(AppError("Post not founded", 404));
  }
  return res.status(200).json({ status: "success", data: { post } });
});

exports.getPostID = async (title) => {
  const post = await Promise.all([Post.findOne({ title: title })]);
  return post._id;
};

exports.updatePost = catchAsync(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});

exports.deletePost = catchAsync(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
