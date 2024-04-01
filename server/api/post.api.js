const Post = require("../models/post.models.js");

class PostController {
  async CreatePost(req, res) {
    try {
      const { title, text, picture, upvotes, community_name } = req.body;

      const [user_id, community_id] = await Promise.all([
        decodedToken(req.cookies.token),
        Community.findOne({ community_name }).lean().then((community) => community?._id),
      ]);

      if(!community_id){
        community_id = CreateCommunity(community_name);
      }

      // Create a new post instance
      const newPost = new Post({
        title: title,
        text: text,
        picture: picture,
        upvotes: upvotes,
        user_id: user_id,
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
