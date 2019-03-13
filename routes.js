'use strict'
const newUser = require('./controllers/userController');
const express = require('express');
const router = express.Router();

// create a route
router.get('/', (req, res) => {
    res.send("Welcome to Kejacom APIs. This is just V1");
});

// new user API
router.route('/register')
    .post(newUser)

module.exports = router;