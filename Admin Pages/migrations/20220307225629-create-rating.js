'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ratings', {
      RatingId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ServiceRequestId: {
        type: Sequelize.INTEGER,
        references: {
          model:'ServiceRequest',
          key: 'ServiceRequestId'
        },
      },
      RatingFrom: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      RatingTo: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      Ratings: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      Comments: {
        
        type: Sequelize.STRING
      },
      RatingDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      OnTimeArrival: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      Friendly: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      QualityOfService: {
        allowNull: false,
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('ratings');
  }
};