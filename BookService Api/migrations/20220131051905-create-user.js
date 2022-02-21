'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FirstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      LastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Mobile: {
        allowNull: false,
        type: Sequelize.STRING
      },
      RoleId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      IsRegisteredUser: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      DOB:{
        type: Sequelize.DATE
      },
    
      UserProfilePicture:{
        type: Sequelize.STRING
      },
    
      PaymentGateawayUserRef:{
        type: Sequelize.STRING
      },
    
      Zipcode:{
        type: Sequelize.STRING
      },
    
      WorksWithPet:{
        type: Sequelize.BOOLEAN
      },
    
      LanguageId:{
        type: Sequelize.STRING
      },
    
      NationalityId:{
        type: Sequelize.STRING
      },
    
      ModifiedBy:{
        type: Sequelize.STRING
      },
    
      Isapproved:{
        type: Sequelize.BOOLEAN
      },
    
      IsActive:{
        type: Sequelize.BOOLEAN
      },
    
      IsDeleted:{
        type: Sequelize.BOOLEAN
      },
    
      Status:{
        type: Sequelize.STRING
      },
      BankTokenId:{
        type: Sequelize.INTEGER
      },
    
      TaxNo:{
        type:Sequelize.INTEGER
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
    await queryInterface.dropTable('users');
  }
};