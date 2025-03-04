'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

// Obtenez le nom du fichier actuel
const basename = path.basename(__filename);

// Définissez l'environnement (développement par défaut)
const env = process.env.NODE_ENV || 'development';

// Chargez la configuration de la base de données à partir du fichier config.json
const config = require(__dirname + '/../config/config.json')[env];

// Initialisez un objet pour stocker les modèles et la connexion Sequelize
const db = {};

// Initialisez la connexion Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Lisez et chargez les fichiers de modèles dans le même répertoire
fs.readdirSync(__dirname)
    .filter(file => {
      // Filtrer les fichiers de modèles (ignorer les fichiers cachés, le fichier actuel, et les fichiers de test)
      return (
          file.indexOf('.') !== 0 &&
          file !== basename &&
          file.slice(-3) === '.js' &&
          file.indexOf('.test.js') === -1
      );
    })
    .forEach(file => {
      // Chargez le modèle et ajoutez-le à l'objet db
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

// Associez les modèles entre eux si nécessaire
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Ajoutez la connexion Sequelize et l'objet Sequelize à l'objet db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exportez l'objet db pour qu'il puisse être utilisé dans d'autres parties de l'application
module.exports = db;