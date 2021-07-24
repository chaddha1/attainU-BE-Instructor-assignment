const UserModel = require("./models/users-model");

exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (error) {
    if (error) return next(error);
  }
};
