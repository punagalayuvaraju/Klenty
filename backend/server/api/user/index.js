'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var path = require('path');

var router = express.Router();

// router.get('/:id', auth.isAuthenticated(), controller.show);

router.post('/', controller.create);

// router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);

// router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
