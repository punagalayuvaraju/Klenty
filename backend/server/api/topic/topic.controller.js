'use strict';

var _ = require('lodash');
var Topic = require('./topic.model');

// Get list of topics
exports.index = function(req, res) {
  Topic.find().sort({createdAt: -1}).populate({path: 'userId', select: 'firstname'}).exec(function(err, topics) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(topics);
  })
};


// Creates a new topic in the DB.
exports.create = function(req, res) {
  req.body.userId = req.user._id;
  Topic.create(req.body, function(err, topic) {
    if(err) { return handleError(res, err); }
    socketIO.emit('latesttopic');
    return res.status(201).send({message:'Topic and Description Added Successfully !!!'});
  });
};



function handleError(res, err) {
  return res.status(500).send(err);
}