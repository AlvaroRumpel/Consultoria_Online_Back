const redis = require('redis');
const conection = redis.createClient({ prefix: 'reset-password:' })
const listManipulation = require('./listManipulation');

module.exports = listManipulation(conection);
