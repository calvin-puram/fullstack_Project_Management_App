const Users = require('../model/Users');

exports.getUser = async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err
    });
  }
};
