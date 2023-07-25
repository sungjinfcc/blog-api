var express = require("express");
var router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");

const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");
const user_controller = require("../controllers/userController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Starting point");
});

router.get("/user", authenticateToken, function (req, res, next) {
  res.json({
    message: "You have access to the protected route.",
    user: req.user,
  });
});

router.post("/user/login", user_controller.login);
router.post("/user/signup", user_controller.signup);

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

module.exports = router;
