const authStrategies = require('./authStrategies');
const authMiddlewares = require('./authMiddlewares');
const tokens = require('./tokens');
const authorizationMiddlewares = require('./authorizationMiddlewares');

module.exports = {
    authStrategies: authStrategies,
    authMiddlewares: authMiddlewares,
    tokens: tokens,
    authorizationMiddlewares: authorizationMiddlewares,
}