const express = require('express');
const router = express.Router();
var userController = require('../src/user/userController');
const { verifyTokenMiddleware } = require('../middleware/authMiddleware');


// public routes
router.route('/login').post(userController.loginControllerFn);
router.route('/register').post(userController.createDataControllerfn);

// Protected routes
router.route('/').get( verifyTokenMiddleware, userController.getDataControllerfn);


module.exports = router;