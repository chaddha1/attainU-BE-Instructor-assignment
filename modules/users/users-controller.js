const UserModel = require("./models/users-model");
const MESSAGES = require("../utils/messages");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CONSTANTS = require("../utils/constant");

/** This method is used to login a user (admin or student) and returns the user data
 * with jwt token.
 */
exports.login = async (req, res, next) => {
  try {
    // if loggedIn user is admin then compare password from db else generate mock token
    let jwtKey = process.env.JWT_SECRET_KEY;
    if (
      req.body.username &&
      req.body.username === process.env.DEFAULT_ADMIN_USERNAME
    ) {
      let user = await UserModel.findOne({ username: req.body.username });
      if (user) {
        // verify password
        const isPasswordValid = await bcrypt.compare(
          req.body.password,
          user.password
        );

        if (isPasswordValid) {
          //sign a jwt according to user role
          let userRole = user.userRole;

          const token = jwt.sign({ username: user.username, userRole }, jwtKey);

          return res.status(200).json({
            status: 200,
            user,
            token,
            message: MESSAGES.LOGIN_SUCCESS,
          });
        } else {
          return res
            .status(401)
            .json({ status: 401, messgae: MESSAGES.INVALID_PASSWORD });
        }
      } else {
        return res
          .status(404)
          .json({ status: 404, messgae: MESSAGES.USER_NOT_EXISTS });
      }
    } else {
      let userRole = CONSTANTS.STUDENTS_USER_ROLE;

      const token = jwt.sign({ username: req.body.username, userRole }, jwtKey);

      return res.status(200).json({
        status: 200,
        user: {
          username: req.body.username,
          userRole,
        },
        token,
        message: MESSAGES.LOGIN_SUCCESS,
      });
    }
  } catch (error) {
    if (error) return next(error);
  }
};
