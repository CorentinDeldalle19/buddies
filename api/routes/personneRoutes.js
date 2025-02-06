const express = require('express');
const router = express.Router();
const { Personne } = require('../models');

// Middleware pour trouver une personne par son ID et l'attacher à req.personne
const findSpecificallyPerson = async (req, res, next) => {
    try {
        const personne = await Personne.findByPk(req.params.id);
        if (!personne) {
            return res.status(404).json({ message: 'Personne non trouvée' });
        }
        req.personne = personne;
        next();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Créer une nouvelle personne
router.post('/personne', async (req, res) => {
    try {
        const newPersonne = await Personne.create({
            nom: req.body.nom,
            prenom: req.body.prenom
        });
        res.status(201).json(newPersonne);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Récupérer toutes les personnes
router.get('/personnes', async (req, res) => {
    try {
        const personnes = await Personne.findAll();
        res.status(200).json(personnes);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Récupérer une personne par son ID
router.get('/personne/:id', async (req, res) => {
    try {
        const personne = await Personne.findByPk(req.params.id);
        if (!personne) {
            return res.status(404).json({ message: 'Personne non trouvée' });
        }
        res.status(200).json(personne);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Supprimer une personne
router.delete('/personne/:id', findSpecificallyPerson, async (req, res) => {
    try {
        await req.personne.destroy();
        res.json({ message: 'Personne supprimée' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;