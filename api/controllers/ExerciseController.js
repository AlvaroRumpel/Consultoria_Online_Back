const { ExerciseServices } = require('../services');

const exerciseServices = new ExerciseServices();

class ExerciseController {
    static async getAllExercises(req, res) {
        try {
            const allExercises = await exerciseServices.getAllRecords();
            return res.status(200).json(allExercises);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    
    static async getOneExercise(req, res) {
        const { id } = req.params;
        try {
            const form = await exerciseServices.getOneRecord(id);
            return res.status(200).json(form);
        } catch (error){
            return res.status(500).json(error.message);
        }
    }

    static async createExercises (req, res) {
        const exercise = req.body;
        try {
            const newExercise = await exerciseServices.createRecord(exercise);
            return res.status(200).json(newExercise);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateExercises (req, res) {
        const { id } = req.params;
        const newExercise = req.body;
        try {
            await exerciseServices.updateRecordWithId(id, newExercise);
            const formUpdated = await exerciseServices.getOneRecord(id);
            return res.status(200).json(formUpdated);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteExercise (req, res) {
        const { id } = req.params;
        try {
            await exerciseServices.deleteRecordWithId(id);
            return res.status(200).json(`O Exercicio de id ${id} foi deletado`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = ExerciseController;
