const { Router } = require('express')
const ExerciseController = require('../controllers/ExerciseController')

const router = Router()

router
  .get('/exercise', ExerciseController.getAllExercises)
  .get('/exercise/:id', ExerciseController.getOneExercise)

  .post('/exercise', ExerciseController.createExercises)

  .put('/exercise/:id', ExerciseController.updateExercises)

  .delete('/exercise/:id', ExerciseController.deleteExercise)

module.exports = router
