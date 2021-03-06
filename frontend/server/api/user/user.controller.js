'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var rn = require('random-number')
var moment = require('moment')


var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  console.log(req.body)
  const user = new User(req.body);
  user.save(function(err,response) {
    if(err) {
      console.log(err);
      if (err && err.code === 11000) {
        res.status(400).json({message: 'The specified User is already Exist with us !!!'})
       } else {
         res.status(400).send({message:'Something Went Wrong !!!'});
       }  
    } else {
      var token = jwt.sign({_id: response._id }, config.secrets.session, { expiresInMinutes: 60*5 });
      res.status(200).json({ token: token ,userrole: response.role,firstname:response.firstname});
    }
  });
  };

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};


