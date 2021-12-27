const Sequelize = require('sequelize');
const { WeekDayServices } = require('../services');

const weekDayService = new WeekDayServices();

class WeekDayController {
    static async getAllWeekDays (req, res) {
        try {
            const allWeekDays = await weekDayService.getAllRecords();
            return res.status(200).json(allWeekDays);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getOneWeekDay (req, res) {
        const { id } = req.params;
        try {
            const weekDay = await weekDayService.getOneRecord(id);
            return res.status(200).json(weekDay);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async createWeekDay (req, res) {
        const weekDay = {...req.body, active: true};
        try {
            const newWeekDay = await weekDayService.createRecord(weekDay);
            return res.status(200).json(newWeekDay);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateWeekDay (req, res) {
        const weekDay = req.body;
        const { id } = req.params;
        try {
            await weekDayService.updateRecordWithId(id, weekDay);
            const weekDayUpdated = await weekDayService.getOneRecord(id);
            return res.status(200).json(weekDayUpdated);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteWeekDay (req, res) {
        const { id } = req.params;
        try {
            await weekDayService.deleteRecordWithId(id);
            return res.status(200).json(`WeekDay com o Id ${id} foi deletado`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = WeekDayController;