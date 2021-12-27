const Sequelize = require('sequelize');
const { ClientsServices } = require('../services');

const clientsService = new ClientsServices();

class ClientController {
    static async getAllClients (req, res) {
        try {
            const allClients = await clientsService.getAllRecords();
            return res.status(200).json(allClients);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getOneClient (req, res) {
        const { id } = req.params;
        try {
            const client = await clientsService.getOneRecord(id);
            return res.status(200).json(client);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async createClient (req, res) {
        const client = {...req.body, active: true};
        try {
            const newClient = await clientsService.createRecord(client);
            return res.status(200).json(newClient);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateClient (req, res) {
        const client = req.body;
        const { id } = req.params;
        try {
            await clientsService.updateRecordWithId(id, client);
            const clientUpdated = await clientsService.getOneRecord(id);
            return res.status(200).json(clientUpdated);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteClient (req, res) {
        const { id } = req.params;
        try {
            await clientsService.deleteRecordWithId(id);
            return res.status(200).json(`Client com o Id ${id} foi deletado`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = ClientController;