const { InitialFormsServices } = require('../services');

const initialFormsServices = new InitialFormsServices();

class InitialFormsController {
    static async getAllForms(req, res) {
        try {
            const allForms = await initialFormsServices.getAllRecords();
            return res.status(200).json(allForms);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    
    static async getOneForm(req, res) {
        const { id } = req.params;
        try {
            const form = await initialFormsServices.getOneRecord(id);
            return res.status(200).json(form);
        } catch (error){
            return res.status(500).json(error.message);
        }
    }

    static async createForms (req, res) {
        const forms = req.body;
        try {
            const newForm = await initialFormsServices.createRecord(forms);
            return res.status(200).json(newForm);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateForms (req, res) {
        const { id } = req.params;
        const newForm = req.body;
        try {
            await initialFormsServices.updateRecordWithId(id, newForm);
            const formUpdated = await initialFormsServices.getOneRecord(id);
            return res.status(200).json(formUpdated);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteForm (req, res) {
        const { id } = req.params;
        try {
            await initialFormsServices.deleteRecordWithId(id);
            return res.status(200).json(`O formulário de id ${id} foi deletado`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = InitialFormsController;
