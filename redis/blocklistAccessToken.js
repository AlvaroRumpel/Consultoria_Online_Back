const redis = require('redis')

const blocklist = redis.createClient(process.env.REDIS_URL, {prefix: 'blocklist-access-token:' })
const listManipulation = require('./listManipulation')
const blocklistManipulate = listManipulation(blocklist)

const jwt = require('jsonwebtoken')
const { createHash } = require('crypto')

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
