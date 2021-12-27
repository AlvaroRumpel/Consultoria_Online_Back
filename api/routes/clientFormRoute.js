const { Router } = require('express');
const ClientFormController = require('../controllers/clientFormController');

const router = Router();

router
    .get('/form/clients', ClientFormController.getAllClientsForms)

module.exports = router;