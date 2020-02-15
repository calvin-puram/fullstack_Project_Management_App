const express = require('express');

const router = express.Router();

const authController = require('../controller/auth');
const projectController = require('../controller/project');

router
  .route('/')
  .get(projectController.getAllProjects)
  .post(authController.protect, projectController.createProject);

router
  .route('/me')
  .get(authController.protect, projectController.getUserProject);

router
  .route('/:id')
  .patch(authController.protect, projectController.updateProject)
  .delete(authController.protect, projectController.deleteProject);

module.exports = router;
