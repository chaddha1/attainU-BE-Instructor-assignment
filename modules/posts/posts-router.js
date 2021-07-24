const express = require("express");
const router = express.Router();
const controller = require("./posts-controller");
const postsMiddleware = require("../middlewares/posts");
const userMiddleware = require("../middlewares/users");
/**
 * @author : Himanshu Chaddha
 * @description : This endpoint is used by the admin to create new post
 */

router.post(
  "/new-post",
  userMiddleware.authorizeAdminUser,
  postsMiddleware.validatePostData,
  controller.createPost
);

/**
 * @author : Himanshu Chaddha
 * @description : This endpoint is used by the admin to view all posts
 */

router.get(
  "/get-posts",
  userMiddleware.authorizeAdminAndStudent,
  controller.getPosts
);

/**
 * @author : Himanshu Chaddha
 * @description : This endpoint is used by the admin to update a post
 */

router.put(
  "/update-post/:postId",
  userMiddleware.authorizeAdminUser,
  postsMiddleware.validatePostData,
  controller.updatePost
);

/**
 * @author : Himanshu Chaddha
 * @description : This endpoint is used by the admin to delete a post
 */

router.delete(
  "/delete-post/:postId",
  userMiddleware.authorizeAdminUser,
  controller.deletePost
);

module.exports = router;
