'use strict';

var _ = require('lodash');
var Comment = require('./comment.model');


// Get a single comment
exports.getBytopicId = function(req, res) {
  Comment.find({topicId:req.params.id}).sort({createdAt: -1}).populate({path: 'userId', select: 'firstname'}).exec(function (err, comment) {
    if(err) { return handleError(res, err); }
    if(!comment) { return res.status(404).send('Not Found'); }
    return res.json(comment);
  });
};

// Creates a new comment in the DB.
exports.create = function(req, res) {
  req.body.userId = req.user._id;
  Comment.create(req.body, function(err, comment) {
    if(err) { return handleError(res, err); }
    console.log(socketIO)
    socketIO.emit('latestComment',req.body.topicId);
    return res.status(201).send({message: 'commented Succesfully !!!'});
  });
};


function handleError(res, err) {
  return res.status(500).send(err);
}