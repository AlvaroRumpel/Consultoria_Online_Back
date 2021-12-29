const { ExerciseListServices } = require('../services')

const exerciseListService = new ExerciseListServices()

class ExerciseListController {
  static async getAllExercises (req, res) {
    try {
      const allExercises = await exerciseListService.getAllRecords()
      return res.status(200).json(allExercises)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async getOneExercise (req, res) {
    const { id } = req.params
    try {
      const exercise = await exerciseListService.getOneRecord(id)
      return res.status(200).json(exercise)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async createExercise (req, res) {
    const exercise = { ...req.body, active: true }
    try {
      const newExercise = await exerciseListService.createRecord(exercise)
      return res.status(200).json(newExercise)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async updateExercise (req, res) {
    const exercise = req.body
    const { id } = req.params
    try {
      await exerciseListService.updateRecordWithId(id, exercise)
      const exerciseUpdated = await exerciseListService.getOneRecord(id)
      return res.status(200).json(exerciseUpdated)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async deleteExercise (req, res) {
    const { id } = req.params
    try {
      await exerciseListService.deleteRecordWithId(id)
      return res.status(200).json(`Exercicio com o Id ${id} foi deletado`)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = ExerciseListController
