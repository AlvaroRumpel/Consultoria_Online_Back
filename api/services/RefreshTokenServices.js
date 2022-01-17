const Services = require('./Services')
const database = require('../models')

class RefreshTokenService extends Services {
  constructor () {
    super('tokens')
  }

  async createRecord (data) {
    const { key, valid } = data
    const exists = await database.tokens.findAll({ where: { id_Client: Number(data.id_Client), type: data.type } })
    if (exists.length > 0) {
      return await database.tokens.update({ key, valid }, { where: { id_Client: Number(data.id_Client), type: data.type } })
    } return await database.tokens.create(data)
  }

  async getKey (key, type) {
    const refreshToken = await database.tokens.findOne({ where: { key: key, valid: true, type: type } })
    return refreshToken.id_Client
  }

  async deleteKey (key, type) {
    return await database.tokens.destroy({ where: { key: key, valid: true, type: type } })
  }

  async getKeyInvalid (key, type) {
    const token = await database.tokens.findOne({ where: { key: key, valid: false, type: type } })
    return token
  }

  async invalidateKey (key, type) {
    return await database.tokens.update({ valid: false }, { where: { key: key, valid: true, type: type } })
  }
}

module.exports = RefreshTokenService
