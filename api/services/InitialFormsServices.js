const Services = require("./Services");
const database = require('../models');

class InitialFormsServices extends Services {
    constructor () {
        super('Initial_Forms');
        const modelName = 'Initial_Forms';
    }
    async checkClientId (id) {
        if(await database[this.modelName].findOne({ where: { id_Client: Number(id) } }))
            throw new Error('Forms already exists');
        return await database['Clients'].findOne({ where: {id: Number(id)} });
    }

    async createRecord (data) {
        const body = {...data.body, id_Client: data.clientId};
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
                id_Client: Number(clientId)
            },
        });
    }
}

module.exports = InitialFormsServices;