const express = require('express');

const router = express.Router();

const userController = require('../controller/users');
const authController = require('../controller/auth');

router.route('/').get(authController.protect, userController.getUser);

module.exports = router;
