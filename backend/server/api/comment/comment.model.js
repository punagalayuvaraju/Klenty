'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  userId:{type:Schema.Types.ObjectId,ref:'User'},
  topicId:{type:Schema.Types.ObjectId,ref:'Topic'},
  comment: String,
  active: Boolean
},{ timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);