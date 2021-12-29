const jwt = require('jsonwebtoken')
const allowlistRefreshToken = require('../../redis/allowlistRefreshToken')
const blocklistAccessToken = require('../../redis/blocklistAccessToken')
const resetList = require('../../redis/passwordReset')

const crypto = require('crypto')
const moment = require('moment')

function generateJWT (id, [qtdTime, unitTime]) {
  const payload = { id }

  const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: qtdTime + unitTime })
  return token
}

async function generateOpaqueToken (id, [qtdTime, unitTime], allowlist) {
  const opaqueToken = crypto.randomBytes(24).toString('hex')
  const expiresDate = moment().add(qtdTime, unitTime).unix()
  await allowlist.add(opaqueToken, id, expiresDate)
  return opaqueToken
}

async function checkOpaqueToken (token, name, allowlist) {
  checkSendToken(token, name)
  const id = await allowlist.findValue(token)
  checkValidToken(id, name)
  return id
}

async function invalidateOpaqueToken (token, allowlist) {
  await allowlist.delete(token)
}

function checkValidToken (id, name) {
  if (!id) {
    throw new Error(`${name} token invalid`)
  }
}

function checkSendToken (token, name) {
  if (!token) {
    throw new Error(`${name} token not available`)
  }
}

async function checkTokenBlocklist (token, name, blocklist) {
  const tokenBlocklist = await blocklist.containToken(token)
  if (tokenBlocklist) {
    throw new jwt.JsonWebTokenError(`${name} token Invalido por logout`)
  }
}

async function checkTokenJwt (token, name, blocklist) {
  if (blocklist) {
    await checkTokenBlocklist(token, name, blocklist)
  }
  const { id } = jwt.verify(token, process.env.CHAVE_JWT)
  return id
}

async function invalidateTokenJwt (token, blocklist) {
  return await blocklist.add(token)
}

module.exports = {
  access: {
    expires: [20, 'm'],
    list: blocklistAccessToken,
    name: 'Access',
    create (id) {
      return generateJWT(id, this.expires)
    },
    check (token) {
      return checkTokenJwt(token, this.name, this.list)
    },
    invalidate (token) {
      return invalidateTokenJwt(token, this.list)
    }
  },
  refresh: {
    list: allowlistRefreshToken,
    expires: [5, 'd'],
    name: 'Refresh',
    create (id) {
      return generateOpaqueToken(id, this.expires, this.list)
    },
    check (token) {
      return checkOpaqueToken(token, this.name, this.list)
    },
    invalidate (token) {
      return invalidateOpaqueToken(token, this.list)
    }
  },
  checkEmail: {
    name: 'token de verficação de email',
    expires: [1, 'h'],
    create (id) {
      return generateJWT(id, this.expires)
    },
    check (token) {
      return checkTokenJwt(token, this.name)
    }
  },
  forgotPassEmail: {
    name: 'token de alteração de senha',
    expires: [30, 'm'],
    list: resetList,
    create (id) {
      return generateOpaqueToken(id, this.expires, this.list)
    },
    check (token) {
      return checkOpaqueToken(token, this.name, this.list)
    }
  }
}
