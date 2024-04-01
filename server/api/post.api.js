
const Community = require("../models/community.models.js");
const Post = require("../models/post.models.js");
const JWT = require("../token/jwt.js");

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
    try{
      const [posts] = await Promise.all([
        Post.find(),
      ]);
      return res.status(200).json({ status: "success", length: posts.length, data: { posts }});
    }catch (error) {
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

}

module.exports = new PostController();
