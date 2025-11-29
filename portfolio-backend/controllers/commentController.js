const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');

// @desc    Get all comments for a blog post
// @route   GET /api/blog/:postId/comments
// @access  Public
const getComments = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.postId);
    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a comment
// @route   POST /api/blog/:postId/comments
// @access  Private
const createComment = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.postId);
    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    const { body } = req.body;

    const comment = await Comment.create({
      body,
      author: req.user._id,
      post: req.params.postId
    });

    const populatedComment = await Comment.findById(comment._id).populate('author', 'username');
    res.status(201).json(populatedComment);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a comment
// @route   DELETE /api/blog/:postId/comments/:commentId
// @access  Private (Author only)
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      res.status(404);
      throw new Error('Comment not found');
    }

    // Check if user is the author
    if (comment.author.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this comment');
    }

    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ message: 'Comment removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getComments,
  createComment,
  deleteComment
};
