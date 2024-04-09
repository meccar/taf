/* eslint-disable camelcase */
const CommentController = require("../controller/comment.controller");
const CommunityController = require("../controller/community.controller");
const communityProcessor = require("./community.processor");
const commentProcessor = require("./comment.processor");

async function PostProcessor(posts) {
  return await Promise.all(
    posts.map(
      async ({
        _id,
        title,
        text,
        picture,
        upvotes,
        timestamp,
        community_id,
      }) => {
        // Fetch communities and comments for each post
        const [communities, comments] = await Promise.all([
          CommunityController.GetCommunityByID(community_id),
          CommentController.getCommentByPost(_id),
        ]);

        // Process community details
        const communitiesDetails = await communityProcessor(communities);

        // Process comment details
        const commentsDetails = await commentProcessor(comments);

        // Return post details
        return {
          id: _id,
          title,
          text,
          picture,
          upvotes,
          timestamp,
          Community: communitiesDetails,
          Comments: commentsDetails,
        };
      },
    ),
  );
}

module.exports = PostProcessor;
