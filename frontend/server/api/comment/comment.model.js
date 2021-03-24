'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
},{ timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);