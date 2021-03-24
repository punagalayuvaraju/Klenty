/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/comments', require('./api/comment'));
  app.use('/api/topics', require('./api/topic'));
  
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  

};
