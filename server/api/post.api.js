const Post = require("../models/post.models.js");

class PostController {
  async CreatePost(req, res, next) {
    try {
      const { title, text, picture, upvotes, user_id, community_id } = req.body;

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

      res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new PostController();
