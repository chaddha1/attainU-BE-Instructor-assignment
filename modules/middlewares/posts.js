const MESSAGES = require("../utils/messages");

/** This method will validate post data when admin creates or updates the post data.
 * title and description should be provided.
 */

exports.validatePostData = async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res
        .status(400)
        .json({ status: 400, message: MESSAGES.POST_TITLE_NOT_PROVIDED });
    } else if (!req.body.description) {
      return res
        .status(400)
        .json({ status: 400, message: MESSAGES.POST_DESCRIPTION_NOT_PROVIDED });
    }

    if (req.body.title.length > 254) {
      return res
        .status(400)
        .json({ status: 400, message: MESSAGES.TITLE_LIMIT_EXCEEDED });
    } else if (req.body.description.length > 254) {
      return res
        .status(400)
        .json({ status: 400, message: MESSAGES.DESCRIPTION_LIMIT_EXCEEDED });
    }

    next();
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
