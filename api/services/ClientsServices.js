const Services = require('./Services');
const database = require('../models');
const bcrypt = require('bcrypt');

class ClientsService extends Services {
    constructor () {
        super('Clients');
        const modelName = 'Clients';
    }

    async generateHashPassword (password) {
        return bcrypt.hash(password, 12);
    }

    async createRecord(data) {
        data.password = await this.generateHashPassword(data.password);
        return database[this.modelName].create(data);
    }

    async getOneClientWithUser (user) {
        return await database[this.modelName].findOne({where:{user: user}});
    }

    async modifyCheckedEmail (id) {
        try {
            return await database[this.modelName].update({checkedEmail: true}, {where: {id: Number(id)}})
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async modifyPassword (id, password) {
        password = await this.generateHashPassword(password);
        try {
            return await database[this.modelName].update({password: password}, {where: {id: Number(id)}})
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = ClientsService;