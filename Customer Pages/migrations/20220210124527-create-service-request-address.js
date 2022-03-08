'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ServiceRequestAddress', {
    ServiceRequestAddressId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ServiceRequestId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'ServiceRequest',
          key:'ServiceRequestId'
        }
      },
      AddressLine1: {
        allowNull: false,
        type: Sequelize.STRING
      },
      AddressLine2: {
        type: Sequelize.STRING
      },
      City: {
        allowNull: false,
        type: Sequelize.STRING
      },
      State: {
        allowNull: false,
        type: Sequelize.STRING
      },
      PostalCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Mobile: {
        
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ServiceRequestAddress');
  }
};