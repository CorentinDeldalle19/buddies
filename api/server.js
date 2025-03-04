const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const personneRoutes = require('./routes/personneRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

// Utiliser les routes
app.use('/api/personnes', personneRoutes);

// Tester la connexion à la base de données
sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données réussie.');
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données:', err);
    });

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});