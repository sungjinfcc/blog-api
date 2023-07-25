const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const Post = require("../models/post");

exports.get_posts = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find()
    .populate("author")
    .sort({ timestamp: -1 })
    .exec();

  res.json(allPosts);
});

exports.create_post = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Title field is required"),
  body("content", "Content field is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.user._id,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0],
      });
    } else {
      await post.save();
      return res.json({
        message: "Post created",
      });
    }
  }),
];

exports.read_post = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.post_id)
    .populate("author")
    .exec();

  if (post === null) {
    // No results.
    const err = new Error("Post not found");
    err.status = 404;
    return next(err);
  }

  res.json(post);
});

exports.update_post = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Title field is required"),
  body("content", "Content field is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const post = new Post({
      _id: req.params.post_id,
      title: req.body.title,
      content: req.body.content,
      author: req.user._id,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0],
      });
    } else {
      await Post.findByIdAndUpdate(req.params.post_id, post, {});
      return res.json({
        message: "Post updated",
      });
    }
  }),
];

exports.delete_post = asyncHandler(async (req, res, next) => {
  await Post.findByIdAndRemove(req.params.post_id);
  return res.json({ message: "Succesfully deleted" });
});
