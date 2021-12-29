const Services = require('./Services')
const database = require('../models')

class TrainingSheetServices extends Services {
  constructor () {
    super('Training_sheet')
  }

  async checkClientId (id) {
    return await database.Clients.findOne({ where: { id: Number(id) } })
  }

  async createRecord (data) {
    const body = { ...data.body, id_client: data.clientId }
    try {
      await this.checkClientId(data.clientId)
      return await database.Training_sheet.create(body)
    } catch (error) {
      return error.message
    }
  }

  async updateRecordWithId (id, clientId, data) {
    return database.Training_sheet.update(data, {
      where: {
        id: Number(id),
        id_client: Number(clientId)
      }
    })
  }
}

module.exports = TrainingSheetServices
