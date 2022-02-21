'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ServiceRequest', {
      ServiceRequestId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key:'id'
        }
      },
      ServiceId: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      ServiceStartDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      Zipcode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ServiceHourlyRate: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      ServiceHours: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      ExtraHours: {
        type: Sequelize.FLOAT
      },
      Subtotal: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      Discount: {
        type: Sequelize.DECIMAL
      },
      TotalCost: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      Comments: {
        type: Sequelize.STRING
      },
      PaymentTransactionRefNo: {
        type: Sequelize.STRING
      },
      PaymentDue: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      ServiceProviderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key:'id'
        }
      },
      SPAcceptedDate: {
        type: Sequelize.DATE
      },
      HasPets: {
        type: Sequelize.BOOLEAN
      },
      Status: {
        type: Sequelize.BOOLEAN
      },
      
      ModifiedBy: {
        type: Sequelize.STRING
      },
      RefundedAmount: {
        type: Sequelize.DECIMAL
      },
      Distance: {
        type: Sequelize.DECIMAL
      },
      HasIssues: {
        type: Sequelize.BOOLEAN
      },
      PaymentDone: {
        type: Sequelize.BOOLEAN
      },
      RecoedVersion: {
        type: Sequelize.UUID
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
    await queryInterface.dropTable('ServiceRequest');
  }
};