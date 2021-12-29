const redis = require('redis')
const listManipulation = require('./listManipulation')
const allowlist = redis.createClient({ prefix: 'allowlist-refresh-token:' })

module.exports = listManipulation(allowlist)
