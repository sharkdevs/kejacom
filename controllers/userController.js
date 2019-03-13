'use strict'

const User = require('../models/usersModel');

// create a new user

const newUser = function (req,res) {
  var user = new User();
  user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
  user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.phone = req.body.phone;

  // save the new user
  user.save(function(err){
    if (err)
      res.json({
        status: 'eror',
        message: err
      });
    res.json({
      status: 'Success',
      message: user
    });
  });
}
module.exports = newUser;