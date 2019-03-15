'use strict'

const User = require('../models/usersModel.js');

/**
 * Create a new user API Cont
 */
exports.newUser = function (req,res) {
  var user = new User();
  user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
  user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.phone = req.body.phone;

  // check whether the user email already exists in the database
  User.find({ email: user.email })
  .then((data) => {
    if (data.length > 0) {
      res.status(400).json({
        "message": " User already exists in the database"
      })
    }
    // save the new user if the email address is unique
    else {
      user.save(function (err) {
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
  })
  .catch((err) => {
    res.status(401).json({
      status: "error",
      error:err
    });
  })
}

/**
 * Get all users Controller
 */

exports.allUsers = function (req, res) {
  User.find({})
    .then((data) => {
      data.length < 1 ?
        res.status(402).json({
          status: "not found",
          message: "No User Found in the database"
        })
        : res.json({
          users: data
        });
    })
    .catch((err) => {
      res.status(402).json({
        status: "not found",
        message: "No User Found in the database"
      });
    });
};

/**
 * 
 * Get single User deatails
 * 
 */
exports.oneUser = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    err && res.send(err);
   user == null
    ?res.status(404).json({
        status: "Not Found",
        message: "The user is not found"
      })
    :res.json({
      status: "Success",
      user: user
    })
  });
};

/**
 * 
 * UPDATE single User deatails
 * 
 */
exports.updateUser = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err)
      res.send(err);
    
    // get the values passed
    user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
    user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.phone = req.body.phone;

    // check whether the email is in use
    User.find({ email: req.body.email })
      .then((data) => {
        data.length >= 1
          ? res.json({ status: "bad request", message: "user email already taken" })
          : user.save(function (err) {
            if (err)
              res.status(400).json(err);
            res.json({
              status: "Successfully Updated",
              user: user
            })
          });
      })
     .catch((err) => {
       res.status(400).json({
         status: "Querry error",
         message: err
       });
     });
  
  });
};

/**
 * 
 * Delete a User
 * 
 */
exports.deleteUser = function (req, res) {
  User.findByIdAndRemove({ _id: req.params.user_id },
    function (err, user) {
      if (err) 
        res.status(400).json({
          status: "Deletion Error",
          message: err 
        });
      !user
      ?res.status(404).json({
          status: "Wrong User",
          message: "User not found"
      })
      :res.json({
        status: "Successful Deletion",
        message:"User deleted successfully"
       });
  });
}