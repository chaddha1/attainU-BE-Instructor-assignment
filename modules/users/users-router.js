const express = require("express");
const router = express.Router();
const controller = require("./users-controller");
const userMiddleware = require("../middlewares/users");
/**
 * @author : Himanshu Chaddha
 * @description : This endpoint is used by the users (admin or students) to login
 */

router.post("/login", userMiddleware.validateUserData, controller.login);

module.exports = router;
