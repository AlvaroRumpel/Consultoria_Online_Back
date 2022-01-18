const bodyParser = require('body-parser')
const cors = require('cors')
const client = require('./clientRoute')
const initialForms = require('./initialFormsRoute')
const exerciseListRoute = require('./exerciseListRoute')
const exerciseRoute = require('./exerciseRoute')
const weekDayRoute = require('./weekDayRoute')
const trainingSheetRoute = require('./trainingSheetRoute')

const corsOptions = {
  exposedHeaders: 'Authorization'
}

module.exports = (app) => {
  app.use(
    bodyParser.json(),
    cors(corsOptions),
    client,
    initialForms,
    exerciseListRoute,
    exerciseRoute,
    weekDayRoute,
    trainingSheetRoute
  )
}
