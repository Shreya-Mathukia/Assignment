'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Zipcode', {
      ZipcodeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CityId: {
        references: {
          model: 'City',
          key: 'CityId'
        },
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ZipcodeValue: {
        allowNull: false,
        type: Sequelize.STRING
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Zipcode');
  }
};