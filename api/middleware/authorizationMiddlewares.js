const control = require('./accessControl')

const methods = {
  read: {
    all: 'readAny',
    own: 'readOwn'
  },
  create: {
    all: 'createAny',
    own: 'createOwn'
  },
  remove: {
    all: 'removeAny',
    own: 'removeOwn'
  }
}

module.exports = (entities, action) => (req, res, next) => {
  const role = (req.user.role).toString()
  const rolePermissions = control.can(role)
  const actions = methods[action]
  const allPermissions = rolePermissions[actions.all](entities)
  const ownPermissions = rolePermissions[action](entities)

  if (allPermissions.granted === false && ownPermissions.granted === false) {
    res.status(403).send('Permission denied')
    return
  }

  req.access = {
    all: {
      granted: allPermissions.granted,
      attributes: allPermissions.attributes
    },
    onw: {
      granted: ownPermissions.granted,
      attributes: ownPermissions.attributes
    }
  }

  next()
}
