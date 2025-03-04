const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController')

// Route pour créer un évènement
router.post('/event',eventController.createEvent);

// Route pour récuperer tout les évènements
router.get('/events/',eventController.findAllEvent);

// Route pour récuperer un évènement par ID
router.get('/event/:id',eventController.findOneEvent);

// Route pour modifier les informations d'un évènement
router.patch('/event/:id',eventController.updateEvent);

// Route pour supprimer un évènement
router.delete('/event/:id',eventController.deleteEvent);

module.exports = router ; 