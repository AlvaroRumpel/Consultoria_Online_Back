const bodyParser = require('body-parser');
const client = require('./clientRoute');
const initialForms = require('./initialFormsRoute');
const exerciseListRoute = require('./exerciseListRoute');
const exerciseRoute = require('./exerciseRoute');
const weekDayRoute = require('./weekDayRoute');
const trainingSheetRoute = require('./trainingSheetRoute');

module.exports = app => {
    app.use(
        bodyParser.json(),
        client,
        initialForms,
        exerciseListRoute,
        exerciseRoute,
        weekDayRoute,
        trainingSheetRoute,
    );
}