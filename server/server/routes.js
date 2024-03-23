const express = require("express");
const router = express.Router();
const apiContact = require("../api/contact.api.js");
const apiRegister = require("../api/register.api.js");
const apiLogin = require("../api/login.api.js");
const apiPost = require("../api/post.api.js");
const apiCommunity = require("../api/community.api.js");
const apiComment = require("../api/comment.api.js");
const apiReply = require("../api/reply.api.js");
const apiRule = require("../api/rule.api.js");
const apiVerify_mail = require("../api/verify_mail.api.js");

router.get("/", (req, res) => {
  // Send environment variables as an object
  res.send("Hello World!");
});

// Define routes
router.post("/v1/contact", apiContact.contactForm);
router.post("/v1/register", apiRegister.registerForm);
router.post("/v1/login", apiLogin.loginForm);
router.post("/v1/post", apiPost.postForm);
router.post("/v1/community", apiCommunity.communityForm);
router.post("/v1/comment", apiComment.commentForm);
router.post("/v1/comment", apiReply.replyForm);
router.post("/v1/rule", apiRule.ruleForm);
router.post("/v1/verifymail", apiVerify_mail.verifyMailForm);

module.exports = router;
