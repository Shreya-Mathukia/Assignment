
import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class SRExtra extends Model{

    ServiceRequestExtraId!: number;
    ServiceRequestId!: number;
    ServiceExtraId!: number;
}

export const SRExtraModelAttributes: ModelAttributes = {
    ServiceRequestExtraId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      ServiceRequestId: {
        allowNull: false,
        references: {
          model:'ServiceRequest',
          key: 'ServiceRequestId'
        },
        type: DataTypes.INTEGER
      },
      ServiceExtraId: {
        allowNull: false,
        type: DataTypes.INTEGER
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