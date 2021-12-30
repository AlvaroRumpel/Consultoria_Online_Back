const redis = require('redis')

if(process.env.NODE_ENV !== 'production'){
    var conection = redis.createClient({ prefix: 'reset-password:' })
}else{
    const redisURL = new URL(process.env.REDIS_URL)
    var conection = redis.createClient(redisURL.port, redisURL.hostname, { no_ready_check: true, prefix: 'reset-password:' })
}
const listManipulation = require('./listManipulation')

module.exports = listManipulation(conection)
