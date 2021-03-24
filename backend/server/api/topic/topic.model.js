'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TopicSchema = new Schema({
  topic: String,
  description: String,
  userId:{type:Schema.Types.ObjectId,ref:'User'},
  active: Boolean
},{ timestamps: true });

module.exports = mongoose.model('Topic', TopicSchema);