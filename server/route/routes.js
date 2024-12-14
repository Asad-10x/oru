const express = require('express');
const router = express.Router();
var userController = require('../src/user/userController');

// to get all users
router.route('/user/getAll').get(userController.getDataControllerfn);

// to create new user
router.route('/user/create').post(userController.createDataControllerfn);

module.exports = router;