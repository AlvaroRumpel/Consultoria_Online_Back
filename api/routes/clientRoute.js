const { Router } = require('express');
const ClientController = require('../controllers/ClientController');

const router = Router();

router
    .get('/clients', ClientController.getAllClients)
    .get('/clients/:id', ClientController.getOneClient)

    .post('/clients', ClientController.createClient)

    .put('/clients/:id', ClientController.updateClient)

    .delete('/clients/:id', ClientController.deleteClient)

module.exports = router;