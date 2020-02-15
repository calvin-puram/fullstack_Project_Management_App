const path = require('path');
const Users = require('../model/Users');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/Error');

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

//@desc   Image Upload
//@route  Patch /api/v1/users/photo
//@access private
exports.uploadPhoto = catchAsync(async (req, res, next) => {
  const user = await Users.findById(req.user.id);

  if (!user) {
    return next(new AppError('no user found', 400));
  }

  if (!req.files) {
    return next(new AppError('please upload an image', 400));
  }

  const { file } = req.files;
  if (!file.mimetype.startsWith('image')) {
    return next(new AppError('only images are allowed', 400));
  }

  if (file.size > process.env.IMAGE_SIZE) {
    return next(
      new AppError('please upload an image that is less than 1mb', 400)
    );
  }

  file.name = `photo_${req.user.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.IMAGE_PATH}/${file.name}`, async err => {
    if (err) {
      console.log(err);
      return next(
        new AppError('Something unexpected happens. please try again', 500)
      );
    }

    await Users.findByIdAndUpdate(req.user.id, { image: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});
