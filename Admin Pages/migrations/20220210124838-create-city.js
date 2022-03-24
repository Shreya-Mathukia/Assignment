'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('City', {
      CityId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      StateId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'State',
          key: 'StateId'
      }
    },
      CityName: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('City');
  }
};