const { Router } = require('express')
const InitialFormsController = require('../controllers/InitialFormsController')
const { authMiddlewares } = require('../middleware/index')

const router = Router()

router
  .get('/forms', InitialFormsController.getAllForms)
  .get('/forms/:id', InitialFormsController.getOneForm)

  .post('/forms/:clientId', authMiddlewares.bearer, InitialFormsController.createForms)

  .put('/forms/:clientId/:id', authMiddlewares.bearer, InitialFormsController.updateForms)

  .delete('/forms/:id', InitialFormsController.deleteForm)

module.exports = router
