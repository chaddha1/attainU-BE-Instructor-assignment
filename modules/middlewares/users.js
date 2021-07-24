const UserModel = require("../users/models/users-model");
const MESSAGES = require("../utils/messages");
const jwt = require("jsonwebtoken");
const CONSTANTS = require("../utils/constant");

/** This method will validate user data when while login or register for required keys.
 * username and password should be provided.
 */

exports.validateUserData = async (req, res, next) => {
  try {
    if (!req.body.username) {
      return res
        .status(400)
        .json({ status: 400, message: MESSAGES.USERNAME_NOT_PROVIDED });
    } else if (!req.body.password) {
      return res
        .status(400)
        .json({ status: 400, message: MESSAGES.PASSWORD_NOT_PROVIDED });
    } else next();
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

/** This method will authorize admin opeartions (admin -> CRUD) */

exports.authorizeAdminUser = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];

      if (token) {
        const isTokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (
          isTokenVerified &&
          isTokenVerified.userRole === CONSTANTS.ADMIN_USER_ROLE
        ) {
          next();
        } else {
          return res
            .status(401)
            .json({ status: 401, message: MESSAGES.UNAUTHORIZED_ACCESS });
        }
      } else {
        return res
          .status(401)
          .json({ status: 401, message: MESSAGES.UNAUTHORIZED_ACCESS });
      }
    } else {
      return res
        .status(401)
        .json({ status: 401, message: MESSAGES.UNAUTHORIZED_ACCESS });
    }
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

/** This method will authorize user opeartions (admin -> read),
 * students-> read posts only
 */

exports.authorizeAdminAndStudent = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];

      if (token) {
        const isTokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (
          isTokenVerified &&
          (isTokenVerified.userRole === CONSTANTS.ADMIN_USER_ROLE ||
            isTokenVerified.userRole === CONSTANTS.STUDENTS_USER_ROLE)
        ) {
          next();
        } else {
          return res
            .status(401)
            .json({ status: 401, message: MESSAGES.UNAUTHORIZED_ACCESS });
        }
      } else {
        return res
          .status(401)
          .json({ status: 401, message: MESSAGES.UNAUTHORIZED_ACCESS });
      }
    } else {
      return res
        .status(401)
        .json({ status: 401, message: MESSAGES.UNAUTHORIZED_ACCESS });
    }
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
