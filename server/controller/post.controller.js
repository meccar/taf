/* eslint-disable no-useless-catch */
/* eslint-disable camelcase */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable node/no-unsupported-features/es-builtins */

const Community = require("../models/community.models");
const Post = require("../models/post.models");
const JWT = require("../token/jwt");
const APIFeatures = require("../util/apiFeatures");
// const CommentController = require("./comment.controller");
// const ReplyController = require("./reply.controller");
// const RuleController = require("./rule.controller");
// const CommunityController = require("./community.controller");
const postProcessor = require("../processor/post.processor");

class PostController {
  async CreatePost(req, res) {
    try {
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
    } catch (error) {
      return res.status(500).json({ status: "fail", message: error.message });
    }
  }

  async GetAllPost(req, res, next) {
    try {
      // const posts = await Post.find();
      const features = new APIFeatures(Post.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const posts = await features.query;

      // const postDetails = await Promise.all(
      //   posts.map(
      //     async ({
      //       _id,
      //       title,
      //       text,
      //       picture,
      //       upvotes,
      //       timestamp,
      //       community_id,
      //     }) => {
      //       const [communities, comments] = await Promise.all([
      //         CommunityController.GetCommunityByID(community_id),
      //         CommentController.getCommentByPost(_id),
      //       ]);
      //       const communitiesDetails = await Promise.all(
      //         communities.map(async (community) => {
      //           const { _id: communityId, ...communityData } =
      //             community.toObject();
      //           const rules = await RuleController.GetRuleByID(communityId);
      //           return { ...communityData, Rule: rules };
      //         }),
      //       );

      //       const commentsDetails = await Promise.all(
      //         comments.filter(Boolean).map(async (comment) => {
      //           const replies = await ReplyController.getReplyByComment(
      //             comment._id,
      //           );
      //           return { ...comment.toJSON(), Replies: replies };
      //         }),
      //       );

      //       return {
      //         id: _id,
      //         title,
      //         text,
      //         picture,
      //         upvotes,
      //         timestamp,
      //         Community: communitiesDetails,
      //         Comments: commentsDetails,
      //       };
      //     },
      //   ),
      // );
      const postDetails = await postProcessor(posts);

      return res.status(200).json({
        status: "success",
        length: postDetails.length,
        data: { Posts: postDetails },
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", message: error.message });
    }
  }

  async GetPost(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res
          .status(404)
          .json({ status: "fail", message: "Post not founded" });
      }
      return res.status(200).json({ status: "success", data: { post } });
    } catch (error) {
      return res.status(500).json({ status: "fail", message: error.message });
    }
  }

  async getPostID(title) {
    try {
      const post = await Promise.all([Post.findOne({ title: title })]);
      return post._id;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(req, res) {
    try {
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
    } catch (error) {
      return res.status(404).json({ status: "fail", message: error.message });
    }
  }

  async deletePost(req, res) {
    try {
      await Post.findByIdAndDelete(req.params.id);

      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  }
}

module.exports = new PostController();
