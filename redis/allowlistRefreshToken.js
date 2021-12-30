const redis = require('redis')
const listManipulation = require('./listManipulation')

if(process.env.NODE_ENV !== 'production'){
    var allowlist = redis.createClient({ prefix: 'allowlist-refresh-token:' })
}else{
    const redisURL = new URL(process.env.REDIS_URL)
    var allowlist = redis.createClient(redisURL.port, redisURL.hostname, { no_ready_check: true, prefix: 'allowlist-refresh-token:' })
}

module.exports = listManipulation(allowlist)
