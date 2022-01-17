const jwt = require('jsonwebtoken')

const RefreshTokenService = require('../services/RefreshTokenServices')

const refreshTokenService = new RefreshTokenService()

async function generateJWT (id, [qtdTime, unitTime], key, type) {
  const payload = { id }
  const token = jwt.sign(payload, key, { expiresIn: qtdTime + unitTime })
  await refreshTokenService.createRecord({ id_Client: Number(id), key: token, valid: true, type: type })
  return token
}

async function checkToken (token, name, type) {
  checkSendToken(token, name)
  const id = await refreshTokenService.getKey(token, type)
  checkValidToken(id, name)
  return id
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

async function checkTokenJwt (token, name, key, type) {
  const Client = await refreshTokenService.getKeyInvalid(token, type)
  if (Client) {
    throw new jwt.JsonWebTokenError(`${name} token Invalido por logout`)
  }
  const { id } = jwt.verify(token, key)
  return id
}

async function invalidateTokenJwt (token, type) {
  return await refreshTokenService.invalidateKey(token, type)
}

async function deleteTokenJwt (token, type) {
  return await refreshTokenService.deleteKey(token, type)
}

module.exports = {
  access: {
    expires: [20, 'm'],
    key: process.env.CHAVE_JWT,
    name: 'Access',
    type: 1,
    create (id) {
      return generateJWT(id, this.expires, this.key, this.type)
    },
    check (token) {
      return checkTokenJwt(token, this.name, this.key, this.type)
    },
    invalidate (token) {
      return invalidateTokenJwt(token, this.type)
    }
  },
  refresh: {
    expires: [1, 'd'],
    key: process.env.REFRESH_JWT,
    name: 'Refresh',
    type: 2,
    create (id) {
      return generateJWT(id, this.expires, this.key, this.type)
    },
    check (token) {
      return checkToken(token, this.name, this.type)
    },
    invalidate (token) {
      return invalidateTokenJwt(token, this.type)
    }
  },
  checkEmail: {
    name: 'token de verficação de email',
    key: process.env.CHAVE_JWT,
    expires: [1, 'h'],
    type: 3,
    create (id) {
      return generateJWT(id, this.expires, this.key, this.type)
    },
    check (token) {
      return checkTokenJwt(token, this.name, this.type)
    },
    delete (token) {
      return deleteTokenJwt(token, this.name, this.type)
    }
  },
  forgotPassEmail: {
    name: 'token de alteração de senha',
    key: process.env.FORGOTPASS_JWT,
    expires: [30, 'm'],
    type: 4,
    create (id) {
      return generateJWT(id, this.expires, this.key, this.type)
    },
    check (token) {
      return checkToken(token, this.name, this.type)
    },
    delete (token) {
      return deleteTokenJwt(token, this.type)
    }
  }
}
