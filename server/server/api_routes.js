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
api
    .route("/v1/contact")
    .post(ContactController.contactForm);

api
    .route("/v1/register")
    .post( UserController.register);

api
    .route("/v1/login")
    .post(UserController.login);

api
    .route("/v1/logout")
    .get(UserController.logout);

api
    .route("/v1/post")
    .post(PostController.CreatePost);

api
    .route("/v1/post/:id")
    .post(PostController.GetPost);    

api
    .route("/v1/community")
    .post(CommunityController.CreateCommunity);

api
    .route("/v1/comment")
    .post( CommentController.comment);

api
    .route("/v1/reply")
    .post(ReplyController.reply);

api
    .route("/v1/rule")
    .post(RuleController.CreateRule);

api
    .route("/v1/verifymail/:email/:secret_code")
    .get(VerifyMailController.verifyMail);

module.exports = api;
