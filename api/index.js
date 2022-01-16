require('dotenv').config()

const http = require('http')
const express = require('express')
const routes = require('./routes')

require('../redis/blocklistAccessToken')
require('../redis/allowlistRefreshToken')

const app = express()

const server = http.createServer(app)

const { authStrategies } = require('./middleware/index')

routes(app)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server is listening on ${port}`))

module.exports = app
