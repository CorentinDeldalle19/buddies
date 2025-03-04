const {Event} = require('../models');

exports.createEvent =  async (req, res) => {
    try {
        const newEvent = await Event.create({
            name: req.body.name,
            location: req.body.location,
            style_of_music: req.body.style_of_music,
            description: req.body.description,
            restauration: req.body.restauration,
            type: req.body.type,
            date: req.body.date
        });
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.findAllEvent = async (req,res) => {
    try {
        const events = await Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({message : error.message});
    }
};

exports.findOneEvent = async (req,res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) {
            res.status(404).json({message : 'Aucun event trouvé'})
        }
    } catch (error) {
        res.status(400).json({message : error.message});
    }
};

exports.updateEvent = async (req,res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (event) {
            await event.update(req.body);
            res.status(200).json(event);
        } else {
            res.status(404).json({error : 'event non trouvé'});
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteEvent = async (req,res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (event) {
            await event.destroy();
            res.status(204).send();
        }  else {
            res.status(404).json({error : 'event non trouvé'});
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};