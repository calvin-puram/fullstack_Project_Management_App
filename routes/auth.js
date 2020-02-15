const express = require('express');

const router = express.Router();

const authController = require('../controller/auth');

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/profile').get(authController.protect, authController.profile);

module.exports = router;
