const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.get_comments = asyncHandler(async (req, res, next) => {
  const allComments = await Comment.find({ post: req.params.post_id })
    .sort({ timestamp: -1 })
    .exec();

  res.status(200).json(allComments);
});

exports.create_comment = [
  body("message").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const comment = new Comment({
      name: req.user.username,
      message: req.body.message,
      post: req.params.post_id,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0],
      });
    } else {
      await comment.save();
      return res.json({
        message: "Comment created",
      });
    }
  }),
];

exports.read_comment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.comment_id).exec();

  if (comment === null) {
    // No results.
    const err = new Error("Comment not found");
    err.status = 404;
    return next(err);
  }

  res.json(comment);
});

exports.update_comment = [
  body("message").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const comment = new Comment({
      _id: req.params.comment_id,
      name: req.user.username,
      message: req.body.message,
      post: req.params.post_id,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0],
      });
    } else {
      await Comment.findByIdAndUpdate(req.params.comment_id, comment, {});
      return res.json({
        message: "Comment updated",
      });
    }
  }),
];

exports.delete_comment = asyncHandler(async (req, res, next) => {
  await Comment.findByIdAndDelete(req.params.comment_id);
  return res.json({ message: "Succesfully deleted" });
});
