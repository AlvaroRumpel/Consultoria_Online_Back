const { TrainingSheetServices } = require('../services');

const trainingSheetServices = new TrainingSheetServices();

class TrainingSheetController {
    static async getAllSheets(req, res) {
        try {
            const allSheets = await trainingSheetServices.getAllRecords();
            return res.status(200).json(allSheets);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    
    static async getOneSheet(req, res) {
        const { id } = req.params;
        try {
            const sheet = await trainingSheetServices.getOneRecord(id);
            return res.status(200).json(sheet);
        } catch (error){
            return res.status(500).json(error.message);
        }
    }

    static async createSheets (req, res) {
        const sheets = {body: req.body, ...req.params};
        try {
            const newSheet = await trainingSheetServices.createRecord(sheets);
            return res.status(200).json(newSheet);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateSheets (req, res) {
        const { id } = req.params;
        const { clientId } = req.params;
        const newSheet = req.body;
        try {
            await trainingSheetServices.updateRecordWithId(id, clientId, newSheet);
            const sheetUpdated = await trainingSheetServices.getOneRecord(id);
            return res.status(200).json(sheetUpdated);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteSheet (req, res) {
        const { id } = req.params;
        try {
            await trainingSheetServices.deleteRecordWithId(id);
            return res.status(200).json(`A Ficha de id ${id} foi deletado`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = TrainingSheetController;
