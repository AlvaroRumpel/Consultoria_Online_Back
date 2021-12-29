const Services = require('./Services')
const database = require('../models')

class ExerciseServices extends Services {
  constructor () {
    super('Exercise')
  }

  async checkExerciseId (id) {
    return await database.Exercise_list.findOne({ where: { id: Number(id) } })
  }

  async createRecord (data) {
    try {
      await this.checkExerciseId(data.id_exercise)
      return await database.Exercise.create(data)
    } catch (error) {
      return error.message
    }
  }
}

module.exports = ExerciseServices
