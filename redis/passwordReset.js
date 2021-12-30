const redis = require('redis')
const conection = redis.createClient(process.env.REDIS_URL, {prefix: 'reset-password:' })
const listManipulation = require('./listManipulation')

module.exports = listManipulation(conection)
