const { Router } = require('express');
const WeekDayController = require('../controllers/WeekDayController');

const router = Router();

router
    .get('/weekDay', WeekDayController.getAllWeekDays)
    .get('/weekDay/:id', WeekDayController.getOneWeekDay)

    .post('/weekDay', WeekDayController.createWeekDay)

    .put('/weekDay/:id', WeekDayController.updateWeekDay)

    .delete('/weekDay/:id', WeekDayController.deleteWeekDay)

module.exports = router;