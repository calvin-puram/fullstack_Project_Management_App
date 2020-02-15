const Project = require('../model/Project');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/Error');

//@desc   Get all Projects
//@route  Get /api/v1/projects
//@access public
exports.getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find().sort('-createdAt');

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects
  });
});

//@desc   Get all Projects Belonging to a User
//@route  Get /api/v1/projects/:id
//@access private
exports.getUserProject = catchAsync(async (req, res, next) => {
  const projects = await Project.find({ user: req.user.id });

  if (!projects) {
    return next(new AppError('no resource found', 404));
  }

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects
  });
});

//@desc   Create A Project
//@route  Get /api/v1/projects/
//@access private
exports.createProject = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const projects = await Project.create(req.body);

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects
  });
});

//@desc   Update A Project
//@route  Get /api/v1/projects/:id
//@access private
exports.updateProject = catchAsync(async (req, res, next) => {
  let project = await Project.findById(req.params.id);

  if (project.user._id.toString() !== req.user.id) {
    return next(new AppError('only owner can edit his project', 401));
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: project
  });
});

//@desc   Delete A Project
//@route  Get /api/v1/projects/:id
//@access private
exports.deleteProject = catchAsync(async (req, res, next) => {
  let project = await Project.findById(req.params.id);

  if (project.user._id.toString() !== req.user.id) {
    return next(new AppError('only owner can delete his project', 401));
  }

  project = await Project.findByIdAndRemove(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});
