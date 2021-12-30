const redis = require('redis')
const listManipulation = require('./listManipulation')
const allowlist = redis.createClient(process.env.REDIS_URL, {prefix: 'allowlist-refresh-token:' })

module.exports = listManipulation(allowlist)
