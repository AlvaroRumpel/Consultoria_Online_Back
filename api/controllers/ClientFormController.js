const { ClientFormsServices } = require("../services");

const clientFormService = new ClientFormsServices();

class ClientFormController {
    static async getAllClientsForms(req, res) {
        try {
            const clientsForms = await clientFormService.getAllRecords();
            return res.status(200).json(clientsForms);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = ClientFormController;