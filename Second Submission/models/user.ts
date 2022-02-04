
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
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}

