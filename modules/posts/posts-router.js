const express = require("express");
const router = express.Router();
const controller = require("./posts-controller");

/**
 * @author : Himanshu Chaddha
 * @description : This endpoint is used by the admin to view all posts
 */

 router.get("get-posts",controller.getPosts);

module.exports = router;
