const { Router } = require('express');
const TrainingSheetController = require('../controllers/TrainingSheetController');
const { authMiddlewares, authorizationMiddlewares } = require('../middleware/index');

const router = Router();

router
    .get('/sheet', TrainingSheetController.getAllSheets)
    .get('/sheet/:id', [authMiddlewares.bearer, authorizationMiddlewares('sheet', 'read')], TrainingSheetController.getOneSheet)

    .post('/sheet/:clientId', TrainingSheetController.createSheets)

    .put('/sheet/:clientId/:id', TrainingSheetController.updateSheets)

    .delete('/sheet/:id', TrainingSheetController.deleteSheet)

module.exports = router;