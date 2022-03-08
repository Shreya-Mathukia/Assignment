'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserAddress', {
      AddressId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
      },
        type: Sequelize.INTEGER
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
      IsDefault: {
        type: Sequelize.BOOLEAN
      },
      IsDeleted: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('UserAddress');
  }
};