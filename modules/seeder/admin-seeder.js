const UserModel = require("../users/models/users-model");
const bcrypt = require("bcrypt");
const CONSTANTS = require("../utils/constant");
const saltRounds = 10;

/** This method will create a default admin when anyone starts the server */

async function createDefaultAdmin() {
  try {
    let adminAlreadyExists = await UserModel.findOne({
      userRole: CONSTANTS.ADMIN_USER_ROLE,
    });
    if (!adminAlreadyExists) {
      let encryptedPass = await bcrypt.hash(
        process.env.DEFAULT_ADMIN_PASSWORD,
        saltRounds
      );

      const defaultAdmin = new UserModel({
        userRole: CONSTANTS.ADMIN_USER_ROLE,
        username: process.env.DEFAULT_ADMIN_USERNAME,
        password: encryptedPass,
      });

      await defaultAdmin.save();
    }
  } catch (error) {
    throw error;
  }
}

createDefaultAdmin();
