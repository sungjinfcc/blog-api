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

module.exports = router;
