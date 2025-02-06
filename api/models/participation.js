module.exports = (sequelize, DataTypes) => {
  const Participation = sequelize.define('Participation', {
    personne_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER,
    date_inscription: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  Participation.associate = models => {
    Participation.belongsTo(models.Personne, { foreignKey: 'personne_id', onDelete: 'CASCADE' });
    Participation.belongsTo(models.Event, { foreignKey: 'event_id', onDelete: 'CASCADE' });
  };

  return Participation;
};