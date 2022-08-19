const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user');

// user data
router.route('/user')
    .get(ctrlUser.getUsers)
    .post(ctrlUser.createUser);
//login service
router.route('/user/login').post(ctrlUser.userLogin)

module.exports = router;