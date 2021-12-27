const Services = require("./Services");
const database = require('../models');

class TrainingSheetServices extends Services {
    constructor () {
        super('Training_sheet');
        const modelName = 'Training_sheet';
    }
    async checkClientId (id) {
        return await database['Clients'].findOne({ where: {id: Number(id)} });
    }

    async createRecord (data) {
        const body = {...data.body, id_client: data.clientId};
        try {
            await this.checkClientId(data.clientId);
            return await database[this.modelName].create(body);
        } catch (error) {
            return error.message;
        }
    }

    async updateRecordWithId(id, clientId, data) {
        return database[this.modelName].update(data, {
            where: {
                id: Number(id),
                id_client: Number(clientId)
            },
        });
    }
}

module.exports = TrainingSheetServices;