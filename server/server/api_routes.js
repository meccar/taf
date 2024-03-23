const express = require("express");
// const router = express.Router();
const api = express.Router();
const apiContact = require("../api/contact.api.js");
const apiRegister = require("../api/register.api.js");
const apiLogin = require("../api/login.api.js");
const apiPost = require("../api/post.api.js");
const apiCommunity = require("../api/community.api.js");
const apiComment = require("../api/comment.api.js");
const apiReply = require("../api/reply.api.js");
const apiRule = require("../api/rule.api.js");
const apiVerify_mail = require("../api/verify_mail.api.js");

// Define routes
api.post("/v1/contact", apiContact.contactForm);
api.post("/v1/register", apiRegister.registerForm);
api.post("/v1/login", apiLogin.loginForm);
api.post("/v1/post", apiPost.postForm);
api.post("/v1/community", apiCommunity.communityForm);
api.post("/v1/comment", apiComment.commentForm);
api.post("/v1/comment", apiReply.replyForm);
api.post("/v1/rule", apiRule.ruleForm);
api.post("/v1/verifymail", apiVerify_mail.verifyMailForm);

module.exports = api;
