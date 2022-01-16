const redis = require('redis')

if (process.env.NODE_ENV !== 'production') {
  var blocklist = redis.createClient({
    prefix: 'blocklist-access-token:'
  })
} else {
  // const redisURL = new URL(process.env.REDIS_URL)
  var blocklist = redis.createClient({ url: process.env.REDIS_URL })
}
const listManipulation = require('./listManipulation')
const blocklistManipulate = listManipulation(blocklist)

const jwt = require('jsonwebtoken')
const {
  createHash
} = require('crypto')

function generateTokenHash (token) {
  return createHash('sha256')
    .update(token)
    .digest('hex')
}

module.exports = {
  add: async token => {
    const expirationDate = jwt.decode(token).exp
    const tokenHash = await generateTokenHash(token)
    await blocklistManipulate.add(tokenHash, '', expirationDate)
  },
  containToken: async token => {
    const tokenHash = generateTokenHash(token)
    return await blocklistManipulate.containsKey(tokenHash)
  }

}
