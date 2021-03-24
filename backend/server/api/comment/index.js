'use strict';

var express = require('express');
var controller = require('./comment.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:id', controller.getBytopicId);
router.post('/',auth.isAuthenticated(),controller.create);


module.exports = router;