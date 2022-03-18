
import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class User extends Model {
  id!: number;

  FirstName!: string;

  LastName!: string;

  Email!: string;

  Password!: string;

  Mobile!: string;

  RoleId!: string;

  IsRegistered!: Boolean;
  
  DOB!:Date;

  UserProfilePicture!:String;

  PaymentGateawayUserRef!:String;

  Zipcode!:String;

  WorksWithPet!:Boolean;

  LanguageId!:String;

  NationalityId!:String;

  ModifiedBy!:String;

  Isapproved!:Boolean;

  IsActive!:Boolean;

  IsDeleted!:Boolean;

  Status!:String;

  BankTokenId!:number;

  TaxNo!:number;

  createdAt!: Date;

  updatedAt!: Date;
};

export const UsersModelAttributes: ModelAttributes = {
  id: {
    autoIncrement: true,
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  FirstName: {    
    type: DataTypes.STRING,
    allowNull: false  
  },
  LastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  Password: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  Mobile: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  RoleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  IsRegisteredUser: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  DOB:{
    type: DataTypes.DATE
  },

  UserProfilePicture:{
    type: DataTypes.STRING
  },

  PaymentGateawayUserRef:{
    type: DataTypes.STRING
  },

  Zipcode:{
    type: DataTypes.STRING
  },

  WorksWithPet:{
    type: DataTypes.BOOLEAN
  },

  LanguageId:{
    type: DataTypes.STRING
  },

  NationalityId:{
    type: DataTypes.STRING
  },

  ModifiedBy:{
    type: DataTypes.STRING
  },

  Isapproved:{
    type: DataTypes.BOOLEAN
  },

  IsActive:{
    type: DataTypes.BOOLEAN
  },

  IsDeleted:{
    type: DataTypes.BOOLEAN
  },

  Status:{
    type: DataTypes.STRING
  },
  BankTokenId:{
    type: DataTypes.INTEGER
  },

  TaxNo:{
    type: DataTypes.INTEGER
  },

  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}

