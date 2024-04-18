const Community = require("../models/community.models");
const Post = require("../models/post.models");
// const JWT = require("../token/jwt");
// const APIFeatures = require("../util/apiFeatures");
const catchAsync = require("../util/catchAsync");
// const AppError = require("../util/appError");
const handler = require("./handler.controller");

exports.CheckCommunity = catchAsync(async (req, res, next) => {
  const communityID = await Community.findOne({ name: req.body.community_name })
    .lean()
    .then((community) => {
      if (!community) {
        return Community.create({ name: req.body.community_name }).then(
          (newCommunity) => newCommunity._id,
        );
      }
      return community._id;
    });
  req.body.communityID = communityID;
  next();
});

exports.CreatePost = handler.createOne(Post);
exports.GetAllPost = handler.getAll(Post);
exports.GetPost = handler.getOne(Post);
exports.UpdatePost = handler.updateOne(Post);
exports.DeletePost = handler.deleteOne(Post);

// exports.CreatePost = catchAsync(async (req, res, next) => {
//   // const [decoded, communityID] = await Promise.all([
//   //   JWT.decodedToken(req.cookies.token),
//   //   await Community.findOne({ name: req.body.community_name })
//   //     .lean()
//   //     .then((community) => {
//   //       if (!community) {
//   //         return Community.create({ name: req.body.community_name }).then(
//   //           (newCommunity) => newCommunity._id,
//   //         );
//   //       }
//   //       return community._id;
//   //     }),
//   // ]);

//   // Create a new post instance
//   const newPost = await Post.create({
//     title: req.body.title,
//     text: req.body.text,
//     picture: req.body.picture,
//     user_id: decoded.user_id,
//     community_id: communityID,
//     comment_id: req.body.comment_id,
//   });

//   return res.status(201).json({
//     status: "success",
//     message: "Post created successfully",
//     data: { newPost },
//   });
// });

// exports.GetAllPost = catchAsync(async (req, res, next) => {
//   // const posts = await Post.find();
//   const features = new APIFeatures(Post.find(), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();
//   const posts = await features.query;

//   // await Community.findById(posts.community_id);
//   // const postDetails = await postProcessor(posts);

//   return res.status(200).json({
//     status: "success",
//     length: posts.length,
//     data: { Posts: posts },
//   });
// });

// exports.GetPost = catchAsync(async (req, res, next) => {
//   const post = await Post.findById(req.params.id);

//   if (!post) {
//     // return res
//     //   .status(404)
//     //   .json({ status: "fail", message: "Post not founded" });

//     next(AppError("Post not founded", 404));
//   }
//   return res.status(200).json({ status: "success", data: { post } });
// });

// exports.updatePost = catchAsync(async (req, res) => {
//   const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   res.status(200).json({
//     status: "success",
//     data: {
//       post,
//     },
//   });
// });

// exports.deletePost = catchAsync(async (req, res) => {
//   await Post.findByIdAndDelete(req.params.id);

//   res.status(204).json({
//     status: "success",
//     data: null,
//   });
// });
