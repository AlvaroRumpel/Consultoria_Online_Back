require('dotenv').config();

const express = require('express');
const routes = require('./routes');

require('../redis/blocklistAccessToken');
require('../redis/allowlistRefreshToken');

const app = express();

const { authStrategies } = require('./middleware/index');

routes(app);

const port = 3000;

app.listen(port, () => console.log(`Server is listening on ${port}`));

module.exports = app;