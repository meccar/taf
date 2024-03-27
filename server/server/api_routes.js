const express = require("express");
// const router = express.Router();
const api = express.Router();
const ContactController = require("../api/contact.api.js");
// const RegisterController = require("../api/register.api.js");
const UserController = require("../api/user.api.js");
const PostController = require("../api/post.api.js");
const CommunityController = require("../api/community.api.js");
const CommentController = require("../api/comment.api.js");
const ReplyController = require("../api/reply.api.js");
const RuleController = require("../api/rule.api.js");
const VerifyMailController = require("../api/verify_mail.api.js");

// Define routes
api.post("/v1/contact", ContactController.contactForm);
api.post("/v1/register", UserController.register);
api.post("/v1/login", UserController.login);
api.get("/v1/logout", UserController.logout);
api.post("/v1/post", PostController.CreatePost);
api.post("/v1/community", CommunityController.CreateCommunity);
api.post("/v1/comment", CommentController.comment);
api.post("/v1/comment", ReplyController.reply);
api.post("/v1/rule", RuleController.CreateRule);
api.post("/v1/verifymail", VerifyMailController.verifyMail);

module.exports = api;
