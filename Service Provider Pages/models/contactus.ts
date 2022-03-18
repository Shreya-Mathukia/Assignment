
import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class ContactUs extends Model {
  id!: number;

  FirstName?: string;

  LastName?: string;

  Email?: string;

  Mobile?: string;
  
  Subject?:string;

  Message?:string;

  UploadFileName?:string;

  createdAt!: Date;

  updatedAt!: Date;
};

export const ContactusModelAttributes: ModelAttributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  FirstName: {
    type: DataTypes.STRING
  },
  LastName: {
    type: DataTypes.STRING
  },
  Email: {
    type: DataTypes.STRING
  },
  Mobile: {
    type: DataTypes.STRING
  },
  Subject: {
    type: DataTypes.STRING
  },
  Message: {
    type: DataTypes.STRING
  },
  UploadFileName: {
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
}