const { Router } = require('express');
const ExerciseListController = require('../controllers/ExerciseListController');

const router = Router();

router
    .get('/exerciseList', ExerciseListController.getAllExercises)
    .get('/exerciseList/:id', ExerciseListController.getOneExercise)

    .post('/exerciseList', ExerciseListController.createExercise)

    .put('/exerciseList/:id', ExerciseListController.updateExercise)

    .delete('/exerciseList/:id', ExerciseListController.deleteExercise)

module.exports = router;