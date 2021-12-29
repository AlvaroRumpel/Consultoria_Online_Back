const database = require('../models');

class Services {
    constructor (modelName) {
        this.modelName = modelName;
    }

    async getAllRecords() {
        return database[this.modelName].findAll();
    }

    async getOneRecord(id) {
        return database[this.modelName].findOne({where:{id: Number(id)}});
    }

    async createRecord(data) {
        return database[this.modelName].create(data);
    }

    async updateRecordWithId(id, data) {
        console.log(data);
        return database[this.modelName].update(data, {
            where: { id: Number(id) },
        });
    }

    async deleteRecordWithId(id) {
        return database[this.modelName].destroy({ 
            where: {id: Number(id)},
         });
    }
}

module.exports = Services;