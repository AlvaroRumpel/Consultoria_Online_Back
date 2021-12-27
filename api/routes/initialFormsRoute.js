const { Router } = require('express');
const InitialFormsController = require('../controllers/InitialFormsController');

const router = Router();

router
    .get('/forms', InitialFormsController.getAllForms)
    .get('/forms/:id', InitialFormsController.getOneForm)

    .post('/forms', InitialFormsController.createForms)

    .put('/forms/:id', InitialFormsController.updateForms)

    .delete('/forms/:id', InitialFormsController.deleteForm)

module.exports = router;