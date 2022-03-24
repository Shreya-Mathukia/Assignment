'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('State', {
      StateId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      StateName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('State');
  }
};