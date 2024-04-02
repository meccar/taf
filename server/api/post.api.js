
const Community = require("../models/community.models.js");
const Post = require("../models/post.models.js");
const JWT = require("../token/jwt.js");
const CommentController = require("./comment.api.js");
const ReplyController = require("./reply.api.js");
const RuleController = require("./rule.api.js");
const CommunityController = require("./community.api.js");

class PostController {
  async CreatePost(req, res) {
    try {
      const { title, text, picture, community_name } = req.body;

      const [decoded, community_id] = await Promise.all([
        JWT.decodedToken(req.cookies.token), // Assuming decodedToken verifies the token
        Community.findOne({ name: community_name }).lean().then((community) => {
          if (!community) {
            return Community.create({ name: community_name }).then((newCommunity) => newCommunity._id);
          }
          return community?._id; // Return existing community _id
        }),
      ]);

      // Create a new post instance
      const newPost = new Post({
        title: title,
        text: text,
        picture: picture,
        user_id: decoded.user_id,
        community_id: community_id,
      });

      // Save the post to the database
      await newPost.save();

      return res.status(201).json({ status: "success", message: "Post created successfully", data: { newPost } });
    } catch (error) {
      return res.status(500).json({ status: "fail", message: error.message });
    }
  }
  
  async GetAllPost(req, res, next) {
    try {
      const posts = await Post.find();
  
      const postDetails = await Promise.all(
        posts.map(async ({ _id, title, text, picture, community_id }) => {
          const [communities, comments] = await Promise.all([
            CommunityController.GetCommunityByID(community_id),
            CommentController.getCommentByPost(_id),
          ]);
  
          const communitiesDetails = await Promise.all(
            communities.map(async (community) => {
              const { _id: communityId, ...communityData } = community.toObject();
              const rules = await RuleController.GetRuleByID(communityId);
              return { ...communityData, Rule: rules };
            })
          );
  
          const commentsDetails = await Promise.all(
            comments.map(async (comment) => {
              if (!comment) return null;
  
              const replies = await ReplyController.getReplyByComment(comment._id);
              return { ...comment.toJSON(), Replies: replies };
            })
          );
  
          return {
            id: _id,
            title,
            text,
            picture,
            Community: communitiesDetails,
            Comments: commentsDetails,
          };
        })
      );
  
      return res.status(200).json({
        status: "success",
        length: postDetails.length,
        data: { Posts: postDetails },
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", message: error.message });
    }
  }

  async GetPost(req, res, next) {
    try{
      const post = await Post.findById(req.params.id);

      if (!post){
        return res.status(404).json({ status: "fail", message: "Post not founded" });
      }
      return res.status(200).json({ status: "success", data: { post }});
    }catch (error) {
      return res.status(500).json({ status: "fail", message: error.message });
    }
  }

  async getPostID(title) {
    try {
      const post = await Post.findOne({ title: title }); // Find post by title
      if (post) {
        return post._id; // Return the _id of the found post
      } else {
        return null; // Return null if post is not found
      }
    } catch (error) {
      throw error;
    }
  }

}

module.exports = new PostController();
