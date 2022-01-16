const redis = require('redis')
const listManipulation = require('./listManipulation')

if (process.env.NODE_ENV !== 'production') {
  var allowlist = redis.createClient({
    prefix: 'allowlist-refresh-token:'
  })
} else {
  const redisURL = new URL(process.env.REDIS_URL)
  var allowlist = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
  })
}

module.exports = listManipulation(allowlist)
