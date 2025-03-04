'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('ListeSouhaits', 'event_ids', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('ListeSouhaits', 'event_ids');
  }
};
