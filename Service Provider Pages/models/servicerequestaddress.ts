import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class SRAddress extends Model{

    ServiceRequestAddressId!:number;
    ServiceRequestId!: number;
    AddressLine1!: string;
    AddressLine2!: string;
    City!: string;
    State!: string;
    PostalCode!: string;
    Mobile!: string;
    Email!: string;
}

export const SRAddressModelAttributes:ModelAttributes = {
    ServiceRequestAddressId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      ServiceRequestId: {
        type: DataTypes.INTEGER
    },
      AddressLine1: {
        type: DataTypes.STRING
      },
      AddressLine2: {
        type: DataTypes.STRING
      },
      City: {
        type: DataTypes.STRING
      },
      State: {
        type: DataTypes.STRING
      },
      PostalCode: {
        type: DataTypes.STRING
      },
      Mobile: {
        type: DataTypes.STRING
      },
      Email: {
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