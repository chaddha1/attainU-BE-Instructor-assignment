const mongoose = require("mongoose");
const PostsModel = require("./models/posts-model");
const MESSAGES = require("../utils/messages");

/**  This method will creates new post and returns the same. */

exports.createPost = async (req, res, next) => {
  try {
    let { title = "", description = "" } = req.body;

    const post = new PostsModel({
      title,
      description,
    });

    await post.save();

    return res.json({
      status: 201,
      data: post,
      message: MESSAGES.POST_CREATED_SUCCESS,
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

/**  This method will find the posts and returns paginated data. */

exports.getPosts = async (req, res, next) => {
  try {
    let skip = 0,
      limit = 0;

    if (req.query.skip && parseInt(req.query.skip) >= 0) {
      skip = parseInt(req.query.skip);
    }

    if (req.query.limit && parseInt(req.query.limit) >= 0) {
      limit = parseInt(req.query.limit);
    }
    const totalPosts = await PostsModel.find({});

    const posts = await PostsModel.find({}).skip(skip).limit(limit);
    return res.json({
      status: 200,
      data: posts,
      pagination: {
        skip,
        limit,
        totalPosts: totalPosts.length,
      },
      message: MESSAGES.POSTS_FETCHED_SUCCESS,
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

/**  This method will find and update the post. */

exports.updatePost = async (req, res, next) => {
  try {
    if (req.params && req.params.postId) {
      const post = await PostsModel.findById(req.params.postId);
      if (post) {
        await PostsModel.updateOne(
          { _id: post._id },
          { title: req.body.title, description: req.body.description }
        );

        return res.json({
          status: 200,
          message: MESSAGES.POST_UPDATED_SUCCESS,
        });
      } else {
        return res
          .status(400)
          .json({ status: 400, message: MESSAGES.POST_NOT_EXISTS });
      }
    } else {
      return res
        .status(400)
        .json({ status: 400, message: MESSAGES.POSTID_NOT_PROVIDED });
    }
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

/**  This method will find and delete the post. */

exports.deletePost = async (req, res, next) => {
  try {
    if (req.params && req.params.postId) {
      const post = await PostsModel.findById(req.params.postId);
      if (post) {
        await PostsModel.deleteOne({ _id: post._id });
        return res.json({
          status: 200,
          message: MESSAGES.POST_DELETED_SUCCESS,
        });
      } else {
        return res
          .status(400)
          .json({ status: 400, message: MESSAGES.POST_NOT_EXISTS });
      }
    } else {
      return res
        .status(400)
        .json({ status: 400, message: MESSAGES.POSTID_NOT_PROVIDED });
    }
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
