module.exports = (sequelize, DataTypes) => {
  const Personne = sequelize.define('Personne', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING
  });

  Personne.associate = models => {
    Personne.hasMany(models.Participation, { foreignKey: 'personne_id' });
    Personne.hasMany(models.ListeSouhaits, { foreignKey: 'personne_id' });
    Personne.hasMany(models.Message, { foreignKey: 'personne_id' });
  };

  return Personne;
};