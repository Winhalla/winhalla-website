// generated by sapper build at 2021-07-01T16:27:59.032Z
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.PORT = process.env.PORT || 3000;

console.log('Starting server on port ' + process.env.PORT);
require('./server/server.js');