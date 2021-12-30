const { Router } = require('express')
const ClientController = require('../controllers/ClientController')
const { authMiddlewares, authorizationMiddlewares } = require('../middleware/index')

const router = Router()

router
  .get('/clients', [authMiddlewares.bearer, authorizationMiddlewares('clients', 'read')], ClientController.getAllClients)
  .get('/clients/:id', ClientController.getOneClient)
  .get('/clients/checkEmail/:token', authMiddlewares.checkEmail, ClientController.checkEmail)

  .post('/clients', ClientController.createClient)
  .post('/clients/login', authMiddlewares.local, ClientController.login)
  .post('/clients/logout', [authMiddlewares.bearer, authMiddlewares.refresh], ClientController.logout)
  .post('/clients/updateToken', authMiddlewares.refresh, ClientController.login)
  .post('/clients/esqueciminhasenha', ClientController.forgotPassword)

  .put('/clients/forgotPassword/:token', authMiddlewares.forgotEmail, ClientController.forgotPasswordRestore)
  .put('/clients/:id', ClientController.updateClient)

  .delete('/clients/:id', authMiddlewares.bearer, ClientController.deleteClient)

module.exports = router
