const passport = require('passport')
const User = require('../services/ClientsServices')
const tokens = require('./tokens')

const client = new User()

module.exports = {
  local (req, res, next) {
    passport.authenticate('local',
      { session: false },
      (error, user, info) => {
        if (error && error.name === 'InvalidArgumentError') {
          return res.status(401).json(error.message)
        }

        if (error) {
          return res.status(500).json(error.message)
        }

        if (!user) {
          return res.status(401).json()
        }

        req.user = user
        return next()
      })(req, res, next)
  },

  bearer (req, res, next) {
    passport.authenticate(
      'bearer',
      { session: false },
      (error, user, info) => {
        if (error && error.name === 'JsonWebTokenError') {
          return res.status(401).json(error.message)
        }

        if (error && error.name === 'TokenExpiredError') {
          return res.status(403).json(error.message)
        }

        if (error) {
          return res.status(500).json(error.message)
        }

        if (!user) {
          return res.status(401).json()
        }

        req.token = info.token
        req.user = user
        return next()
      }
    )(req, res, next)
  },

  async refresh (req, res, next) {
    try {
      const { refreshToken } = req.body
      const id = await tokens.refresh.check(refreshToken)
      await tokens.refresh.invalidate(refreshToken)
      req.user = await client.getOneRecord(id)
      return next()
    } catch (error) {
      if (error.name === 'InvalidArgumentError') {
        return res.status(401).json(error.message)
      }
      return res.status(500).json(error.message)
    }
  },

  async checkEmail (req, res, next) {
    try {
      const { token } = req.params
      const id = await tokens.checkEmail.check(token)
      const user = await client.getOneRecord(id)
      req.user = user
      next()
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json(error.message)
      }

      if (error.name === 'TokenExpiredError') {
        return res.status(401).json(error.message, error.expiredAt)
      }

      return res.status(500).json(error.message)
    }
  },

  async forgotEmail (req, res, next) {
    try {
      const { token } = req.params
      const id = await tokens.forgotPassEmail.check(token)
      const user = await client.getOneRecord(id)
      req.user = user
      next()
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json(error.message)
      }

      if (error.name === 'TokenExpiredError') {
        return res.status(401).json(error.message, error.expiredAt)
      }

      return res.status(500).json(error.message)
    }
  }
}
