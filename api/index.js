require('dotenv').config()

const express = require('express')
const routes = require('./routes')

const app = express()

const { authStrategies } = require('./middleware/index')

routes(app)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server is listening on ${port}`))

module.exports = app
