const jwt = require('jsonwebtoken');

const Users = require('../model/Users');
const AppError = require('../utils/Error');
const catchAsync = require('../utils/catchAsync');

const sendToken = (user, res, statusCode) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  });

  user.password = undefined;
  res.status(statusCode).json({
    success: true,
    token: token
  });
};

//@desc   Register Users
//@route  Post /api/v1/auth/register
//@access public
exports.register = catchAsync(async (req, res, next) => {
  const user = await Users.create(req.body);

  sendToken(user, res, 200);
});

//@desc   Login Users
//@route  Post /api/v1/auth/login
//@access public
exports.login = catchAsync(async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  if (!email || !password || !confirmPassword) {
    return next(new AppError('all fields are required', 400));
  }

  const user = await Users.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError('Invalid Credentials', 400));
  }

  sendToken(user, res, 200);
});

//@desc   protect route
//@route  middleware
//@access public
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('you are not logged in', 401));
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await Users.findById(decode.id);

  if (!currentUser) {
    return next(new AppError('user no longer exist', 404));
  }

  req.user = currentUser;

  next();
});

//@desc   users profile
//@route  Get /api/v1/auth/profile
//@access profile
exports.profile = catchAsync(async (req, res, next) => {
  const user = await Users.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user
  });
});
