'use strict';

const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
// const allUsers = require('./controllers/userController');
// const oneUser = require('./controllers/userController');
// const updateUser = require('./controllers/userController');

// create a route
router.get('/', (req, res) => {
    res.send("Welcome to Kejacom APIs. This is just V1");
});

// create API endpoints
router.route('/api/v1/auth/register')
    .post(userController.newUser);
router.route('/api/v1/users')
    .get(userController.allUsers);
router.route('/api/v1/users/:user_id')
    .get(userController.oneUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;