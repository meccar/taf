/* eslint-disable prettier/prettier */

const express = require("express");

const api = express.Router();
const ContactController = require("../controller/contact.controller");
const UserController = require("../controller/user.controller");
const PostController = require("../controller/post.controller");
const CommunityController = require("../controller/community.controller");
const CommentController = require("../controller/comment.controller");
const ReplyController = require("../controller/reply.controller");
const RuleController = require("../controller/rule.controller");
const VerifyMailController = require("../controller/verify_mail.controller");

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
    .get(PostController.GetAllPost)
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
