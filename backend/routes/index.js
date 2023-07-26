var express = require("express");
var router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");

const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");
const user_controller = require("../controllers/userController");

// Auth
router.post("/user/login", user_controller.login);
router.post("/user/signup", user_controller.signup);

// Post
router.get("/posts", post_controller.get_posts);
router.post("/post/create", authenticateToken, post_controller.create_post);
router.get("/post/:post_id", post_controller.read_post);
router.put(
  "/post/:post_id/update",
  authenticateToken,
  post_controller.update_post
);
router.delete(
  "/post/:post_id/delete",
  authenticateToken,
  post_controller.delete_post
);

// Comment
router.get("/post/:post_id/comments", comment_controller.get_comments);
router.post(
  "/post/:post_id/comment/create",
  authenticateToken,
  comment_controller.create_comment
);
router.get(
  "/post/:post_id/comment/:comment_id",
  comment_controller.read_comment
);
router.put(
  "/post/:post_id/comment/:comment_id/update",
  authenticateToken,
  comment_controller.update_comment
);
router.delete(
  "/post/:post_id/comment/:comment_id/delete",
  authenticateToken,
  comment_controller.delete_comment
);

module.exports = router;
