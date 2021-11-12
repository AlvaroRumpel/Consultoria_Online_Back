const { Router } = require('express');
const ClientController = require('../controllers/ClientController');

const router = Router();

router
    .get('/clients', ClientController.getAllClients)

    .post('/clients', ClientController.createClient)

    .put('/clients/:id', ClientController.updateClient)

    .delete('/clients/:id', ClientController.deleteClient)

module.exports = router;