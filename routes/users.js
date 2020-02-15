const express = require('express');

const router = express.Router();

const userController = require('../controller/users');
const authController = require('../controller/auth');

router.route('/').get(authController.protect, userController.getUser);
router
  .route('/photo')
  .patch(authController.protect, userController.uploadPhoto);
module.exports = router;
