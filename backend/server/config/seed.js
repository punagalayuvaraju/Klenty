/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var Comment = require('../api/comment/comment.model');
var Topic = require('../api/topic/topic.model');

var User = require('../api/user/user.model');

// Insert seed data below
var commentSeed = require('../api/comment/comment.seed.json');
var topicSeed = require('../api/topic/topic.seed.json');


// Thing.find({}).remove(function() {
//   Thing.create(thingSeed);
// });